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
        userData.weapons = [0,1,2,3,4,5];
    }
    /*Greet user*/





    return{
        setName:function(name){
            $('#name-span').text(name);
        },
        /*Weapons must be array*/
        getUserData : function () {
            return userData.data;
        }
    }

}();