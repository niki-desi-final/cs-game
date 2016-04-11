/**
 * Created by niki on 25.03.16.
 */
Room.Itil = {
  id:0,
  terrorist:0,
  contra_terrorist:0

};
function Room(maxRounds,_roundTime){
    /*max player in same time*/
    this.roomSize = 10;
    this.curretPlayersCount = 0;
    this.t1 = 0;
    this.t2 = 0;
    this.id = Room.Itil.id;
    Room.Itil.id++;

    this.players = {};

    this.gameProgres = {
        t1WinGames:0,
        t2WinGames:0,
        t1Alive:0,
        t2Alive:0,
        t1WinConditionIsSet:false,
        t2WinConditionIsSet:false,
        currentRound:0,
        timeOfThisRound:0,
        roundTime:_roundTime

    }

}
Room.prototype.restartRoom = function(){
    this.gameProgres.t1Alive = this.t1;
    this.gameProgres.t2Alive = this.t2;
    this.gameProgres.currentRound++;
    this.gameProgres.timeOfThisRound = -5;
    this.gameProgres.t1WinConditionIsSet = false;
    this.gameProgres.t2WinConditionIsSet = false;

    for (var plIndex in this.players){
        this.players[plIndex].respawn();
    }

};

Room.prototype.addPlayer = function(player){

    if(this.curretPlayersCount == 0){
        this.gameProgres.t1WinGames = 0;
        this.gameProgres.t2WinGames = 0;
        this.gameProgres.t1Alive = 0;
        this.gameProgres.t2Alive = 0;
        this.gameProgres.t1WinConditionIsSet = false;
        this.gameProgres.t2WinConditionIsSet = false;
        this.gameProgres.currentRound = 0;
        this.gameProgres.timeOfThisRound = -5;
    }
    this.curretPlayersCount++;
    if(player.t == 't1'){
        this.t1 ++;
        this.gameProgres.t1Alive++;
    }
    else if(player.t == 't2'){
        this.t2++;
        this.gameProgres.t2Alive++;
    }
    this.players[player.id] = player;


};
Room.prototype.removePlayer = function(player){

    if (player.t == 't1'){
        this.t1--;
        this.gameProgres.t1Alive--;
    }else {
        this.t2--;
        this.gameProgres.t2Alive--;
    }
    this.curretPlayersCount--;
    delete this.players[player.id];
};


module.exports = Room;