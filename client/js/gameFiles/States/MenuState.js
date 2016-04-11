/**
 * Created by niki on 23.03.16.
 */
var MenuState = function(game,game_master) {

    this.game = game;
    this.soketEmiter = game_master;

};

MenuState.prototype.preload = function () {

    this.game.load.image('menu_background','assets/MenuState/bg-picture.png');
    this.game.load.image('start-battle','assets/MenuState/startButton.png');
    /*Others */
    /*player*/
    this.game.load.spritesheet('terroristSprite','assets/GameState/25x25terrorist3.png',27,27,5);
    this.game.load.spritesheet('counterTerroristSprite','assets/GameState/25x25contra_terrorist3.png',27,27,5);
    /*Map*/
    this.game.load.tilemap('jsData','assets/GameState/map.json',null,Phaser.Tilemap.TILED_JSON);
    this.game.load.image('mapBlocks','assets/GameState/aztec.bmp');
    /*Bullets*/
    this.game.load.image('bullet','assets/GameState/bullet.png');
    this.game.load.image('weapon','assets/GameState/weapon.png');
    /*Dead message*/
    this.game.load.image('deadMSG','assets/GameState/dead_msg.png');
    this.game.load.image('bomb_spawn','assets/GameState/bomb_spawn.png');
    this.game.load.image('round-bomb','assets/GameState/round-bomb.png');
    this.game.load.image('blood','assets/GameState/blood.png');
    this.game.load.image('bomb','assets/GameState/bomb.png');
    this.game.load.image('pliers','assets/GameState/pliers.png');
/*LOAD AUDIO*/
    this.game.load.audio('dieSound', 'assets/GameState/sound/die1.wav');
    this.game.load.audio('hitSound', 'assets/GameState/sound/hit2.wav');
    this.game.load.audio('fireSound', 'assets/GameState/sound/ak47.wav');
    this.game.load.audio('w_empty', 'assets/GameState/sound/w_empty.wav');
    this.game.load.audio('w_clipout', 'assets/GameState/sound/w_clipout.wav');
    this.game.load.audio('w_clipin', 'assets/GameState/sound/w_clipin.wav');
    this.game.load.audio('ctwin', 'assets/GameState/sound/ctwin.ogg');
    this.game.load.audio('terwin', 'assets/GameState/sound/terwin.ogg');
    this.game.load.audio('go', 'assets/GameState/sound/go.ogg');
    this.game.load.audio('bombpl', 'assets/GameState/sound/bombpl.ogg');
    this.game.load.audio('bombdef', 'assets/GameState/sound/bombdef.ogg');
    this.game.load.audio('bombex', 'assets/GameState/sound/bombex.mp3');
    this.game.load.audio('ric1', 'assets/GameState/sound/ric1.ogg');
    this.game.load.audio('ric2', 'assets/GameState/sound/ric2.ogg');
    this.game.load.audio('ric3', 'assets/GameState/sound/ric3.ogg');
    this.game.load.audio('ric4', 'assets/GameState/sound/ric4.ogg');
    this.game.load.audio('ric5', 'assets/GameState/sound/ric5.ogg');




};
MenuState.prototype.create = function () {

    var _this = this;
    /*Load image*/
    var background =  this.game.add.image(0,0,'menu_background');
    background.height = this.game.world.height;
    background.width = this.game.world.width;
    /*Create button*/
    var b = this.game.add.button(30,this.game.world.centerY +50 ,'start-battle',function(){
        _this.game.state.start('join-game-menu');
    });
    b.scale.setTo(0.5, 0.5);


};

MenuState.prototype.update = function () {

};
MenuState.prototype.render = function(){
};
MenuState.prototype.Ui = {



};






