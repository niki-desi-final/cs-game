/**
 * Created by NikiHrs on 2.4.2016 г..
 */
function OtherPlayer(game,x,y,team,r,name,health,score,weapons,bulletGroup){

    this._game = game;
    var asset_key = null;
    if(team == 't1'){
        asset_key = 'terroristSprite';
    }else {
        asset_key = 'counterTerroristSprite';
    }
    Phaser.Sprite.call(this,game,x, y,asset_key);
    this.addChild(game.add.image(0,0,'weaponsSprite'));
    this.children[0].frame = 0;
    /*custom*/
    this.rotation = r;
    this.name = name;
    this.health = health;
    this.score = score;
    this.weapons = weapons;
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



OtherPlayer.prototype = Object.create(Phaser.Sprite.prototype);
OtherPlayer.prototype.constructor = OtherPlayer;

OtherPlayer.prototype.shoot = function(){
    var bullet = this.bullets.getFirstExists(false);
    this.bullets.resetChild(bullet,this.x,this.y);
    bullet.rotation = this.rotation;
    this._game.physics.arcade.velocityFromRotation(this.rotation,this.weapons[this.weapons.selectedWeapon].bSpeed,bullet.body.velocity);
};
OtherPlayer.prototype.switchWeapon = function(key){
    if(this.weapons[key] != undefined){
        this.weapons.selectedWeapon = key;
        this.children[0].frame = key;
    }
};
OtherPlayer.prototype.update = function(){

};

