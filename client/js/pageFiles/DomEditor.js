/**
 * Created by niki on 26.03.16.
 */
/**
 * Operate with dom tree.
 */
var DomEditor = function () {

    function getSearchParameters() {
        var prmstr = window.location.search.substr(1);
        return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
    }

    function transformToAssocArray( prmstr ) {
        var params = {};
        var prmarr = prmstr.split("&");
        for ( var i = 0; i < prmarr.length; i++) {
            var tmparr = prmarr[i].split("=");
            params[tmparr[0]] = tmparr[1];
        }
        return params;
    }

    var userData = getSearchParameters();

    if (userData.name == undefined){
        userData.name = 'Guest';
    }
    /*Greet user*/
    $('#name-span').text(userData.name);




    return{

        getUserData : function () {
            return userData;
        }
    }

}();