/**
 * Created by niki on 23.03.16.
 */
var GameState = function(game,game_master,stateInitData) {

    this.game = game;
    this.soketEmiter = game_master;


    this.respawnUi = {
        respawnImage :null,
        visible:0
    };


    this.events = {
        firedPlayers:{},
        deadPlayers:{}
    };
    this.GM = {
        player : stateInitData.currentPlayer,
        roomSituation:stateInitData.roomSS
    };
    this.mapElements = {
        map:this.map,
        layer:{
            base:null,
            collider:null
        },
        minimap:null
    };
    this.gameObjects = {
        player:null,
        others:{},
        othersXYR:this.GM.roomSituation.players,
        terroristBullets:null,
        contraTerroristBullets:null,
        terroristGroup:new TerroristGroup(this.game),
        contraTerroristGroup:new CounterTerroristGroup(this.game)
    };
    this.timePoint = {
        lastUpdate:0
    };

    /*FOCUS!!!*/
    this.game.stage.disableVisibilityChange = true;
};

GameState.prototype.preload = function () {
};
GameState.prototype.create = function () {


    this.creators.createMap.call(this);
    this.gameObjects.bomb = new Bomb(this.game,this,this.soketEmiter);
    this.creators.createPlayer.call(this);
    this.creators.createBullets.call(this);
    /*create all other players*/
    this.creators.createOthers.call(this);    /*enable join in progres*/
    this.creators.dealReconects.call(this);
    this.creators.createSound.call(this);
    this.creators.createBloodEmiter.call(this);    /*update world */
    this.soketEmiter.updateWorld.call(this);    /*set world*/
    this.soketEmiter.watchIfSomeOneFire.call(this);
    this.soketEmiter.watchGunFire.call(this);    /*create UI*/
    this.Ui.createUi.call(this);
    this.Ui.createMinimap.call(this);
    this.respawnUi.respawnImage = this.game.add.image(30, 100, 'deadMSG');
    this.respawnUi.respawnImage.fixedToCamera = true;
    this.respawnUi.respawnImage.visible = false;
    console.log(this.gameObjects.bomb);
};

GameState.prototype.update = function () {
    this.collision();
    this.updateWorld(this);
    this.drawMinimap();

};
GameState.prototype.render = function(){
    //this.game.debug.spriteInfo(this.gameObjects.player, 32, 32);

};

GameState.prototype.updateWorld = function(stage){

    var changedPositons = stage.gameObjects.othersXYR.data;
    if(this.timePoint.lastUpdate != stage.gameObjects.othersXYR.data) {
        for (var posIndex in changedPositons) {
            if (posIndex == stage.GM.player.id) {
                continue;
            }
            try{
                var position = changedPositons[posIndex];
                stage.gameObjects.others[posIndex].x = position.x;
                stage.gameObjects.others[posIndex].y = position.y;
                stage.gameObjects.others[posIndex].rotation = position.r;
                stage.gameObjects.others[posIndex].health = position.h;
            }
            catch (e){
            }
        }
        this.timePoint.lastUpdate = stage.gameObjects.othersXYR.time;
    }
    for(var fireIndex in stage.events.firedPlayers){
        if(stage.events.firedPlayers[fireIndex].mustFire){
            stage.gameObjects.others[fireIndex].x = stage.events.firedPlayers[fireIndex].x;
            stage.gameObjects.others[fireIndex].y = stage.events.firedPlayers[fireIndex].y;
            stage.gameObjects.others[fireIndex].rotation = stage.events.firedPlayers[fireIndex].r;
            stage.gameObjects.others[fireIndex].shoot();
            stage.events.firedPlayers[fireIndex].mustFire = false;
        }
    }
};

