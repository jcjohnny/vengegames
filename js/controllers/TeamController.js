'use strict';

revApp.controller("revengeCtrl", ["$http","$log", revengeCtrl]);


function revengeCtrl($http, $log) {
    $log.info("I'm inside the controller");
    var self = this;
    self.thisDate = []
    self.revengeGames = []
    self.getRevenge = getRevenge;
    self.getRevenge()
    self.forMongoose = []

    function getRevenge() {
        // search the api by the current date
        var newDate = new Date();
        var currentDate = ( String(newDate.getMonth() + 1) + "/" + String(newDate.getUTCDate()) +"/"+ String(newDate.getUTCFullYear()))
        var currentDateDBFriendly = ( String(newDate.getMonth() + 1) + "-" + String(newDate.getUTCDate()) +"-"+ String(newDate.getUTCFullYear()))
        self.thisDate.push(currentDateDBFriendly)
        console.log(currentDate);
        $http
            .jsonp('http://stats.nba.com/stats/scoreboard/?GameDate='+ currentDate +'&LeagueID=00&DayOffset=0&callback=JSON_CALLBACK')
            .then(function (response) {
                // self.all = response.data.resultSets[0].rowSet;
                // store the necessary data to use as argument in next function
                const collecterOfData = response.data.resultSets[0].rowSet;
                $log.log(collecterOfData);
                // call function to create created nested arrays to sort through
                $log.log("amount of teams playing " +  collecterOfData.length)
                getTeamPlayers(collecterOfData);
            })
                .catch(function (res) {
                $log.error('failure',res);
            });
    }

    // function to get all team ID's and nest them to create one array
    function getTeamPlayers(teamInfo){
        const idArray = [];
        for (var i = 0; i < teamInfo.length; i++) {
            var nestTeamArr = [];
            nestTeamArr.push(teamInfo[i][6]);
            nestTeamArr.push(teamInfo[i][7]);
            idArray.push(nestTeamArr)
        }
        console.log(idArray)
        // time to get hit the api again with current data
        splittingTeams(idArray)
    }

    function splittingTeams(teamArray){
        var twoTeam = []
        var enemyTeam = ""
        var currentTeam = ""
        for (var i = 0; i < teamArray.length; i++) {
            // iterate one more time to give enemy team, and parse through current
            // team of current nested team array
            for( var j = 0; j < teamArray[i].length; j++){
                if (j < 1){
                    enemyTeam = teamArray[i][1]
                    currentTeam = teamArray[i][0]
                } else {
                    enemyTeam = teamArray[i][0]
                    currentTeam = teamArray[i][1]
                }
                twoTeam = [currentTeam, enemyTeam]
                teamComparer(twoTeam)
            }
        }
    }

    function teamComparer(twoTeam){
        // store teamIDs
        var currentTeam = twoTeam[0]
        var compareTeam = twoTeam[1]
        // hit the api. give me that diddly
        $http
            .jsonp('http://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=2015-16&TeamID=' + currentTeam + '&callback=JSON_CALLBACK')
            .then(function (response){
                // put all players of one team in one array of an array, and the opposing team id in the array
                var playersTeam = response.data.resultSets[0].rowSet
                var playersToEnemy = [playersTeam, compareTeam, currentTeam]
                playerParser(playersToEnemy)
            })
            .catch(function (res) {
            $log.error('failure',res);
            })
    }

    function playerParser(playersEnemy){
        var currentTeamPlayers = playersEnemy[0]
        var enemyTeam = playersEnemy[1]
        var currentTeam = playersEnemy[2]
        console.log(currentTeamPlayers);
        // go through each player in the team and start a search
        for (var i = 0; i < currentTeamPlayers.length; i++) {
            var playerVsTeam = [currentTeamPlayers[i], enemyTeam]
            console.log(currentTeam);
            checkForRevenge(playerVsTeam)
        }
    }

    function checkForRevenge(playerVsTeam) {

        var currentPlayerId = playerVsTeam[0][12]
        var enemyTeamId = playerVsTeam[1]
        $http
            .jsonp('http://stats.nba.com/stats/playercareerstats?LeagueID=00&PerMode=PerGame&PlayerID=' + currentPlayerId + '&callback=JSON_CALLBACK')
            .then(function (response) {
                var allPlayersTeams = response.data.resultSets[0].rowSet
                for (var i = 0; i < allPlayersTeams.length; i++) {
                    var collectRevenge = []
                    if (allPlayersTeams[i][3] === enemyTeamId){
                        collectRevenge.push([currentPlayerId, enemyTeamId])
                        console.log("REVENGE")
                        // collectiveRevenge[0][0] because its from just one player and an array of all his current/previous teams
                        if (collectRevenge[0][0] === allPlayersTeams[i][0]){
                            // replace by pushing in new data instead.
                            // time for next function.
                            var enemyTeamName = allPlayersTeams[i][4]
                            console.log(currentPlayerId);
                            console.log(enemyTeamName);
                            self.revengeGames.push([currentPlayerId, enemyTeamId])
                            debugger
                            break
                        }
                    }
                }
            })
            .catch(function (res) {
            $log.error('failure',res);
            })
    }

    function storeData(){

    }

}
