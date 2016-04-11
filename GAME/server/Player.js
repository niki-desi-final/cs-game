/**
 * Created by niki on 24.03.16.
 */
var Weapon = require('./Weapon');


Player.Util = {
  id:0,
  defhealt:100,
  defScore: 0,
  defAmmo:100,
  defX:0,
  defY:0,
  defR:0,
  defW:10
};
function Player(playerName,team){
        this.N = playerName;
        this.r =  Player.Util.defR;
        this.h = Player.Util.defhealt;
        this.s = Player.Util.defScore;
        this.id = Player.Util.id;
        this.t = team;
        this.isFire = false;
        this.isAlive = true;
        this.deads = 0;
        this.kills = 0;
        this.weapon = null;
        this.isMoved = false;
        if (team == 't1'){
            this.x = 1494;
            this.y = 2116;
        }else if (team == 't2'){
            this.x = 73;
            this.y = 104;
        }
        Player.Util.id++;
}
Player.prototype.updateXYR = function(newStats){
        this.x = newStats.x;
        this.y = newStats.y;
        this.r = newStats.r;
        this.isMoved = true;
};
Player.prototype.updateXYRAndTrigerPosition = function(newStats){
        this.x = newStats.x;
        this.y = newStats.y;
        this.r = newStats.r;
        this.isMoved = true;
        this.isFire = true;
};

Player.prototype.respawn = function(){
    if (this.t == 't1'){
        this.x = 1494;
        this.y = 2116;
    }else if (this.t == 't2'){
        this.x = 73;
        this.y = 104;
    }
    this.r =  0;
    this.h = 100;
    this.isMoved = true;
    this.weapon.wAmmo = this.weapon.wAmmoCap;
};
Player.prototype.armWeapon = function(_weapon){
    this.weapon = _weapon;
};
Player.prototype.armArmor = function(_armor){
    this.armor = _armor;
};

module.exports  = Player;
