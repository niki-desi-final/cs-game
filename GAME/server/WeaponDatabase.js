/**
 * Created by NikiHrs on 11.4.2016 г..
 */
var Weapon = require('./Weapon');

var WeaponDB = {
    '6':new Weapon('USP',6,200,1000,0,8,2,800,1000,8),
    '10':new Weapon('Fnf2000',10,90,1000,0,30,5,900,2800,30),
    '7':new Weapon('Ak47',20,110,1000,0,30,1,1100,2800,30),
    '8':new Weapon('P90',10,70,1000,0,50,5,1100,2200,50),
    '11':new Weapon('AWP',50,1800,1000,0,10,20,1100,3000,10),
    '9':new Weapon('M4a1',18,120,1000,0,30,5,1100,280,30)
};

module.exports = WeaponDB;
