function remakeDashboard(){
    document.getElementById("golf_season_stats_table").innerHTML = 
        `<caption id=\"golf_season_stats\" class=\"dashboard_caption\"></caption>
            <tr>
                <td class=\"stat_category\"></td>
                <td class=\"stat_category\"></td>
                <td class=\"stat_category\"></td>
                <td class=\"stat_category\"></td>
            </tr>
            <tr>   
                <td class="dashboard_td"></td>
                <td class="dashboard_td"></td>
                <td class="dashboard_td"></td>
                <td class="dashboard_td"></td>
            </tr>
            <tr>
                <td class=\"stat_category\"></td>
                <td class=\"stat_category\"></td>
                <td class=\"stat_category\"></td>
                <td class=\"stat_category\"></td>
            </tr>
            <tr>   
                <td class="dashboard_td"></td>
                <td class="dashboard_td"></td>
                <td class="dashboard_td"></td>
                <td class="dashboard_td"></td>
            </tr>`;
    document.getElementById("golf_prev_games_table").innerHTML = `<caption id="golf_prev_games" class="dashboard_caption"></caption>`;
    document.getElementById('golf_logo').style.visibility = "visible";
}
    
function displayGolfDashboard(data){
    
    document.getElementById('stats_model_content_golf').style.display = "table";
    remakeDashboard();
    
    // the 1 is because its the second dashboard sourced on contest.html
    setupDashboard(1);
    
    window["player_id"] = data.pga_id;
    
    document.getElementById("golf_player_name").innerHTML = data.name;
    document.getElementById("golf_mobile_playername").innerHTML = data.name;
    
    //document.getElementById('golf_headshot').src = 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_default.png,dpr_2.0,f_auto,g_face:center,h_160,q_auto,w_250/headshots_30921.png';
    document.getElementById('golf_headshot').src = 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_default.png,dpr_2.0,f_auto,g_face:center,h_160,q_auto,w_250/headshots_' + data.pga_id + '.png';
    document.getElementById('golf_logo').src = 'http://a.espncdn.com/golfonline/img/flags/' +data.country_abr+ '.jpg';
    
    function onImageLoadError() {
        document.getElementById('golf_logo').style.visibility = "hidden";
    }
    document.getElementById('golf_logo').addEventListener("error", onImageLoadError);     
       
    if(data.weight !== "" && data.height !== "")
        document.getElementById("golf_height_list").innerHTML = 'Height: ' + data.height + ' · Weight: ' + data.weight;
    else
        document.getElementById("golf_height_list").innerHTML = "";
    
    if(data.birthString !== "")
        document.getElementById("golf_born_list").innerHTML = 'Born: ' + data.birthString;
    else
        document.getElementById("golf_born_list").innerHTML = "";
    
    document.getElementById("golf_height_table").innerHTML = data.height;
    document.getElementById("golf_weight_table").innerHTML = data.weight;
    document.getElementById("golf_born_table").innerHTML = data.birthString;
    
    document.getElementById("golf_season_stats").innerHTML = "2018 PGA TOUR Season Stats";
    var sst = document.getElementById("golf_season_stats_table").rows[0].cells;    
    
    if (data.stats.length == 0){
       document.getElementById("golf_season_stats_table").innerHTML = 
           `<caption id=\"golf_season_stats\" class=\"dashboard_caption\">2018 PGA TOUR Season Stats</caption>
            <tr><td class="dashboard_td">NO STATS AVAILABLE</td></tr>`;
    }
    else{
        
        var title = document.getElementById("golf_season_stats_table").rows[0].cells;
        var val = document.getElementById("golf_season_stats_table").rows[1].cells;
        for(i = 0; i < 4; i++){
           if(data.stats[i] !== undefined){
                title[i].innerHTML = (data.stats[i].name).replace("Percentage", "%").replace("Average", "AVG");
                if(data.stats[i].rank !== undefined)
                   val[i].innerHTML = data.stats[i].value + ' (' + data.stats[i].rank + ')';
                else
                    val[i].innerHTML = data.stats[0].value;
            }  
        }
        
        var title = document.getElementById("golf_season_stats_table").rows[2].cells;
        var val = document.getElementById("golf_season_stats_table").rows[3].cells;
        var q = 4;
        for(i = 0; i < 4; i++){
           if(data.stats[q] !== undefined){
                title[i].innerHTML = (data.stats[q].name).replace("Percentage", "%").replace("Average", "AVG");
                if(data.stats[q].name === "Cuts Made Percentage")
                    val[i].innerHTML = Number.parseFloat(data.stats[q].value).toFixed(2) + '%';
                else if(data.stats[q].rank !== undefined)
                   val[i].innerHTML = data.stats[q].value + ' (' + data.stats[q].rank + ')';
                else
                    val[i].innerHTML = data.stats[q].value;
            }
            q++;    
        }
    }
    
    document.getElementById("golf_prev_games").innerHTML = "Previous Tournaments";                
    var game_log_table = document.getElementById("golf_prev_games_table");
    var games = data.last_five_tournaments;
    
    // check to see if player has past tournaments
    if (data.last_five_tournaments.length == 0){
        game_log_table.innerHTML = 
            `<caption id="golf_prev_games" class="dashboard_caption">Previous Tournaments</caption>
            <tr><td class="dashboard_td">NO TOURNAMENTS AVAILABLE</td></tr>`;
    }
    else{

        //INSERT HEADER ROW 
        var row = game_log_table.insertRow(0);

        var End_Date = row.insertCell(0);
        var Tournament = row.insertCell(1);
        var POS = row.insertCell(2);
        var R1 = row.insertCell(3);
        var R2 = row.insertCell(4);
        var R3 = row.insertCell(5);
        var R4 = row.insertCell(6);
        var TOT = row.insertCell(7);

        End_Date.className = "stat_category";
        Tournament.className = "stat_category";
        POS.className = "stat_category";
        R1.className = "stat_category";
        R2.className = "stat_category";
        R3.className = "stat_category";
        R4.className = "stat_category";
        TOT.className = "stat_category";

        End_Date.innerHTML = "End Date";
        Tournament.innerHTML = "Tournament";
        POS.innerHTML = "POS";
        R1.innerHTML = "R1";
        R2.innerHTML = "R2";
        R3.innerHTML = "R3"; 
        R4.innerHTML = "R4";
        TOT.innerHTML = "TOT";                

        //INSERT GAMES
        for(i = 1; i <= games.length; i++){

            // Create an empty <tr> element and add it to the 2nd position of the table (header row is first):
            var row = game_log_table.insertRow(i);

            var End_Date = row.insertCell(0);
            var Tournament = row.insertCell(1);
            var POS = row.insertCell(2);
            var R1 = row.insertCell(3);
            var R2 = row.insertCell(4);
            var R3 = row.insertCell(5);
            var R4 = row.insertCell(6);
            var TOT = row.insertCell(7);

            var endDate = games[i-1].endDate;
            var trnName = games[i-1].trn.trnName;
            var finPos = games[i-1].finPos.value;
            var relToPar = games[i-1].scr.relToPar;
            var r1 = games[i-1].scr.rounds;                  
            if(r1.length < 1){
                r1 = "0";
            }
            else {
                r1 = games[i-1].scr.rounds[0].rndScr;
            }

            var r2 = games[i-1].scr.rounds;
            if(r2.length < 2){
                r2 = "0";
            }
            else {
                r2 = games[i-1].scr.rounds[1].rndScr;
            }

            var r3 = games[i-1].scr.rounds;
            if(r3.length < 3){
                r3 = "";
            }
            else {
                r3 = games[i-1].scr.rounds[2].rndScr;
            }

            var r4 = games[i-1].scr.rounds;
            if(r4.length < 4){
                r4 = "";
            }
            else {
                r4 = games[i-1].scr.rounds[3].rndScr;
            }
            // Add some text to the new cells:
            End_Date.innerHTML = endDate;
            Tournament.innerHTML = trnName;
            POS.innerHTML = finPos;
            TOT.innerHTML = relToPar;                  
            R1.innerHTML = r1;
            R2.innerHTML = r2;
            R3.innerHTML = r3;
            R4.innerHTML = r4;

            End_Date.className = "dashboard_td";
            Tournament.className = "dashboard_td";
            POS.className = "dashboard_td";
            R1.className = "dashboard_td";
            R2.className = "dashboard_td";
            R3.className = "dashboard_td";
            R4.className = "dashboard_td";
            TOT.className = "dashboard_td right-align";   
        }
    }
}