GameState.prototype.Ui = {
    createUi:function(){
        this.GameUi = {
            healthText:this.game.add.text(16,550,'HEALTH : '+ this.gameObjects.player.health,{ font: '20px Arial', fill: '#0071b5  ',fontWeight:'bold',stroke:'#000000',strokeThickness:6,fill:'#FFA500' }),
            scoreText:this.game.add.text(550,550,'SCORE : '+ this.gameObjects.player.score,{ font: '20px Arial', fill: '#0071b5  ',fontWeight:'bold',stroke:'#000000',strokeThickness:6,fill:'#FFA500'}),
            ammoText:this.game.add.text(180,550,'AMMO : '+ this.gameObjects.player.weapons[this.gameObjects.player.weapons.selectedWeapon].wAmmo,{ font: '20px Arial', fill: '#0071b5  ',fontWeight:'bold',stroke:'#000000',strokeThickness:6,fill:'#FFA500'}),
            timeText:this.game.add.text(300,30,'TIME : 0',{ font: '20px Arial', fill: '#0071b5  ',fontWeight:'bold',stroke:'#000000',strokeThickness:6,fill:'#FFA500'}),
            terroristGames:this.game.add.text(16,36,'Terrorist : 0',{ font: '14px Arial', fill: '#0071b5  ',fontWeight:'bold',stroke:'#000000',strokeThickness:6,fill:'#FFA500'}),
            counter_terroristGames:this.game.add.text(16,56,'Counter-Terrorist : 0',{ font: '14px Arial', fill: '#0071b5  ',fontWeight:'bold',stroke:'#000000',strokeThickness:6,fill:'#FFA500'}),
            weapon:this.game.add.text(330,550,'USP',{ font: '20px Arial', fill: '#0071b5  ',fontWeight:'bold',stroke:'#000000',strokeThickness:6,fill:'#FFA500'})
        };
        this.GameUi.healthText.fixedToCamera = true;
        this.GameUi.ammoText.fixedToCamera = true;
        this.GameUi.scoreText.fixedToCamera = true;
        this.GameUi.timeText.fixedToCamera = true;
        this.GameUi.terroristGames.fixedToCamera = true;
        this.GameUi.counter_terroristGames.fixedToCamera = true;
        this.GameUi.weapon.fixedToCamera = true;

    },
    createMinimap:function () {
        var mapData = this.mapElements.map;
        var miniMapSizeW = mapData.width/2.5;
        var miniMapSizeH = mapData.height/2.5;

        var miniMapBmd = this.game.add.bitmapData(mapData.width * miniMapSizeW , mapData.height * miniMapSizeH);

        for (var l = 0; l < mapData.layers.length; l++) {
            for (var y = 0; y < mapData.height; y++) {
                for (var x = 0; x < mapData.width; x++) {
                    var tile = mapData.getTile(x, y, l);
                    if (tile && mapData.layers[l].name == 'base') {
                        // fill a pixel in the minimap
                        miniMapBmd.ctx.fillStyle = '#cccccc';
                        miniMapBmd.ctx.fillRect(x * miniMapSizeW, y * miniMapSizeH ,miniMapSizeW, miniMapSizeH);
                    } else if(tile && mapData.layers[l].name == 'collidable'){
                        // fill a pixel in the minimap
                        miniMapBmd.ctx.fillStyle = '#3c3c3c';
                        miniMapBmd.ctx.fillRect(x * miniMapSizeW, y * miniMapSizeH ,miniMapSizeW, miniMapSizeH);
                    }else if(tile && mapData.layers[l].name == 'watar'){
                        // fill a pixel in the minimap
                        miniMapBmd.ctx.fillStyle = '#0071b5';
                        miniMapBmd.ctx.fillRect(x * miniMapSizeW, y * miniMapSizeH ,miniMapSizeW, miniMapSizeH);
                    }
                }
            }
        }
        this.miniMap = this.game.add.sprite(600, 10, miniMapBmd);
        this.miniMap.scale.setTo(0.1,0.1);
        this.miniMap.fixedToCamera = true;
        this.miniMap.alpha = 0.8;

        this.miniMapBMDPlayer = this.game.add.bitmapData(mapData.width * miniMapSizeW , mapData.height * miniMapSizeH);
        this.miniMapPlayer = this.game.add.sprite(600,10,this.miniMapBMDPlayer);
        this.miniMapPlayer.scale.setTo(0.1,0.1);
        this.miniMapPlayer.fixedToCamera = true;


    }
};
GameState.prototype.collision = function(){
    var _this = this;
    /*Collide player with layer*/
    this.game.physics.arcade.collide(this.gameObjects.player, this.mapElements.layer.collider);
    this.game.physics.arcade.collide(this.gameObjects.player, this.mapElements.layer.water);
    /*Collide bullets with layer*/

    this.game.physics.arcade.collide(this.gameObjects.player.bullets,this.mapElements.layer.collider,function(bullet){
        bullet.kill();

    });
    if(this.GM.player.t == 't1'){
        this.game.physics.arcade.collide(this.gameObjects.contraTerroristBullets,this.mapElements.layer.collider,function(bullet){
            if(
                _this.gameObjects.player.x - 100 < bullet.x &&
                _this.gameObjects.player.x + 100 > bullet.x &&
                _this.gameObjects.player.y - 100 < bullet.y &&
                _this.gameObjects.player.y + 100 > bullet.y
            ){
                _this.playBulletRicochet();
            }
            bullet.kill();

            /*ti*/
        });
        this.game.physics.arcade.collide(this.gameObjects.terroristBullets,this.mapElements.layer.collider,function(bullet){
            bullet.kill();

        });
    }else {
        this.game.physics.arcade.collide(this.gameObjects.contraTerroristBullets,this.mapElements.layer.collider,function(bullet){
            bullet.kill();
        });
        this.game.physics.arcade.collide(this.gameObjects.terroristBullets,this.mapElements.layer.collider,function(bullet){
            if(
                _this.gameObjects.player.x - 100 < bullet.x &&
                _this.gameObjects.player.x + 100 > bullet.x &&
                _this.gameObjects.player.y - 100 < bullet.y &&
                _this.gameObjects.player.y + 100 > bullet.y
            ){
                _this.playBulletRicochet();
            }
            bullet.kill();

            /*ti*/
        });
    }
    /*this.game.physics.arcade.collide(this.gameObjects.contraTerroristBullets,this.mapElements.layer.collider,function(bullet){
        bullet.kill();
    });
    this.game.physics.arcade.collide(this.gameObjects.terroristBullets,this.mapElements.layer.collider,function(bullet){
        bullet.kill();
    });*/

    /*PLAYER HIT and HITING*/
    if (this.GM.player.t == 't1'){
        this.game.physics.arcade.overlap(
            this.gameObjects.contraTerroristBullets,
            this.gameObjects.player,
            function(player,bullet){
                bullet.kill();

            });
        var other = this.gameObjects.others;
        for(var indx in other){
            if( other[indx].team == 't2'){

                this.game.physics.arcade.overlap(this.gameObjects.player.bullets,this.gameObjects.others[indx],function(enemy,bullet){
                    bullet.kill();
                    _this.bloodEmitter.x = enemy.x;
                    _this.bloodEmitter.y = enemy.y;
                    _this.bloodEmitter.start(true,300,null,5);
                    _this.gameObjects.player.emitHitSomeOne(indx,bullet.lifespan);
                });
                this.game.physics.arcade.overlap(this.gameObjects.terroristBullets,this.gameObjects.others[indx],function(enemy,bullet){

                    _this.bloodEmitter.x = enemy.x;
                    _this.bloodEmitter.y = enemy.y;
                    _this.bloodEmitter.start(true,300,null,5);
                    bullet.kill();
                })
            }
        }
    }
    if(this.GM.player.t == 't2'){
        this.game.physics.arcade.overlap(
            this.gameObjects.terroristBullets,
            this.gameObjects.player,
            function(player,bullet){
                bullet.kill();
            });
        var other = this.gameObjects.others;
        for(var indx in other){
            if( other[indx].team == 't1'){

                this.game.physics.arcade.overlap(this.gameObjects.player.bullets,this.gameObjects.others[indx],function(enemy,bullet){
                    bullet.kill();

                    _this.bloodEmitter.x = enemy.x;
                    _this.bloodEmitter.y = enemy.y;
                    _this.bloodEmitter.start(true,300,null,5);
                    _this.gameObjects.player.emitHitSomeOne(indx,bullet.lifespan);
                });
                this.game.physics.arcade.overlap(this.gameObjects.contraTerroristBullets,this.gameObjects.others[indx],function(enemy,bullet){

                    _this.bloodEmitter.x = enemy.x;
                    _this.bloodEmitter.y = enemy.y;
                    _this.bloodEmitter.start(true,300,null,5);
                    bullet.kill();
                });
            }
        }
    }
};
GameState.prototype.drawMinimap = function(){
    this.miniMapBMDPlayer.context.clearRect(0,0,this.miniMapBMDPlayer.width,this.miniMapBMDPlayer.height);
    this.miniMapBMDPlayer.ctx.fillStyle = "#008800";
    this.miniMapBMDPlayer.ctx.fillRect(Math.floor(this.gameObjects.player.x /1.59),Math.floor(this.gameObjects.player.y /1.16), 40, 40);
    this.miniMapBMDPlayer.dirty = true;
};
GameState.prototype.playBulletRicochet = function(){
    this.sound.ric[Math.floor(Math.random() * 5)].play();
};


