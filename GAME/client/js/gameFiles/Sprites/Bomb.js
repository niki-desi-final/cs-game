/**
 * Created by NikiHrs on 9.4.2016 г..
 */
/**
 * Created by NikiHrs on 2.4.2016 г..
 */
function Bomb(game,stage,radio){

    this._game = game;
    this.plantStatus = 0;
    this.radio = radio;
    this._stage = stage;

    Phaser.Sprite.call(this,game,928, 1057,'bomb_spawn');
    /*custom*/
    /*from phaser*/
    this.anchor.setTo(0.5,0.5);
    this.scale.setTo(1.5,1.5);

    game.physics.enable(this,Phaser.Physics.ARCADE);
    this.addChild(game.add.sprite(0,0,'round-bomb'));
    this.children[0].scale.setTo(0.5,0.5);
    this.children[0].anchor.setTo(0.5,0.5);
    this.children[0].visible = false;
    var _this = this;
    this.radio.getSocket().emit('GET-BOMB-STATE');

    this.radio.getSocket().on('BOMB-STATE',function(isArmed){
        if(isArmed){
            _this.children[0].visible = true;
            _this.plantStatus = 100;
        }
    });
    this.radio.getSocket().on('BOMB-WAS-PLANTED',function(){
        _this._stage.sound.bombpl.play();
        _this.children[0].visible = true;
        _this.plantStatus = 100;
    });
    this.radio.getSocket().on('BOMB-WAS-DEFUSED',function(){
        _this._stage.sound.bombpl.play();
        _this.children[0].visible = false;
        _this.plantStatus = 0;
    });
    this.radio.getSocket().on('BOMB-EXPLOSION',function(){
        _this._stage.sound.bombex.play();
        _this.children[0].visible = false;
        _this.plantStatus = 0;
    });

    game.add.existing(this);
}

Bomb.prototype = Object.create(Phaser.Sprite.prototype);
Bomb.prototype.constructor = Bomb;
Bomb.prototype.plantBomb = function(){
    this.plantStatus+=0.5;
    if(this.plantStatus == 100){
        this.children[0].visible = true;
        this.radio.getSocket().emit('BOMB-PLANTED');
        this._stage.sound.bombpl.play();
        console.log('Bomb Hs ben planed')
    }
};
Bomb.prototype.defuseBomb = function(){
    this.plantStatus-=0.5;
    if (this.plantStatus == 0){
        this.children[0].visible = false;
        this.radio.getSocket().emit('BOMB-DEFUSED');
        this._stage.sound.bombdef.play();
        console.log('Bomb Has been defused');

    }
};

Bomb.prototype.update = function(){
};

