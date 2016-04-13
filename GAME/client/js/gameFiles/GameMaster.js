/**
 * Created by niki on 26.03.16.
 */
/**
 * This class will handle socket io with node.js serverl
 */

var GameMaster = function (dom_edtr) {

    var socket = io();

    var ServerSettings = {
        nextUpdate:0,
        updateRate:null
    };
    var GameSettings = {
        rooms:null,
        currentJoinedRoom:null
    };

    /**
     * Get meta info from server;
     */
    socket.on('JOINED-LOBBY',function (joined_lobby_responce) {

        ServerSettings.updateRate = joined_lobby_responce.serverSettings.hearbeatRate;
        GameSettings = joined_lobby_responce;
        /**
         * Need user name for results persist;
         */
        socket.emit('INIT-DATA',dom_edtr.getUserData());


    });
    socket.on('USERNAME-RESOLVED',function(name){
        dom_edtr.setName(name);
    });

    /*STEP 2*/
    socket.on('GAME SITUATION',function (serverResponse) {
        GameSettings.currentJoinedRoom = serverResponse.roomSituation;
    });
    socket.on('SERVER-CHANGED-WEAPON',function (serverResponse) {
    });






    return {
        getRooms:function(){
            return GameSettings.rooms;
        },
        getCurrentRoom:function(){
            return GameSettings.currentJoinedRoom;
        },
        /*!!! get called with .call() */
        updateWorld:function () {

            var gameThis = this;
            var resPos = {};
            if (gameThis.GM.player.t == 't1'){
                resPos.x = 1494;
                resPos.y = 2116;
            }else if (gameThis.GM.player.t  == 't2'){
                resPos.x = 73;
                resPos.y = 104;
            }
            socket.on('UPDATE-WORLD',function (update) {
                gameThis.gameObjects.othersXYR = update;
            });
            socket.on('ROUND-TICK',function (time) {
                gameThis.GameUi.timeText.setText('TIME : '+ time);
                if (time < 0){
                    gameThis.gameObjects.player.x = resPos.x;
                    gameThis.gameObjects.player.y = resPos.y;
                }else if(time == 0){
                    gameThis.sound.go.play();
                }
            });
            socket.on('ROUND-RESULT',function(data){
                if(data.winer == 't1'){
                    gameThis.sound.terwin.play();
                    gameThis.GameUi.terroristGames.setText('Terrorist : '+ data.t1games);

                }else if(data.winer == 't2'){
                    gameThis.sound.ctwin.play();
                    gameThis.GameUi.counter_terroristGames.setText('Counter-Terrorist : '+ data.t2games);

                }
                socket.emit('GET-MY-XY');
                gameThis.respawnUi.respawnImage.visible = false;
                gameThis.gameObjects.player.visible = true;
                gameThis.gameObjects.bomb.children[0].visible = false;
                gameThis.gameObjects.bomb.plantStatus = 0;
                for(var i in gameThis.gameObjects.others){
                    gameThis.gameObjects.others[i].visible = true;
                }

            });
            socket.on('SEND-XY',function(data){

                gameThis.gameObjects.player.x = data.x;
                gameThis.gameObjects.player.y = data.y;
                gameThis.GameUi.healthText.setText('HEALT : '+ data.h);
                gameThis.GameUi.ammoText.setText('AMMO : '+ data.weapons[data.weapons.selectedWeapon].wAmmo);
            });
        },
        watchIfSomeOneFire:function () {
            var gameThis = this;
            socket.on('SOMEONE-FIRED',function (data) {
                gameThis.events.firedPlayers[data.id] = data;
                gameThis.events.firedPlayers[data.id].mustFire = true;
            });
            
        },
        watchGunFire:function () {
            var stage = this;
            socket.on('TANGO-DOWN',function (data) {
                stage.gameObjects.others[data.tango].visible = false;
            });
            socket.on('SOMEONE-DIED',function(data){
                if(data.tango == stage.GM.player.id){
                    stage.gameObjects.player.visible = false;
                    stage.gameObjects.player.weapons[stage.gameObjects.player.weapons.selectedWeapon].wAmmo = 0;
                    stage.GameUi.healthText.setText('HEALT :'+ 0);
                    stage.respawnUi.respawnImage.visible = true;
                    stage.sound.die.play();
                }
            });
            socket.on('PLAYER-SPAWNED',function (serverResponse) {

                stage.gameObjects.player.respawn(serverResponse);
                stage.gameObjects.player.visible = true;
                stage.GameUi.healthText.setText('HEALTH :'+ 100);
                stage.GameUi.ammoText.setText('AMMO :'+ stage.gameObjects.player.weapons[stage.gameObjects.player.weapons.selectedWeapon].wAmmo);
                stage.respawnUi.on = false;
                stage.respawnUi.visible = false;

            });
            socket.on('TANGO-HIT',function(data){
                stage.GameUi.scoreText.setText('SCORE :' + parseInt(data.score));
            });
            socket.on('OTHER-SPAWNED',function(playerID){
                stage.gameObjects.others[playerID].visible = true;
            });
            socket.on('SOMEONE-GET-HIT',function(data){
                if(data.tango == stage.GM.player.id){
                    stage.GameUi.healthText.setText('HEALTH :'+ data.tangohealt);
                    stage.sound.hit.play();
                    stage.bloodEmitter.x = stage.gameObjects.player.x;
                    stage.bloodEmitter.y = stage.gameObjects.player.y;
                    stage.bloodEmitter.start(true,300,null,5);
                }
            });
            socket.on('RELOADED-WEAPON',function(ammo){
                stage.gameObjects.player.weapons[stage.gameObjects.player.weapons.selectedWeapon].wAmmo = ammo;
                stage.gameObjects.player.weapons[stage.gameObjects.player.weapons.selectedWeapon].isReloading = false;
                stage.sound.w_clipin.play();
                stage.GameUi.ammoText.setText('AMMO :'+ stage.gameObjects.player.weapons[stage.gameObjects.player.weapons.selectedWeapon].wAmmo)

            });

            socket.on('SOMEONE-CHANGED-WEAPON',function (who) {
                stage.gameObjects.others[who.playerId].switchWeapon(who.newWeapon);
            });
            socket.on('SERVER-CHANGED-WEAPON',function () {
                stage.sound.wpn_hudon.play();
                stage.GameUi.ammoText.setText('AMMO :'+ stage.gameObjects.player.weapons[stage.gameObjects.player.weapons.selectedWeapon].wAmmo);
            });

            
        },

        emitXYR:function (_x,_y,_r) {
            var now = Date.now();
            if(now > ServerSettings.nextUpdate){
                ServerSettings.nextUpdate = now + ServerSettings.updateRate;
                socket.emit('PLAYER-POSITION',{x:_x,y:_y,r:_r});
            }
        },
        getGameSettings:function () {
            return gameSettings;
        },
        getSocket:function () {
            return socket;
        },
        getServerHeartBeat:function () {
            return serverSettings.hbr;
        }
    };



}(DomEditor);