GameState.prototype.creators = {
    createBullets:function(){
        this.gameObjects.terroristBullets = new TerroristBulletGroup(this.game);
        this.gameObjects.contraTerroristBullets = new CounterTerroristBullet(this.game);
        this.game.add.existing(this.gameObjects.terroristBullets);
        this.game.add.existing(this.gameObjects.contraTerroristBullets);
    },
    createPlayer:function(){
        this.gameObjects.player = new Player(this.game,this,this.GM.player.x,this.GM.player.y,this.GM.player.t,
            this.GM.player.r,this.GM.player.N,this.GM.player.id,this.GM.player.h,0,this.GM.player.weapons,this.GM.player.armor,this.soketEmiter);
    },
    createMap:function(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.mapElements.map = this.game.add.tilemap('jsData');
        this.mapElements.map.addTilesetImage('aztec','mapBlocks');
        this.mapElements.layer.base = this.mapElements.map.createLayer('base');
        this.mapElements.layer.collider = this.mapElements.map.createLayer('collidable');
        this.mapElements.map.setCollisionBetween(1,100,true,'collidable');
        this.mapElements.layer.water = this.mapElements.map.createLayer('watar');
        this.mapElements.map.setCollisionBetween(1,100,true,'watar');

        this.mapElements.layer.collider.resizeWorld();
        this.mapElements.layer.base.resizeWorld();

    },

    /*create sprites for all players in game*/
    createOthers:function(){
        var otherPlayerData = this.GM.roomSituation.players;
        for(var otherPlayer in otherPlayerData){
            var obj = otherPlayerData[otherPlayer];
            if(obj.t == 't1'){
                this.gameObjects.others[obj.id] = new OtherPlayer(this.game,obj.x,obj.y,obj.t,obj.r,obj.N,obj.h,obj.s,obj.weapons,this.gameObjects.terroristBullets);
                this.game.add.existing(this.gameObjects.others[obj.id]);

            }else {
                this.gameObjects.others[obj.id] = new OtherPlayer(this.game,obj.x,obj.y,obj.t,obj.r,obj.N,obj.h,obj.s,obj.weapons,this.gameObjects.contraTerroristBullets);
                this.game.add.existing(this.gameObjects.others[obj.id]);
            }
        }
    },
    dealReconects:function(){
        var _this = this;
        this.soketEmiter.getSocket().on('NEW-PLAYER-JOINED',function(obj){

            _this.gameObjects.others[obj.id] =  new OtherPlayer(_this.game,obj.x,obj.y,obj.t,obj.r,obj.N,obj.h,obj.s,
                obj.weapons,obj.t=='t1'?_this.gameObjects.terroristBullets:_this.gameObjects.contraTerroristBullets);
            _this.game.add.existing(_this.gameObjects.others[obj.id]);


        });
        this.soketEmiter.getSocket().on('PLAYER-DISCONECTED',function(id){

                _this.gameObjects.others[id].destroy();
                delete _this.gameObjects.others[id];
        });
    },
    createSound:function(){
        this.sound = {};
        this.sound.die = this.game.add.audio('dieSound');
        this.sound.hit = this.game.add.audio('hitSound');
        this.sound.fire = this.game.add.audio('fireSound');
        this.sound.w_empty = this.game.add.audio('w_empty');
        this.sound.w_clipout = this.game.add.audio('w_clipout');
        this.sound.w_clipin = this.game.add.audio('w_clipin');
        this.sound.ctwin = this.game.add.audio('ctwin');
        this.sound.terwin = this.game.add.audio('terwin');
        this.sound.go = this.game.add.audio('go');
        this.sound.bombpl = this.game.add.audio('bombpl');
        this.sound.bombdef = this.game.add.audio('bombdef');
        this.sound.bombex = this.game.add.audio('bombex');
        this.sound.wpn_hudon = this.game.add.audio('wpn_hudon');
        this.sound.weapons=[
            this.game.add.audio('fireUSP'),
            this.game.add.audio('fireFnf2000'),
            this.game.add.audio('fireAk47'),
            this.game.add.audio('fireP90'),
            this.game.add.audio('fireAWP'),
            this.game.add.audio('fireM4a1'),
        ];


        this.sound.ric = [
            this.game.add.audio('ric1',0.3),
            this.game.add.audio('ric2',0.3),
            this.game.add.audio('ric3',0.3),
            this.game.add.audio('ric4',0.3),
            this.game.add.audio('ric5',0.3)
        ];
        for (var i = 0;i < this.sound.ric.length;i++){
            this.sound.ric[i].allowMultiple = true;
        }
    },
    createBloodEmiter:function(){
        this.bloodEmitter = this.game.add.emitter(0,0,50);
        this.bloodEmitter.makeParticles('blood');
    }

};





