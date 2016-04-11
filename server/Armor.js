/**
 * Created by NikiHrs on 4.4.2016 г..
 */
var Armor = function(armorID,armorName,armorDurability,damageReduction){
    this.id = armorID;
    this.armorName = armorName;
    this.durability = armorDurability;
    this.dR = damageReduction;
};
Armor.prototype.dmgReduce = function(incomingDamage){
    this.durability -= incomingDamage;
    if (this.durability > 0){
        return incomingDamage - (incomingDamage * this.dR /100);
    }else {
        return incomingDamage;
    }

};

module.exports = Armor;