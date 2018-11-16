function clearHockeyDashboard(){
    document.getElementById("hockey_prev_games_table").innerHTML = 
        `<caption id="hockey_prev_games" class="dashboard_caption"></caption>`;
}

function displayHockeyDashboard(data){
    var i;
    clearHockeyDashboard();
    document.getElementById('stats_model_content_hockey').style.display = "table";
    
    // the 3 is because its the fourth dashboard sourced on contest.html
    setupDashboard(3);
    
    window["player_id"] = data.id;
       
    document.getElementById("hockey_player_name").innerHTML = data.name;
    document.getElementById("hockey_mobile_playername").innerHTML = data.name;
    
    //document.getElementById('hockey_headshot').src = 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32516.png&w=350&h=254';
    document.getElementById('hockey_headshot').src = 'http://a.espncdn.com/combiner/i?img=/i/headshots/nhl/players/full/' + data.id + '.png&w=350&h=254';
    function onImageLoadError() {
        document.getElementById('hockey_headshot').src = '/img/default-basketball.png';
    }
    document.getElementById('hockey_headshot').addEventListener("error", onImageLoadError);     
    
    document.getElementById('hockey_logo').src = 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/nhl/500/' +data.team_abr +'.png&w=110&h=110&transparent=true';
           
    document.getElementById("hockey_team_list").innerHTML = 'Team: ' + data.team_abr;
    document.getElementById("hockey_pos_list").innerHTML = 'Pos: ' + data.pos;
    document.getElementById("hockey_height_list").innerHTML = 'Height: ' + data.height + ' · Weight: ' + data.weight;
    document.getElementById("hockey_born_list").innerHTML = 'Born: ' + data.birthString;

    document.getElementById("hockey_team_table").innerHTML = data.team_abr;
    document.getElementById("hockey_pos_table").innerHTML = data.pos;
    document.getElementById("hockey_height_table").innerHTML = data.height;
    document.getElementById("hockey_weight_table").innerHTML = data.weight;
    document.getElementById("hockey_born_table").innerHTML = data.birthString;
    
    document.getElementById("hockey_season_stats").innerHTML = data.year_stats.STAT_TYPE;

    var sst = document.getElementById("hockey_season_stats_table").rows[0].cells;
    for(i = 0;i <= 6;i++){
       sst[i].className = "stat_category";
    }
    sst[0].innerHTML = "GP";
    sst[1].innerHTML = "G";
    sst[2].innerHTML = "A";
    sst[3].innerHTML = "PTS";
    sst[4].innerHTML = "+/-";
    sst[5].innerHTML = "SOG";  
    sst[6].innerHTML = "TOI/G";  
    
    var sst = document.getElementById("hockey_season_stats_table").rows[1].cells;
    for(i = 0;i <= 6;i++){
       sst[i].className = "dashboard_td";
    }
    sst[0].innerHTML = data.year_stats.GP;
    sst[1].innerHTML = data.year_stats.G;
    sst[2].innerHTML = data.year_stats.A;
    sst[3].innerHTML = data.year_stats.PTS;
    sst[4].innerHTML = data.year_stats["+/-"];
    sst[5].innerHTML = data.year_stats.SOG;
    sst[6].innerHTML = data.year_stats["TOI/G"];

    document.getElementById("hockey_career_stats").innerHTML = "Career Stats";

    var cst = document.getElementById("hockey_career_stats_table").rows[0].cells;
    for(i = 0;i <= 6;i++){
       cst[i].className = "stat_category";
    }
   
    cst[0].innerHTML = "GP";
    cst[1].innerHTML = "G";
    cst[2].innerHTML = "A";
    cst[3].innerHTML = "PTS";
    cst[4].innerHTML = "+/-";
    cst[5].innerHTML = "SOG";  
    cst[6].innerHTML = "TOI/G";  
    
    var cst = document.getElementById("hockey_career_stats_table").rows[1].cells;
    
    for(i = 0; i <= 6; i++){
       cst[i].className = "dashboard_td";
    }
    cst[0].innerHTML = data.career_stats.GP;
    cst[1].innerHTML = data.career_stats.G;
    cst[2].innerHTML = data.career_stats.A;
    cst[3].innerHTML = data.career_stats.PTS;
    cst[4].innerHTML = data.career_stats["+/-"];
    cst[5].innerHTML = data.career_stats.SOG;
    cst[6].innerHTML = data.career_stats["TOI/G"];
    
    document.getElementById("hockey_prev_games").innerHTML = "Game Log";

    var game_log_table = document.getElementById("hockey_prev_games_table");
    var games = data.last_five_games;

    //INSERT HEADER ROW

    var row = game_log_table.insertRow(0);
    //row.className = "stat_category";

    if(game_log_table.rows.length == 1){
        
        var DATE = row.insertCell(0);
        DATE.className = "stat_category";
        var OPP = row.insertCell(1);
        OPP.className = "stat_category";
        var G = row.insertCell(2);
        G.className = "stat_category";
        var A = row.insertCell(3);
        A.className = "stat_category";
        var PTS = row.insertCell(4);
        PTS.className = "stat_category";
        var PLUS = row.insertCell(5);
        PLUS.className = "stat_category";
        var SOG = row.insertCell(6);
        SOG.className = "stat_category";
        var TOI = row.insertCell(7);
        TOI.className = "stat_category";
        
        DATE.innerHTML = "Date";
        OPP.innerHTML = "OPP";
        G.innerHTML = "G";
        A.innerHTML = "A";
        PTS.innerHTML = "PTS";
        PLUS.innerHTML = "+/-";
        SOG.innerHTML = "SOG"; 
        TOI.innerHTML = "TOI/G";               

        //INSERT GAMES
        for(i = 1; i <= games.length; i++){

            // Create an empty <tr> element and add it to the 2nd position of the table (header row is first):
            var row = game_log_table.insertRow(i);
            var DATE = row.insertCell(0);
            var OPP = row.insertCell(1);
            var G = row.insertCell(2);
            var A = row.insertCell(3);
            var PTS = row.insertCell(4);
            var PLUS = row.insertCell(5);
            var SOG = row.insertCell(6);
            var TOI = row.insertCell(7);

            var stat_type = [DATE, OPP, G, A, PTS, PLUS, SOG, TOI];
            for(var j = 0;j < stat_type.length;j++){
                stat_type[j].className = "dashboard_td";
            } 
            // Add some text to the new cells:
            DATE.innerHTML = games[i-1].DATE;
            OPP.innerHTML = games[i-1].OPP + "<br/>" + games[i-1].SCORE;
            G.innerHTML = games[i-1].G;
            A.innerHTML = games[i-1].A;
            PTS.innerHTML = games[i-1].PTS;
            PLUS.innerHTML = games[i-1]["+/-"];                  
            SOG.innerHTML = games[i-1].SOG;
            TOI.innerHTML = games[i-1]["TOI/G"];
        }
    }
}
  

