//var data = {"pos":"3B","last_ten_games":[{"BB":"1","AB":"4","SCORE":"L 3-4","H":"0","HR":"0","K":"1","OPP":"vs SEA","3B":"0","SB":"0","2B":"0","DATE":"08/06","R":"1","AVG":".281","RBI":"0"},{"BB":"0","AB":"4","SCORE":"W 3-1","H":"0","HR":"0","K":"2","OPP":"vs BAL","3B":"0","SB":"0","2B":"0","DATE":"08/04","R":"1","AVG":".285","RBI":"0"},{"BB":"0","AB":"4","SCORE":"W 11-3","H":"1","HR":"0","K":"0","OPP":"vs BAL","3B":"0","SB":"0","2B":"0","DATE":"08/03","R":"1","AVG":".289","RBI":"0"},{"BB":"1","AB":"5","SCORE":"W 17-8","H":"2","HR":"0","K":"1","OPP":"vs BAL","3B":"0","SB":"0","2B":"0","DATE":"08/02","R":"1","AVG":".289","RBI":"0"},{"BB":"0","AB":"4","SCORE":"L 0-6","H":"0","HR":"0","K":"2","OPP":"@ ARI","3B":"0","SB":"0","2B":"0","DATE":"07/31","R":"0","AVG":".287","RBI":"0"},{"BB":"1","AB":"4","SCORE":"W 9-5","H":"1","HR":"0","K":"1","OPP":"@ ARI","3B":"0","SB":"0","2B":"0","DATE":"07/30","R":"1","AVG":".292","RBI":"0"},{"BB":"0","AB":"5","SCORE":"W 7-3","H":"1","HR":"0","K":"2","OPP":"@ HOU","3B":"0","SB":"0","2B":"0","DATE":"07/28","R":"1","AVG":".292","RBI":"1"},{"BB":"0","AB":"5","SCORE":"W 11-2","H":"3","HR":"0","K":"0","OPP":"@ HOU","3B":"0","SB":"0","2B":"0","DATE":"07/27","R":"1","AVG":".294","RBI":"0"},{"BB":"0","AB":"5","SCORE":"L 6-7","H":"3","HR":"0","K":"1","OPP":"vs OAK","3B":"0","SB":"0","2B":"0","DATE":"07/26","R":"1","AVG":".288","RBI":"1"},{"BB":"0","AB":"4","SCORE":"L 5-6","H":"2","HR":"0","K":"0","OPP":"vs OAK","3B":"0","SB":"0","2B":"1","DATE":"07/25","R":"0","AVG":".282","RBI":"1"}],"year_stats":{"BB":"24","AB":"292","STAT_TYPE":"2018 Regular Season","H":"82","GP":"79","HR":"5","K":"68","3B":"1","SB":"0","SLG":".384","2B":"13","CS":"0","R":"29","AVG":".281","OPS":".720","RBI":"33","OBP":".336"},"name":"Adrian Beltre","weight":"220 lbs","id":"3878","career_stats":{"BB":"837","AB":"10923","STAT_TYPE":"Career","H":"3130","GP":"2892","HR":"467","K":"1703","3B":"38","SB":"120","SLG":".479","2B":"626","CS":"42","R":"1503","AVG":".287","OPS":".819","RBI":"1675","OBP":".340"},"birthString":"April 7, 1979 in Santo Domingo, Dominican Republic (Age: 39)","height":"5'11\"","team_abr":"TEX"};
function clearDashboard(){
    document.getElementById("baseball_prev_games_table").innerHTML = 
        `<caption id="baseball_prev_games" class="dashboard_caption"></caption>`;
}

