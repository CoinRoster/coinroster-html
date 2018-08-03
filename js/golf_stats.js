//function get_data(id, sport)
//  {
//    var call = api({
//        method: "GetPlayerData",
//        args: {
//		sport: sport,
//		player_id: id
//		}
//    });
//    
//    if (call.status === "1") return call;
//    else return null;
//  }

function displayAll(data){

            // Get the modal
            var modal = document.getElementById('stats_modal');

            // Get the button that opens the modal
            //var opener = document.getElementById("link");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks the button, open the modal 
            modal.style.display = "block";

            var news_button = document.getElementById("news_tab");
            var stats_button = document.getElementById("stats_tab");
            var news_tab = document.getElementById("newsfeed");
            var stats_tab = document.getElementById("stats_table");

            news_button.onclick = function() {
               news_tab.style.display = "block";
               stats_tab.style.display = "none";
               setTimeout(function() {
                    var doc = document.getElementById('twitter-widget-0').contentWindow.document;
                    var tweets = doc.getElementsByClassName("timeline-Tweet-text");
                    for (var i = 0; i < tweets.length; i++) {
                        tweets[i].style.fontSize = "100%";
                    }
               }, 100);                   
            };
            stats_button.onclick = function() {
               news_tab.style.display = "none";
               stats_tab.style.display = "block";
            };

            function photo_align(media_query) {
                if (media_query.matches) { // If media query matches
                    document.getElementById('playerphoto').setAttribute('align', 'center');
                }
                else {
                    document.getElementById('playerphoto').setAttribute('align', 'auto');
                }
            }
            var media_query = window.matchMedia("(max-width: 767px)");
            photo_align(media_query); // Call listener function at run time
            media_query.addListener(photo_align); // Attach listener function on state changes


            var header = document.getElementById("player_name");
            header.innerHTML = data.name;
            var header = document.getElementById("mobile_playername");
            header.innerHTML = data.name;

            var player_pic = document.getElementById('headshot');
            player_pic.src = 'https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_default.png,dpr_2.0,f_auto,g_face:center,h_160,q_auto,w_250/headshots_' + data.pga_id + '.png';
            var country_flag = document.getElementById('flag');
            country_flag.src = 'http://a.espncdn.com/golfonline/img/flags/' +data.country_abr+ '.jpg';

            var list_info = document.getElementById("country_list");
            list_info.innerHTML = 'Country: ' + data.country_abr;
            var list_info = document.getElementById("height_list");
            list_info.innerHTML = 'Height: ' + data.height + ' · Weight: ' + data.Weight;
            var list_info = document.getElementById("born_list");
            list_info.innerHTML = 'Born: ' + data.birthString;

            var table_info = document.getElementById("country_table");
            table_info.innerHTML = data.country_abr;
            var table_info = document.getElementById("height_table");
            table_info.innerHTML = data.height;
            var table_info = document.getElementById("weight_table");
            table_info.innerHTML = data.Weight;
            var table_info = document.getElementById("born_table");
            table_info.innerHTML = data.birthString;

            var prev_games = document.getElementById("prev_games");
            prev_games.innerHTML = "Previous Tournaments";                
            var game_log_table = document.getElementById("prev_games_table");
            var games = data.last_five_tournaments;

            var row = game_log_table.insertRow(0);
            if (data.last_five_tournaments.length == 0){
                var End_Date = row.insertCell(0);
                End_Date.innerHTML = "NO STATS AVAILABLE";
            }   

            var season_stats = document.getElementById("season_stats");
            var sst = document.getElementById("season_stats_table").rows[0].cells;
            season_stats.innerHTML = "2018 PGA TOUR Season Stats";
            if (data.stats.length == 0){
                sst[0].innerHTML = "NO STATS AVAILABLE";
            }

            var sst = document.getElementById("season_stats_table").rows[0].cells;
            sst[0].innerHTML = data.stats[0].name;
            sst[1].innerHTML = (data.stats[1].name).replace("Percentage", "%");
            sst[2].innerHTML = (data.stats[2].name).replace("Percentage", "%");
            sst[3].innerHTML = data.stats[3].name;
            var sst = document.getElementById("season_stats_table").rows[2].cells;
            sst[0].innerHTML = (data.stats[4].name).replace("Average", "AVG");
            sst[1].innerHTML = (data.stats[5].name).replace("Average", "AVG");
            sst[2].innerHTML = data.stats[6].name;
            sst[3].innerHTML = (data.stats[7].name).replace("Percentage", "%");

            var sst = document.getElementById("season_stats_table").rows[1].cells;
            sst[0].innerHTML = data.stats[0].value + ' (' + data.stats[0].rank + ')';
            sst[1].innerHTML = data.stats[1].value + ' (' + data.stats[1].rank + ')';
            sst[2].innerHTML = data.stats[2].value + ' (' + data.stats[2].rank + ')';
            sst[3].innerHTML = data.stats[3].value + ' (' + data.stats[3].rank + ')';
            var sst = document.getElementById("season_stats_table").rows[3].cells;
            sst[0].innerHTML = data.stats[4].value + ' (' + data.stats[4].rank + ')';
            sst[1].innerHTML = data.stats[5].value + ' (' + data.stats[5].rank + ')';
            sst[2].innerHTML = data.stats[6].value + ' (' + data.stats[6].rank + ')';
            sst[3].innerHTML = Number.parseFloat(data.stats[7].value).toFixed(2) + '%';

            var game_log_table = document.getElementById("prev_games_table");
            var games = data.last_five_tournaments;

            //INSERT HEADER ROW 
            var row = game_log_table.insertRow(0);
            if(game_log_table.rows.length == 2){

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
                var relToPar = '(' + games[i-1].scr.relToPar + ')';
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
                    r3 = "0";
                }
                else {
                    r3 = games[i-1].scr.rounds[2].rndScr;
                }

                var r4 = games[i-1].scr.rounds;
                if(r4.length < 4){
                    r4 = "0";
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
            }
            }
            /*
            var pgt = document.getElementById("prev_games_table").rows[0].cells;
            pgt[0].innerHTML = "End Date";
            pgt[1].innerHTML = "Tournament";
            pgt[2].innerHTML = "POS";
            pgt[3].innerHTML = "R1";
            pgt[4].innerHTML = "R2";
            pgt[5].innerHTML = "R3";
            pgt[6].innerHTML = "R4";
            pgt[7].innerHTML = "TOT";                   
            */
            //for(var i = 1;i <= 5;i++){


                /*
                var pgt = document.getElementById("prev_games_table").rows[i].cells;
                pgt[0].innerHTML = endDate;
                pgt[1].innerHTML = event;
                pgt[2].innerHTML = pos;
                pgt[3].innerHTML = r1;                  
                pgt[4].innerHTML = r2;
                pgt[5].innerHTML = r3;
                pgt[6].innerHTML = r4;
                pgt[7].innerHTML = total;
                */
            //}


            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            };
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };


}