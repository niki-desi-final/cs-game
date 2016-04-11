/**
 * Created by niki on 23.03.16.
 */
var JoinGameState = function(game,game_master) {

    this.game = game;
    this.soketEmiter = game_master;

    this.Ui = {};


};

JoinGameState.prototype.preload = function () {

    this.game.load.image('menu_background','assets/GameSelectState/select_room.png');
    this.game.load.image('refresh-button','assets/GameSelectState/refreshButton.png');
    this.game.load.image('join-game-button','assets/GameSelectState/buttonJoinGame.png');


};
JoinGameState.prototype.create = function () {

    var _this = this;
    /*Load image*/
    var background = this.game.add.image(0,0,'menu_background');

    background.height = this.game.world.height;
    background.width = this.game.world.width;

    var style = { font: "22px Arial", fill: "#ccc", tabs: [ 80, 20,15 ] };
    var headings = [ 'Room', 'P','/', 'Max'];
    var rooms = this.soketEmiter.getRooms();

    var head = this.game.add.text(50, 90, '', style);
    head.parseList(headings);
    this.Ui.serverSelectBody = this.game.add.text(50, 115, '', style);
    this.Ui.serverSelectBody.parseList(this.transformToArray(rooms));

    this.createJoinButtons();

    /*Create button*/
    this.game.add.button(400,500,'refresh-button',function(){
        _this.soketEmiter.getSocket().emit('REFRESH-ROOMS');
    });



};

JoinGameState.prototype.update = function () {

    this.Ui.serverSelectBody.parseList(this.transformToArray(this.soketEmiter.getRooms()));

};
JoinGameState.prototype.render = function(){
};
JoinGameState.prototype.transformToArray = function(rooms){
    var roomArray = [];
    for (roomIndex in rooms){
        var room = rooms[roomIndex];
        roomArray.push([room.id+1,room.curretPlayersCount,'/',room.roomSize]);
    }

    return roomArray;
};
JoinGameState.prototype.createJoinButtons = function(){
    var height = 115;
    var buttons = [];
    var functions = [];
    var _this = this;
    function functionFactory(i){
        return function (){
            _this.soketEmiter.getSocket().emit('JOIN ROOM',i);
        }
    }

    for (var i = 0;i <= 9; i++ ){

        functions[i] = functionFactory(i);
    }
    for (var j = 0;j <= 9; j++ ){


        buttons.push(this.game.add.button(220,height,'join-game-button',
            functions[j]));
        height += 30;
    }

};






