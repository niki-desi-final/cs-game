/**
 * Created by NikiHrs on 31.3.2016 г..
 */
var Weapon = function(weaponName,weaponDmg,weaponFireRate,weaponRange,weaponIndex,weaponMagazineSize,bulletDMG,bulletSpeed,reloadSpeed,ammoCap){
    this.wName = weaponName;
    this.wDMG = weaponDmg;
    this.wfRate = weaponFireRate;
    this.wRNG = weaponRange;
    this.wIndx = weaponIndex;
    this.wAmmo = weaponMagazineSize;
    this.wAmmoCap = ammoCap;
    this.bDMG = bulletDMG;
    this.bSpeed = bulletSpeed;
    this.rSpeed = reloadSpeed;
};
Weapon.prototype.getDamageDone = function(bulletTime){
    if (this.wAmmo <= 0){
        return 0;
    }
    if(this.const.bulletLifeTimeInMs - bulletTime > this.wRNG){
        return this.wDMG/2 + this.bDMG;
    }else {
        return this.wDMG + this.bDMG;
    }
    this.wAmmo--;
};
Weapon.prototype.const = {
    bulletLifeTimeInMs:3000
};
module.exports = Weapon;