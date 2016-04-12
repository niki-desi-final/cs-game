/**
 * Created by niki on 25.03.16.
 */
var LocalMemoryStorage = function () {

    var otherPlayers = {};

    return{
        setOtherPlayers:function (players) {
            otherPlayers = players;
        },
        getOtherPlayers:function () {
            return otherPlayers;
        },
        addNewPlayer:function (player) {
            otherPlayers[player.id] = player;
        },
        deletePlayer:function (playerId) {
            //delete otherPlayers[playerId];
        }
    }

}();