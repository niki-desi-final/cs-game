/**
 * Created by niki on 25.03.16.
 */
var LocalMemoryStorage = function () {

    var otherPlayers = {};

    return{
        setOtherPlayers:function (players) {
            otherPlayers = players;
            console.log('changes')
        },
        getOtherPlayers:function () {
            return otherPlayers;
        },
        addNewPlayer:function (player) {
            console.log('New user loged');
            otherPlayers[player.id] = player;
        },
        deletePlayer:function (playerId) {
            //delete otherPlayers[playerId];
        }
    }

}();