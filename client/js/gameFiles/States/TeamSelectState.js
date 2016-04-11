/**
 * Created by NikiHrs on 31.3.2016 г..
 */
/**
 * Created by niki on 23.03.16.
 */
var TeamSelectState = function(game,game_master) {

    this.game = game;
    this.soketEmiter = game_master;

    this.Ui = {};




};

TeamSelectState.prototype.preload = function () {

    this.game.load.image('menu_background','assets/TeamSelect/team_select_menu_bg.png');
    this.game.load.image('terrorist_button','assets/TeamSelect/counter_terrorist_button.png');
    this.game.load.image('counter_terrorist_button','assets/TeamSelect/terrorist_button.png');


};
TeamSelectState.prototype.create = function () {

    var _this = this;
    /*Load image*/
    var background = this.game.add.image(0,0,'menu_background');

    background.height = this.game.world.height;
    background.width = this.game.world.width;

    var style = { font: "22px Arial", fill: "#ccc", tabs: [ 150, 20,15 ] };

    this.Ui.terrorists = this.game.add.text(100, 300, 'Players ' + this.soketEmiter.getCurrentRoom().t1, style);
    this.Ui.counter_terrorists = this.game.add.text(500, 300, 'Players ' + this.soketEmiter.getCurrentRoom().t2, style);

    /*terrorist pick*/
    this.game.add.button(50,400,'counter_terrorist_button',function(){
        _this.soketEmiter.getSocket().emit('PLAY-SELECTED-TEAM','t1');
    });

    /*counter-terrorist pick*/
    this.game.add.button(450,400,'terrorist_button',function(){
        _this.soketEmiter.getSocket().emit('PLAY-SELECTED-TEAM','t2');
    });



};

TeamSelectState.prototype.update = function () {


};
TeamSelectState.prototype.render = function(){
};
TeamSelectState.prototype.renderScore = function(){

};
