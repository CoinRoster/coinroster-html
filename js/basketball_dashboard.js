function clearBasketballDashboard(){
    document.getElementById("basketball_prev_games_table").innerHTML = 
        `<caption id="basketball_prev_games" class="dashboard_caption"></caption>`;
}

function displayBasketballDashboard(data){
    var i;
    clearBasketballDashboard();
    document.getElementById('stats_model_content_basketball').style.display = "table";
    
    // the 2 is because its the third dashboard sourced on contest.html
    setupDashboard(2);
    
    window["player_id"] = data.id;
       
    document.getElementById("basketball_player_name").innerHTML = data.name;
    document.getElementById("basketball_mobile_playername").innerHTML = data.name;
    
    //document.getElementById('basketball_headshot').src = 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32516.png&w=350&h=254';
    document.getElementById('basketball_headshot').src = 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/' + data.id + '.png&w=350&h=254';
    function onImageLoadError() {
        document.getElementById('basketball_headshot').src = '/img/default-basketball.png';
    }
    document.getElementById('basketball_headshot').addEventListener("error", onImageLoadError);     
    
    document.getElementById('basketball_logo').src = 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/' +data.team_abr +'.png&w=110&h=110';
           
    document.getElementById("basketball_team_list").innerHTML = 'Team: ' + data.team_abr;
    document.getElementById("basketball_pos_list").innerHTML = 'Pos: ' + data.pos;
    document.getElementById("basketball_height_list").innerHTML = 'Height: ' + data.height + ' · Weight: ' + data.weight;
    document.getElementById("basketball_born_list").innerHTML = 'Born: ' + data.birthString;

    document.getElementById("basketball_team_table").innerHTML = data.team_abr;
    document.getElementById("basketball_pos_table").innerHTML = data.pos;
    document.getElementById("basketball_height_table").innerHTML = data.height;
    document.getElementById("basketball_weight_table").innerHTML = data.weight;
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
    
    var sst = document.getElementById("basketball_season_stats_table").rows[1].cells;

    for(i = 0;i <= 6;i++){
       sst[i].className = "dashboard_td";
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
        
        var DATE = row.insertCell(0);
        DATE.className = "stat_category";
        var OPP = row.insertCell(1);
        OPP.className = "stat_category";
        var MIN = row.insertCell(2);
        MIN.className = "stat_category";
        var PTS = row.insertCell(3);
        PTS.className = "stat_category";
        var REB = row.insertCell(4);
        REB.className = "stat_category";
        var AST = row.insertCell(5);
        AST.className = "stat_category";
        var STL = row.insertCell(6);
        STL.className = "stat_category";
        var BLK = row.insertCell(7);
        BLK.className = "stat_category";
        var TO = row.insertCell(8);
        TO.className = "stat_category";
        
        DATE.innerHTML = "Date";
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
            var DATE = row.insertCell(0);
            var OPP = row.insertCell(1);
            var MIN = row.insertCell(2);
            var PTS = row.insertCell(3);
            var REB = row.insertCell(4);
            var AST = row.insertCell(5);
            var STL = row.insertCell(6);
            var BLK = row.insertCell(7);
            var TO = row.insertCell(8);

            var stat_type = [DATE, OPP, MIN, PTS, REB, AST, STL, BLK, TO];
            for(var j = 0;j < stat_type.length;j++){
                stat_type[j].className = "dashboard_td";
            } 
            // Add some text to the new cells:
            DATE.innerHTML = games[i-1].DATE;
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
  