function displayBaseballDashboard(data){
    
    clearDashBoard();
    document.getElementById('stats_model_content_baseball').style.display = "table";
    setupDashboard(0);
    
    // cole needs this to draft player 
    window["player_id"] = data.id;
       
    document.getElementById("baseball_player_name").innerHTML = data.name;
    document.getElementById("baseball_mobile_playername").innerHTML = data.name;
    
    //document.getElementById('baseball_headshot').src = 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32516.png&w=350&h=254';
    document.getElementById('baseball_headshot').src = 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/' + data.id + '.png&w=350&h=254';
    function onImageLoadError() {
        document.getElementById('baseball_headshot').src = '/img/default-baseball.png';
    }
    document.getElementById('baseball_headshot').addEventListener("error", onImageLoadError);     
    
    document.getElementById('baseball_logo').src = 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/mlb/500/' + data.team_abr + '.png&w=110&h=110&transparent=true';
           
    document.getElementById("baseball_team_list").innerHTML = 'Team: ' + data.team_abr;
    document.getElementById("baseball_pos_list").innerHTML = 'Pos: ' + data.pos;
    document.getElementById("baseball_height_list").innerHTML = 'Height: ' + data.height + ' · Weight: ' + data.weight;
    document.getElementById("baseball_born_list").innerHTML = 'Born: ' + data.birthString;

    document.getElementById("baseball_team_table").innerHTML = data.team_abr;
    document.getElementById("baseball_pos_table").innerHTML = data.pos;
    document.getElementById("baseball_height_table").innerHTML = data.height;
    document.getElementById("baseball_weight_table").innerHTML = data.weight;
    document.getElementById("baseball_born_table").innerHTML = data.birthString;
    
    document.getElementById("baseball_season_stats").innerHTML = data.year_stats.STAT_TYPE;

    var sst = document.getElementById("baseball_season_stats_table").rows[0].cells;
    for(i = 0;i <= 10;i++){
       sst[i].className = "stat_category";
    }
    sst[0].innerHTML = "GP";
    sst[1].innerHTML = "AB";
    sst[2].innerHTML = "AVG";
    sst[3].innerHTML = "HR";
    sst[4].innerHTML = "RBI";
    sst[5].innerHTML = "R";
    sst[6].innerHTML = "H";
    sst[7].innerHTML = "SB";
    sst[8].innerHTML = "BB";
    sst[9].innerHTML = "K";
    sst[10].innerHTML = "OPS";
    
    var cells = document.getElementById("baseball_season_stats_table").rows[1].cells;
    for(i = 0;i <= 10;i++){
       cells[i].className = "dashboard_td";
    }
    cells[0].innerHTML = data.year_stats.GP;
    cells[1].innerHTML = data.year_stats.AB;
    cells[2].innerHTML = data.year_stats.AVG;
    cells[3].innerHTML = data.year_stats.HR;
    cells[4].innerHTML = data.year_stats.RBI;
    cells[5].innerHTML = data.year_stats.R;
    cells[6].innerHTML = data.year_stats.H;
    cells[7].innerHTML = data.year_stats.SB;
    cells[8].innerHTML = data.year_stats.BB;
    cells[9].innerHTML = data.year_stats.K;
    cells[10].innerHTML = data.year_stats.OPS;

    document.getElementById("baseball_career_stats").innerHTML = "Career Stats";

    var cst = document.getElementById("baseball_career_stats_table").rows[0].cells;
    for(i = 0;i <= 10;i++){
       cst[i].className = "stat_category";
    }
    cst[0].innerHTML = "GP";
    cst[1].innerHTML = "AB";
    cst[2].innerHTML = "AVG";
    cst[3].innerHTML = "HR";
    cst[4].innerHTML = "RBI";
    cst[5].innerHTML = "R";
    cst[6].innerHTML = "H";
    cst[7].innerHTML = "SB"
    cst[8].innerHTML = "BB";
    cst[9].innerHTML = "K";
    cst[10].innerHTML = "OPS";
    
    var cst = document.getElementById("baseball_career_stats_table").rows[1].cells;
    for(i = 0;i <= 10;i++){
       cst[i].className = "dashboard_td";
    }
    cst[0].innerHTML = data.career_stats.GP;
    cst[1].innerHTML = data.career_stats.AB;
    cst[2].innerHTML = data.career_stats.AVG;
    cst[3].innerHTML = data.career_stats.HR;
    cst[4].innerHTML = data.career_stats.RBI;
    cst[5].innerHTML = data.career_stats.R;
    cst[6].innerHTML = data.career_stats.H;
    cst[7].innerHTML = data.career_stats.SB;
    cst[8].innerHTML = data.career_stats.BB;
    cst[9].innerHTML = data.career_stats.K;
    cst[10].innerHTML = data.career_stats.OPS;

    document.getElementById("baseball_prev_games").innerHTML = "Game Log";
    var game_log_table = document.getElementById("baseball_prev_games_table");
    var games = data.last_ten_games;

    //INSERT HEADER ROW

    var row = game_log_table.insertRow(0);
    //row.className = "stat_category";

    if(game_log_table.rows.length == 1){
        
        var DATE = row.insertCell(0);
        DATE.className = "stat_category";
        var OPP = row.insertCell(1);
        OPP.className = "stat_category";
        var H = row.insertCell(2);
        H.className = "stat_category";
        var AB = row.insertCell(3);
        AB.className = "stat_category";
        var HR = row.insertCell(4);
        HR.className = "stat_category";
        var RBI = row.insertCell(5);
        RBI.className = "stat_category";
        var R = row.insertCell(6);
        R.className = "stat_category";
        var SB = row.insertCell(7);
        SB.className = "stat_category";
        var BB = row.insertCell(8);
        BB.className = "stat_category";
        var K = row.insertCell(9);
        K.className = "stat_category";

        DATE.innerHTML = "Date"
        OPP.innerHTML = "OPP";
        H.innerHTML = "H";
        AB.innerHTML = "AB";
        HR.innerHTML = "HR";
        RBI.innerHTML = "RBI";
        R.innerHTML = "R"; 
        SB.innerHTML = "SB";
        BB.innerHTML = "BB";
        K.innerHTML = "K";                

        //INSERT GAMES
        for(i = 1; i <= games.length; i++){

            // Create an empty <tr> element and add it to the 2nd position of the table (header row is first):
            var row = game_log_table.insertRow(i);
            //row.className = "td";
            var DATE = row.insertCell(0);
            var OPP = row.insertCell(1);
            var H = row.insertCell(2);
            var AB = row.insertCell(3);
            var HR = row.insertCell(4);
            var RBI = row.insertCell(5);
            var R = row.insertCell(6);
            var SB = row.insertCell(7);
            var BB = row.insertCell(8);
            var K = row.insertCell(9);


            var stat_type = [DATE, OPP, H, AB, HR, RBI, R, SB, BB, K];
            for(var j = 0;j < stat_type.length;j++){
                stat_type[j].className = "dashboard_td";
            } 
            // Add some text to the new cells:
            DATE.innerHTML = games[i-1].DATE;
            OPP.innerHTML = games[i-1].OPP + "<br/>" + games[i-1].SCORE;
            H.innerHTML = games[i-1].H;
            AB.innerHTML = games[i-1].AB;
            HR.innerHTML = games[i-1].HR;                  
            RBI.innerHTML = games[i-1].RBI;
            R.innerHTML = games[i-1].R;
            SB.innerHTML = games[i-1].SB;
            BB.innerHTML = games[i-1].BB;
            K.innerHTML = games[i-1].K;
        }
    }
}
  