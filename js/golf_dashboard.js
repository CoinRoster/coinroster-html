//var data = {"last_five_tournaments":[{"finPos":{"playOffFlg":"","value":"CUT","finCode":"C"},"scr":{"relToPar":"+6","totalScr":"148","rounds":[{"rndNum":"Round 1","posInField":"T129","rndScr":"76"},{"rndNum":"Round 2","posInField":"T104","rndScr":"72"}]},"endDate":"7/22/18","schwabCupPoints":"","ssFinPos":"999","offMoney":"","fedexEvtPts":"","trn":{"trnName":"The Open Championship","permNum":"100","trnNum":"420","officialFlg":"Y"},"ssFinPosFinCode":"","fedexRnkReg":"1","ssMoney":"","fedexRnkPO":"","schwabCupRank":""},{"finPos":{"playOffFlg":"","value":"3","finCode":""},"scr":{"relToPar":"+3","totalScr":"283","rounds":[{"rndNum":"Round 1","posInField":"T1","rndScr":"69"},{"rndNum":"Round 2","posInField":"1","rndScr":"67"},{"rndNum":"Round 3","posInField":"T1","rndScr":"77"},{"rndNum":"Round 4","posInField":"3","rndScr":"70"}]},"endDate":"6/17/18","schwabCupPoints":"","ssFinPos":"999","offMoney":"$812,927.00","fedexEvtPts":"210","trn":{"trnName":"U.S. Open","permNum":"026","trnNum":"360","officialFlg":"Y"},"ssFinPosFinCode":"","fedexRnkReg":"1","ssMoney":"","fedexRnkPO":"","schwabCupRank":""},{"finPos":{"playOffFlg":"","value":"1","finCode":""},"scr":{"relToPar":"-19","totalScr":"261","rounds":[{"rndNum":"Round 1","posInField":"T13","rndScr":"67"},{"rndNum":"Round 2","posInField":"1","rndScr":"63"},{"rndNum":"Round 3","posInField":"T1","rndScr":"65"},{"rndNum":"Round 4","posInField":"1","rndScr":"66"}]},"endDate":"6/10/18","schwabCupPoints":"","ssFinPos":"999","offMoney":"$1,188,000.00","fedexEvtPts":"500","trn":{"trnName":"FedEx St. Jude Classic","permNum":"025","trnNum":"350","officialFlg":"Y"},"ssFinPosFinCode":"","fedexRnkReg":"2","ssMoney":"","fedexRnkPO":"","schwabCupRank":""},{"finPos":{"playOffFlg":"","value":"T8","finCode":"T"},"scr":{"relToPar":"-11","totalScr":"277","rounds":[{"rndNum":"Round 1","posInField":"T47","rndScr":"72"},{"rndNum":"Round 2","posInField":"T14","rndScr":"66"},{"rndNum":"Round 3","posInField":"T28","rndScr":"72"},{"rndNum":"Round 4","posInField":"T8","rndScr":"67"}]},"endDate":"6/03/18","schwabCupPoints":"","ssFinPos":"999","offMoney":"$240,300.00","fedexEvtPts":"75","trn":{"trnName":"the Memorial Tournament presented by Nationwide","permNum":"023","trnNum":"340","officialFlg":"Y"},"ssFinPosFinCode":"","fedexRnkReg":"8","ssMoney":"","fedexRnkPO":"","schwabCupRank":""},{"finPos":{"playOffFlg":"","value":"T17","finCode":"T"},"scr":{"relToPar":"-10","totalScr":"278","rounds":[{"rndNum":"Round 1","posInField":"T1","rndScr":"66"},{"rndNum":"Round 2","posInField":"T11","rndScr":"71"},{"rndNum":"Round 3","posInField":"3","rndScr":"69"},{"rndNum":"Round 4","posInField":"T17","rndScr":"72"}]},"endDate":"5/13/18","schwabCupPoints":"","ssFinPos":"999","offMoney":"$148,866.66","fedexEvtPts":"52","trn":{"trnName":"THE PLAYERS Championship","permNum":"011","trnNum":"310","officialFlg":"Y"},"ssFinPosFinCode":"","fedexRnkReg":"7","ssMoney":"","fedexRnkPO":"","schwabCupRank":""}],"stats":[{"statID":"101","additionals":[{"title":"Total Distance","value":"23,745"},{"title":"Total Drives","value":"76"}],"name":"Driving Distance","rank":"8","projRank":"","value":"312.4"},{"statID":"102","additionals":[{"title":"Fairways Hit","value":"342"},{"title":"Possible Fairways","value":"593"}],"name":"Driving Accuracy Percentage","rank":"152","projRank":"","value":"57.67%"},{"statID":"103","additionals":[{"title":"Greens Hit","value":"524"},{"title":"# Holes","value":"756"}],"name":"Greens in Regulation Percentage","rank":"33","projRank":"","value":"69.31%"},{"statID":"155","additionals":[{"title":"# of Holes","value":"828"},{"title":"# of Eagles","value":"11"}],"name":"Eagles (Holes per)","rank":"2","projRank":"","value":"75.3"},{"statID":"156","additionals":[{"title":"# of Birdies","value":"211"},{"title":"Total Rounds","value":"46"}],"name":"Birdie Average","rank":"1","projRank":"","value":"4.59"},{"statID":"120","additionals":[{"title":"Total Strokes","value":"3,174"},{"title":"Total Adjustment","value":"- 11.469"}],"name":"Scoring Average","rank":"1","projRank":"","value":"68.751"},{"statID":"186","additionals":[{"title":"Total Points","value":"414.22"},{"title":"Points lost","value":"-264.10"}],"name":"Official World Golf Ranking","rank":"1","projRank":"","value":"9.63"},{"name":"Cuts Made Percentage","value":"92.3076923076923"}],"pga_id":"30925","name":"Dustin Johnson","country_abr":"USA","Weight":"190 lbs","birthString":"June 22, 1984 in Columbia, South Carolina (Age: 34)","height":"6' 4\""};
    
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
        
    }
    
    
