//var data = {"pos":"3B","last_ten_games":[{"BB":"1","AB":"4","SCORE":"L 3-4","H":"0","HR":"0","K":"1","OPP":"vs SEA","3B":"0","SB":"0","2B":"0","DATE":"08/06","R":"1","AVG":".281","RBI":"0"},{"BB":"0","AB":"4","SCORE":"W 3-1","H":"0","HR":"0","K":"2","OPP":"vs BAL","3B":"0","SB":"0","2B":"0","DATE":"08/04","R":"1","AVG":".285","RBI":"0"},{"BB":"0","AB":"4","SCORE":"W 11-3","H":"1","HR":"0","K":"0","OPP":"vs BAL","3B":"0","SB":"0","2B":"0","DATE":"08/03","R":"1","AVG":".289","RBI":"0"},{"BB":"1","AB":"5","SCORE":"W 17-8","H":"2","HR":"0","K":"1","OPP":"vs BAL","3B":"0","SB":"0","2B":"0","DATE":"08/02","R":"1","AVG":".289","RBI":"0"},{"BB":"0","AB":"4","SCORE":"L 0-6","H":"0","HR":"0","K":"2","OPP":"@ ARI","3B":"0","SB":"0","2B":"0","DATE":"07/31","R":"0","AVG":".287","RBI":"0"},{"BB":"1","AB":"4","SCORE":"W 9-5","H":"1","HR":"0","K":"1","OPP":"@ ARI","3B":"0","SB":"0","2B":"0","DATE":"07/30","R":"1","AVG":".292","RBI":"0"},{"BB":"0","AB":"5","SCORE":"W 7-3","H":"1","HR":"0","K":"2","OPP":"@ HOU","3B":"0","SB":"0","2B":"0","DATE":"07/28","R":"1","AVG":".292","RBI":"1"},{"BB":"0","AB":"5","SCORE":"W 11-2","H":"3","HR":"0","K":"0","OPP":"@ HOU","3B":"0","SB":"0","2B":"0","DATE":"07/27","R":"1","AVG":".294","RBI":"0"},{"BB":"0","AB":"5","SCORE":"L 6-7","H":"3","HR":"0","K":"1","OPP":"vs OAK","3B":"0","SB":"0","2B":"0","DATE":"07/26","R":"1","AVG":".288","RBI":"1"},{"BB":"0","AB":"4","SCORE":"L 5-6","H":"2","HR":"0","K":"0","OPP":"vs OAK","3B":"0","SB":"0","2B":"1","DATE":"07/25","R":"0","AVG":".282","RBI":"1"}],"year_stats":{"BB":"24","AB":"292","STAT_TYPE":"2018 Regular Season","H":"82","GP":"79","HR":"5","K":"68","3B":"1","SB":"0","SLG":".384","2B":"13","CS":"0","R":"29","AVG":".281","OPS":".720","RBI":"33","OBP":".336"},"name":"Adrian Beltre","weight":"220 lbs","id":"3878","career_stats":{"BB":"837","AB":"10923","STAT_TYPE":"Career","H":"3130","GP":"2892","HR":"467","K":"1703","3B":"38","SB":"120","SLG":".479","2B":"626","CS":"42","R":"1503","AVG":".287","OPS":".819","RBI":"1675","OBP":".340"},"birthString":"April 7, 1979 in Santo Domingo, Dominican Republic (Age: 39)","height":"5'11\"","team_abr":"TEX"};

