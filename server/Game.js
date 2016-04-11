var Room = require('./Room');

function Game(roomsCount){

    this.rooms = {};

    for(var i = 0 ;i < roomsCount; i++){
        this.rooms[i] = new Room(5,70);
    };

};

Game.prototype.joinPlayerInRoom = function(player,roomId){

    this.rooms[roomId].addPlayer(player);
};

Game.prototype.getPlayerFromRoom = function (playerId,roomId) {

    var p = this.rooms[roomId].players[playerId];

    return p;

};
Game.prototype.setPlayerXYR = function (playerID,roomId,xyr_values) {

    try{
        this.rooms[roomId].players[playerID].updateXYR(xyr_values);
    }
    catch(e) {
        console.log(e)
    }

};
Game.prototype.playerFireWeapons = function (playerID,roomId,xyr_values) {

    this.rooms[roomId].players[playerID].updateXYR(xyr_values);

};
Game.prototype.playerUpdateAmmo = function (playerId,roomId,ammo_value) {

    this.rooms[roomId].players[playerId].updateAmmo(ammo_value);

};
Game.prototype.updatePlayerScore = function (playerId,roomId,score_value) {

    this.rooms[roomId].players[playerId].updateScore(score_value);
};
Game.prototype.updatePlayerHealth =function (playerId,roomId,health_value) {

    this.rooms[roomId].players[playerId].updateHealth(health_value);
};

module.exports = Game;