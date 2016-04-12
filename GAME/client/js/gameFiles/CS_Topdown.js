/**
 * Created by niki on 23.03.16.
 */
var CS_Topdown = function (game_master) {

    var game = new Phaser.Game(720 , 576 , Phaser.CANVAS, 'game');;
    var gameState = null;
    var menuState = null;
    var deadState = null;
    var joinGameState = null;
    var teamSelectState = null;
    var gameSettings = null;
    var GM = game_master;

    menuState = new MenuState(game,game_master);
    game.state.add('start-menu',menuState,false);

    joinGameState = new JoinGameState(game,game_master);
    game.state.add('join-game-menu',joinGameState,false);

    teamSelectState = new TeamSelectState(game,game_master)
    game.state.add('team-select-game-menu',teamSelectState,false);


    //gameState = new GameState(game,game_master);
    //game.state.add('game-state',gameState,false);

    return {
        init:function () {

            game.state.start('start-menu');
        },
        showTeamSelectState:function(){
            game.state.start('team-select-game-menu');

        },
        showGameState:function(stateInitData){
            gameState = new GameState(game,game_master,stateInitData);
            game.state.add('game-state',gameState,true);
            //game.stage.start('game-state')
        },
        showDeadState:function(){
            deadState = new DeadState(game,game_master);
            game.state.add('dead-state',deadState,false);
            game.state.start('dead-state');
        }

    }


}(GameMaster,DomEditor);

CS_Topdown.init();

GameMaster.getSocket().on('GAME SITUATION',function () {
    CS_Topdown.showTeamSelectState();
});
GameMaster.getSocket().on('LOAD-GAME',function (startGameData) {
    CS_Topdown.showGameState(startGameData);
});