function displayBasketballDashboard(data){
    
    document.getElementById('stats_model_content_basketball').style.display = "table";
    setupDashboard(0);
    
    // cole needs this to draft player 
    window["player_id"] = data.player_id;
       
    document.getElementById("basketball_player_name").innerHTML = data.name;
    document.getElementById("basketball_mobile_playername").innerHTML = data.name;
    
    //document.getElementById('basketball_headshot').src = 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32516.png&w=350&h=254';
    document.getElementById('basketball_headshot').src = 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/' + data.player_id + '.png&w=350&h=254';
    function onImageLoadError() {
        document.getElementById('basketball_headshot').src = '/img/default-basketball.png';
    }
    document.getElementById('basketball_headshot').addEventListener("error", onImageLoadError);     
    
    document.getElementById('basketball_logo').src = 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/' +data.team +'.png&w=110&h=110&transparent=true';
           
    document.getElementById("basketball_team_list").innerHTML = 'Team: ' + data.team;
    document.getElementById("basketball_pos_list").innerHTML = 'Pos: ' + data.pos;
    document.getElementById("basketball_height_list").innerHTML = 'Height: ' + data.height + ' · Weight: ' + data.Weight;
    document.getElementById("basketball_born_list").innerHTML = 'Born: ' + data.birthString;

    document.getElementById("basketball_team_table").innerHTML = data.team;
    document.getElementById("basketball_pos_table").innerHTML = data.pos;
    document.getElementById("basketball_height_table").innerHTML = data.height;
    document.getElementById("basketball_weight_table").innerHTML = data.Weight;
    document.getElementById("basketball_born_table").innerHTML = data.birthString;
    
    document.getElementById("basketball_season_stats").innerHTML = data.year_stats.STAT_TYPE;

    var sst = document.getElementById("basketball_season_stats_table").rows[0].cells;
    for(i = 0;i <= 6;i++){
       sst[i].className = "stat_category";
    }
    sst[0].innerHTML = "MIN";
    sst[1].innerHTML = "PTS";
    sst[2].innerHTML = "REB";
    sst[3].innerHTML = "AST";
    sst[4].innerHTML = "STL";
    sst[5].innerHTML = "BLK";
    sst[6].innerHTML = "TO";    
    var cells = document.getElementById("basketball_season_stats_table").rows[1].cells;
    for(i = 0;i <= 6;i++){
       cells[i].className = "dashboard_td";
    }
    sst[0].innerHTML = data.year_stats.MPG;
    sst[1].innerHTML = data.year_stats.PPG;
    sst[2].innerHTML = data.year_stats.RPG;
    sst[3].innerHTML = data.year_stats.APG;
    sst[4].innerHTML = data.year_stats.STLPG;
    sst[5].innerHTML = data.year_stats.BLKPG;
    sst[6].innerHTML = data.year_stats.TOPG;

    document.getElementById("basketball_career_stats").innerHTML = "Career Stats";

    var cst = document.getElementById("basketball_career_stats_table").rows[0].cells;
    for(i = 0;i <= 6;i++){
       cst[i].className = "stat_category";
    }
    cst[0].innerHTML = "MIN";
    cst[1].innerHTML = "PTS";
    cst[2].innerHTML = "REB";
    cst[3].innerHTML = "AST";
    cst[4].innerHTML = "STL";
    cst[5].innerHTML = "BLK";
    cst[6].innerHTML = "TO";    
    
    var cst = document.getElementById("basketball_career_stats_table").rows[1].cells;
    for(i = 0;i <= 6;i++){
       cst[i].className = "dashboard_td";
    }
    cst[0].innerHTML = data.career_stats.MPG;
    cst[1].innerHTML = data.career_stats.PPG;
    cst[2].innerHTML = data.career_stats.RPG;
    cst[3].innerHTML = data.career_stats.APG;
    cst[4].innerHTML = data.career_stats.STLPG;
    cst[5].innerHTML = data.career_stats.BLKPG;
    cst[6].innerHTML = data.career_stats.TOPG;

    document.getElementById("basketball_prev_games").innerHTML = "Game Log";

    var game_log_table = document.getElementById("basketball_prev_games_table");
    var games = data.last_five_games;

    //INSERT HEADER ROW

    var row = game_log_table.insertRow(0);
    //row.className = "stat_category";

    if(game_log_table.rows.length == 1){
        
        var OPP = row.insertCell(0);
        OPP.className = "stat_category";
        var MIN = row.insertCell(1);
        MIN.className = "stat_category";
        var PTS = row.insertCell(2);
        PTS.className = "stat_category";
        var REB = row.insertCell(3);
        REB.className = "stat_category";
        var AST = row.insertCell(4);
        AST.className = "stat_category";
        var STL = row.insertCell(5);
        STL.className = "stat_category";
        var BLK = row.insertCell(6);
        BLK.className = "stat_category";
        var TO = row.insertCell(7);
        TO.className = "stat_category";

        OPP.innerHTML = "OPP";
        MIN.innerHTML = "MIN";
        PTS.innerHTML = "PTS";
        REB.innerHTML = "REB";
        AST.innerHTML = "AST";
        STL.innerHTML = "STL";
        BLK.innerHTML = "BLK"; 
        TO.innerHTML = "TO";               

        //INSERT GAMES
        for(i = 1; i <= games.length; i++){

            // Create an empty <tr> element and add it to the 2nd position of the table (header row is first):
            var row = game_log_table.insertRow(i);
            //row.className = "td";
            var OPP = row.insertCell(0);
            var MIN = row.insertCell(1);
            var PTS = row.insertCell(2);
            var REB = row.insertCell(3);
            var AST = row.insertCell(4);
            var STL = row.insertCell(5);
            var BLK = row.insertCell(6);
            var TO = row.insertCell(7);

            var stat_type = [OPP, MIN, PTS, REB, AST, STL, BLK, TO];
            for(var j = 0;j < stat_type.length;j++){
                stat_type[j].className = "dashboard_td";
            } 
            // Add some text to the new cells:
            OPP.innerHTML = games[i-1].OPP + "<br/>" + games[i-1].SCORE;
            MIN.innerHTML = games[i-1].MIN;
            PTS.innerHTML = games[i-1].PTS;
            REB.innerHTML = games[i-1].REB;
            AST.innerHTML = games[i-1].AST;                  
            STL.innerHTML = games[i-1].STL;
            BLK.innerHTML = games[i-1].BLK;
            TO.innerHTML = games[i-1].TO;
        }
    }
}
  
