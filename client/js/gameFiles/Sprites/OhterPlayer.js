/**
 * Created by NikiHrs on 2.4.2016 г..
 */
function OhterPlayer(game,x,y,team,r,name,health,score,weapon,bulletGroup){

    this._game = game;
    var asset_key = null;
    if(team == 't1'){
        asset_key = 'terroristSprite';
    }else {
        asset_key = 'counterTerroristSprite';
    }
    Phaser.Sprite.call(this,game,x, y,asset_key);
    this.addChild(game.add.sprite(0,0,'weapon'));
    /*custom*/
    this.rotation = r;
    this.name = name;
    this.health = health;
    this.score = score;
    this.weapon = weapon;
    this.team = team;
    /*from phaser*/
    this.anchor.setTo(0.5,0.5);

    game.physics.enable(this,Phaser.Physics.ARCADE);
    this.body.maxVelocity.y = 100;
    this.body.maxVelocity.x = 100;
    this.body.drag.x = 100;
    this.body.drag.y = 100;
    this.body.collideWorldBounds = true;
    this.bullets = bulletGroup;


}



OhterPlayer.prototype = Object.create(Phaser.Sprite.prototype);
OhterPlayer.prototype.constructor = OhterPlayer;

OhterPlayer.prototype.shoot = function(){

    var bullet = this.bullets.getFirstExists(false);
    this.bullets.resetChild(bullet,this.x,this.y);
    bullet.rotation = this.rotation;
    this._game.physics.arcade.velocityFromRotation(this.rotation,this.weapon.bSpeed,bullet.body.velocity);

};
OhterPlayer.prototype.update = function(){


};

