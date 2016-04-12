/**
 * Created by NikiHrs on 31.3.2016 г..
 */
var ServerSettings = require('./ServerSettings');
var EventedLoop = require('eventedloop');
var Game = require('./Game');
var Player = require('./Player');
var WeaponDatabase = require('./WeaponDatabase');
var Armor = require('./Armor');
var request = require('request');
var querystring = require('querystring');


var ServerManager = function(serverInstance){


    /*This will be game instance to work with*/
    var game = new Game(10);
    var server = serverInstance;
    var io = require('socket.io').listen(server);
    var serverSettings = new ServerSettings(ServerManager.const.heartBeatrate);
    var loop = new EventedLoop();

    var ArmorArsenal = {};
    ArmorArsenal["0"] = new Armor(0,'Kevlar vest',100,10);



    this.startServer = function(){
        var payload = {};
        io.on('connection', function(socket){
            var gameSettings = null;
            var player = null;
            var user = {
                name:null,
                joinedRoom:null,
            };
            /*will come from server*/
            var WeaponData = {
                id:0
            };
            var ArmorData = {
                id:0
            };
            /**
             * Sending current server rules and all available rooms rooms
             */
            socket.join(ServerManager.const.lobbyName);
            user.room = ServerManager.const.lobbyName;
            socket.emit('JOINED-LOBBY',{
                serverSettings:serverSettings,
                rooms:game.rooms
            });

            /**
             * Save user name
             */
            socket.on('INIT-DATA',function(data){

                if(data){
                    var decodedData = JSON.parse(new Buffer(data, 'base64').toString('utf8'));

                    user.name = decodedData.userName;
                    user.weapons = decodedData.weapons;
                    user.id = decodedData.userId;
                    socket.emit('USERNAME-RESOLVED',decodedData.userName);

                }else {
                    user.weapons = [6];
                    user.id = 0;
                    user.name = 'Guest';
                    socket.emit('USERNAME-RESOLVED',user.name);
                }
            });

            /**
             * Refresh rooms
             */
            socket.on('REFRESH-ROOMS',function(){
                socket.emit('JOINED-LOBBY',{
                    serverSettings:serverSettings,
                    rooms:game.rooms
                });
            });

            /**
             * When player pres join room button
             */
            socket.on('JOIN ROOM',function(roomID){
                socket.leave(user.room);
                user.room = roomID;
                socket.join(user.room);
                var room = game.rooms[roomID];
                socket.emit('GAME SITUATION',{
                        roomSituation : room
                    });
            });

            /**
             *Player  'PLAY-SELECTED-TEAM'
             */
            socket.on('PLAY-SELECTED-TEAM',function(team){

                player = new Player(user.name,team);
                player.armWeapons(user.weapons);
                player.armArmor(ArmorArsenal[ArmorData.id]);
                var roomSnapShot = game.rooms[user.room];

                socket.emit('LOAD-GAME',{
                    roomSS:roomSnapShot,
                    currentPlayer:player
                });
                game.rooms[user.room].addPlayer(player);
                socket.broadcast.to(user.room).emit('NEW-PLAYER-JOINED', player);

            });



            socket.on('CLIENT IS READY',function () {
                socket.emit('GAME CAN BEGIN')
            });
            socket.on('PLAYER-POSITION',function(data){
                try{
                    game.rooms[user.room].players[player.id].updateXYR(data);
                }catch (e){
                }
            });

            /*player fire*/
            socket.on('PLAYER-FIRE',function (data) {
                try{
                    data.id = player.id;
                    game.rooms[user.room].players[player.id].updateXYRAndTrigerPosition(data);
                    socket.broadcast.to(user.room).emit('SOMEONE-FIRED',data);
                    game.rooms[user.room].players[player.id].isFire = false;
                    game.rooms[user.room].players[player.id].isMoved = false;
                    game.rooms[user.room].players[player.id].weapon.wAmmo--;
                }catch (e){
                }
            });
            socket.on('PLAYER-HIT-TARGET',function(battleLog){
                var targetPlayer  = game.rooms[user.room].players[battleLog.targetID];
                if(targetPlayer.h > 0){
                    var damageFromWeapon = player.weapons[battleLog.weaponID].getDamageDone(battleLog.distance);
                    var resultedDMG = targetPlayer.armor.dmgReduce(damageFromWeapon);
                    targetPlayer.h -= resultedDMG;
                    player.s += resultedDMG;

                    targetPlayer.isMoved = true;
                    if(targetPlayer.h <= 0){
                        targetPlayer.x = 0;
                        targetPlayer.y = 0;

                        socket.emit('TANGO-DOWN',{
                            tango:targetPlayer.id
                        });
                        socket.broadcast.to(user.room).emit('SOMEONE-DIED',{
                            tango:targetPlayer.id
                        });
                        if (targetPlayer.t == 't1'){
                            game.rooms[user.room].gameProgres.t1Alive--;
                        }else if(targetPlayer.t == 't2'){
                            game.rooms[user.room].gameProgres.t2Alive--;
                        }

                    }else {
                        player.kills++;
                        socket.emit('TANGO-HIT',{
                            tango:player.id,
                            score:player.s
                        });
                        socket.broadcast.to(user.room).emit('SOMEONE-GET-HIT',{
                            tango:targetPlayer.id,
                            tangohealt:parseFloat(targetPlayer.h.toFixed(1))
                        });
                    }
                }

            });
            socket.on('RELOAD-WEAPON',function(){
               setTimeout(function(){
                   socket.emit('RELOADED-WEAPON',player.weapons[player.weapons.selectedWeapon].wAmmoCap);
                   try{

                       player.weapons[player.weapons.selectedWeapon].wAmmo = player.weapons[player.weapons.selectedWeapon].wAmmoCap;

                   }catch (e){
                        console.log(e)
                   }},player.weapons[player.weapons.selectedWeapon].rSpeed)
            });
            socket.on('WEAPON CHANGED',function(windex){
                player.weapons.selectedWeapon = windex;
                socket.emit('SERVER-CHANGED-WEAPON',windex);
                socket.broadcast.to(user.room).emit('SOMEONE-CHANGED-WEAPON', {
                    playerId:player.id,
                    newWeapon:windex
                });
            });

            socket.on('GET-MY-XY',function(){
                socket.emit('SEND-XY',player);
            });

            socket.on('BOMB-PLANTED',function(){
                socket.broadcast.to(user.room).emit('BOMB-WAS-PLANTED', {
                    plantedBy:user.name
                });
                game.rooms[user.room].gameProgres.t1WinConditionIsSet = true;
                player.s+=150;

            });

            socket.on('BOMB-DEFUSED',function(){
                socket.broadcast.to(user.room).emit('BOMB-WAS-DEFUSED', {
                    defusedBy:user.name
                });
                game.rooms[user.room].gameProgres.t1WinConditionIsSet = false;
                game.rooms[user.room].gameProgres.t2WinConditionIsSet = true;
            });

            socket.on('GET-BOMB-STATE',function(){
                socket.emit('BOMB-STATE',game.rooms[user.room].gameProgres.t1WinConditionIsSet)
            });

            socket.on('disconnect',function () {
                if(player != null && user.room != ServerManager.const.lobbyName){
                    try{

                        game.rooms[user.room].removePlayer(player);
                        socket.broadcast.to(user.room).emit('PLAYER-DISCONECTED', player.id);

                        if(user.id != 0){
                            var data = querystring.stringify({
                                id: user.id,
                                rounds: player.roundPlayed,
                                scores: player.s,
                                kills: player.kills,
                                money: player.s
                            });
                            request.post({url:ServerManager.const.DBServer, form: data}, function(err,httpResponse,body){
                            });

                        }

                    }
                    catch (e){
                    }
                }
            });
        });

        loop.every('50ms',function(){

            for(var i= 0;i <= 9;i++ ){
                payload = {};
                payload.length = 0;
                if(game.rooms[i].curretPlayersCount){
                    var players = game.rooms[i].players;
                    for(var p in players){
                        var player = players[p];
                        if(player.isMoved){
                            payload[p] = {
                                x:player.x,
                                y:player.y,
                                r:player.r,
                                h:player.h
                            };
                            payload.length++;
                            player.isMoved = false;
                        }
                    }
                    if(payload.length){
                        delete payload.length;
                        io.to(i).emit('UPDATE-WORLD',{
                            data:payload,
                            time:Date.now()
                        });
                    }
                }
            }
         });
        loop.every('1s',function(){
            for(var i= 0;i <= 9;i++ ){
                if(game.rooms[i].curretPlayersCount){
                    /*ONLY IF ROOM HAS PLAYERS*/
                    /*Room update interval*/
                    game.rooms[i].gameProgres.timeOfThisRound ++;
                        io.to(i).emit('ROUND-TICK',game.rooms[i].gameProgres.timeOfThisRound);

                    if(game.rooms[i].gameProgres.timeOfThisRound == game.rooms[i].gameProgres.roundTime - 5 &&
                        game.rooms[i].gameProgres.t1WinConditionIsSet){
                        io.to(i).emit('BOMB-EXPLOSION');
                    }
                    else if(game.rooms[i].gameProgres.t1WinConditionIsSet &&
                            game.rooms[i].gameProgres.timeOfThisRound >= game.rooms[i].gameProgres.roundTime){
                        game.rooms[i].gameProgres.t1WinGames++;
                        /*Terrorist win*/
                        game.rooms[i].restartRoom();
                        io.to(i).emit('ROUND-RESULT',{
                            winer:'t1',
                            message:'Terrorist planted bomb',
                            round:game.rooms[i].gameProgres.currentRound,
                            t1games:game.rooms[i].gameProgres.t1WinGames,
                            t2games:game.rooms[i].gameProgres.t2WinGames
                        });
                    }
                    else if(game.rooms[i].gameProgres.timeOfThisRound >= game.rooms[i].gameProgres.roundTime
                        && !game.rooms[i].gameProgres.t1WinConditionIsSet
                    && game.rooms[i].curretPlayersCount > 1){

                        /*Counter terrorist wins*/
                        game.rooms[i].gameProgres.t2WinGames++;
                        game.rooms[i].restartRoom();
                        io.to(i).emit('ROUND-RESULT',{
                            winer:'t2',
                            message:'Terrorist didt planted bomb',
                            round:game.rooms[i].gameProgres.currentRound,
                            t1games:game.rooms[i].gameProgres.t1WinGames,
                            t2games:game.rooms[i].gameProgres.t2WinGames
                        });
                    }
                    else if (
                        game.rooms[i].gameProgres.t1Alive == 0
                        && game.rooms[i].t1 != 0
                        && !game.rooms[i].gameProgres.t1WinConditionIsSet){
                        game.rooms[i].gameProgres.t2WinGames++;
                        game.rooms[i].restartRoom();
                        io.to(i).emit('ROUND-RESULT',{
                            winer:'t2',
                            message:'Counter terrorist eliminated all terrorist',
                            round:game.rooms[i].gameProgres.currentRound,
                            t1games:game.rooms[i].gameProgres.t1WinGames,
                            t2games:game.rooms[i].gameProgres.t2WinGames
                        });
                    }
                    else if (game.rooms[i].gameProgres.t2Alive == 0
                        && game.rooms[i].t2 != 0){
                        game.rooms[i].gameProgres.t1WinGames++;
                        game.rooms[i].restartRoom();
                        io.to(i).emit('ROUND-RESULT',{
                            winer:'t1',
                            message:'Terrorists eliminated all counter terrorist',
                            round:game.rooms[i].gameProgres.currentRound,
                            t1games:game.rooms[i].gameProgres.t1WinGames,
                            t2games:game.rooms[i].gameProgres.t2WinGames
                        });
                    }
                    else if (game.rooms[i].gameProgres.t2WinConditionIsSet){
                        game.rooms[i].gameProgres.t2WinGames++;
                        game.rooms[i].restartRoom();
                        io.to(i).emit('ROUND-RESULT',{
                            winer:'t2',
                            message:'Counter terrorists defused the bomb',
                            round:game.rooms[i].gameProgres.currentRound,
                            t1games:game.rooms[i].gameProgres.t1WinGames,
                            t2games:game.rooms[i].gameProgres.t2WinGames
                        });

                    }
                }
            }
        });
        loop.start();

    }


};

ServerManager.const = {
    lobbyName:'GameLobby',
    heartBeatrate:40,
    DBServer:'http://localhost:8000/i75kTbWYk7wauW5Wh2Tb'
};

module.exports  = ServerManager;

