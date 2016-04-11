/**
 * Created by NikiHrs on 30.3.2016 г..
 */
/**
 * Created by niki on 23.03.16.
 */
var DeadState = function(game,game_master) {

    this.game = game;
    this.soketEmiter = game_master;



};

DeadState.prototype.preload = function () {

    this.game.load.image('dead-bg','assets/DeadState/dead-bg.png');
    this.game.load.image('respawn-button','assets/DeadState/respawn-button.png');



};
DeadState.prototype.create = function () {

    _this = this;
    /*Load image*/
    this.game.add.image(0,0,'dead-bg');

    /*Create button*/
    var button =  this.game.add.button(360,360,'respawn-button',function(){
        _this.soketEmiter.getSocket().emit('RESPAWN');
    });


};

DeadState.prototype.update = function () {


};