function displayGolfDashboard(data){
    
    document.getElementById('stats_model_content_golf').style.display = "table";
    remakeDashboard();
    setupDashboard(1);
    
    // cole needs this to draft player 
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
       
    if(data.weight !== undefined && data.height !== undefined)
        document.getElementById("golf_height_list").innerHTML = 'Height: ' + data.height + ' · Weight: ' + data.weight;
    else
        document.getElementById("golf_height_list").innerHTML = "";
    
    if(data.birthString !== undefined)
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
        
        var sst = document.getElementById("golf_season_stats_table").rows[0].cells;
        sst[0].innerHTML = data.stats[0].name;
        sst[1].innerHTML = (data.stats[1].name).replace("Percentage", "%");
        sst[2].innerHTML = (data.stats[2].name).replace("Percentage", "%");
        sst[3].innerHTML = data.stats[3].name;
        var sst = document.getElementById("golf_season_stats_table").rows[2].cells;
        sst[0].innerHTML = (data.stats[4].name).replace("Average", "AVG");
        sst[1].innerHTML = (data.stats[5].name).replace("Average", "AVG");
        sst[2].innerHTML = data.stats[6].name;
        sst[3].innerHTML = (data.stats[7].name).replace("Percentage", "%");

        var sst = document.getElementById("golf_season_stats_table").rows[1].cells;
        sst[0].innerHTML = data.stats[0].value + ' (' + data.stats[0].rank + ')';
        sst[1].innerHTML = data.stats[1].value + ' (' + data.stats[1].rank + ')';
        sst[2].innerHTML = data.stats[2].value + ' (' + data.stats[2].rank + ')';
        sst[3].innerHTML = data.stats[3].value + ' (' + data.stats[3].rank + ')';
        var sst = document.getElementById("golf_season_stats_table").rows[3].cells;
        sst[0].innerHTML = data.stats[4].value + ' (' + data.stats[4].rank + ')';
        sst[1].innerHTML = data.stats[5].value + ' (' + data.stats[5].rank + ')';
        sst[2].innerHTML = data.stats[6].value + ' (' + data.stats[6].rank + ')';
        sst[3].innerHTML = Number.parseFloat(data.stats[7].value).toFixed(2) + '%';
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
