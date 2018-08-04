function displayBaseballDash(data){

    // Get the modal
    document.getElementById('stats_modal').style.display = "block";

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
            var media = doc.getElementsByClassName("timeline-Tweet-media");
            for (var i = 0; i < tweets.length; i++) {
                tweets[i].style.fontSize = "100%";
                tweets[i].style.lineHeight = "16px";
                media[i].style.display = "none";
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

    window["player_id"] = data.id;
    var header = document.getElementById("player_name").innerHTML = data.name;
    document.getElementById("mobile_playername").innerHTML = data.name;

    document.getElementById('headshot').src = 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/' + data.id + '.png&w=350&h=254';
    document.getElementById('logo').src = 'http://a.espncdn.com/combiner/i?img=/i/teamlogos/mlb/500/' + data.team_abr + '.png&w=110&h=110&transparent=true';

    document.getElementById("team_list").innerHTML = 'Team: ' + data.team_abr;
    document.getElementById("pos_list").innerHTML = 'Pos: ' + data.pos;
    document.getElementById("height_list").innerHTML = 'Height: ' + data.height + ' · Weight: ' + data.weight;
    document.getElementById("born_list").innerHTML = 'Born: ' + data.birthString;

    document.getElementById("team_table").innerHTML = data.team_abr;
    document.getElementById("pos_table").innerHTML = data.pos;
    document.getElementById("height_table").innerHTML = data.height;
    document.getElementById("weight_table").innerHTML = data.weight;
    document.getElementById("born_table").innerHTML = data.birthString;
    
    document.getElementById("season_stats").innerHTML = data.year_stats.STAT_TYPE;

    var sst = document.getElementById("season_stats_table").rows[0].cells;
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
    
    var cells = document.getElementById("season_stats_table").rows[1].cells;
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

    document.getElementById("career_stats").innerHTML = "Career Stats";

    var cst = document.getElementById("career_stats_table").rows[0].cells;
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
    
    var cst = document.getElementById("career_stats_table").rows[1].cells;
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

    document.getElementById("prev_games").innerHTML = "Game Log";

    var game_log_table = document.getElementById("prev_games_table");
    var games = data.last_ten_games;

    //INSERT HEADER ROW

    var row = game_log_table.insertRow(0);
    //row.className = "stat_category";

    if(game_log_table.rows.length == 1){

        var OPP = row.insertCell(0);
        OPP.className = "stat_category";
        var H = row.insertCell(1);
        H.className = "stat_category";
        var AB = row.insertCell(2);
        AB.className = "stat_category";
        var HR = row.insertCell(3);
        HR.className = "stat_category";
        var RBI = row.insertCell(4);
        RBI.className = "stat_category";
        var R = row.insertCell(5);
        R.className = "stat_category";
        var SB = row.insertCell(6);
        SB.className = "stat_category";
        var BB = row.insertCell(7);
        BB.className = "stat_category";
        var K = row.insertCell(8);
        K.className = "stat_category";

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

            var OPP = row.insertCell(0);
            var H = row.insertCell(1);
            var AB = row.insertCell(2);
            var HR = row.insertCell(3);
            var RBI = row.insertCell(4);
            var R = row.insertCell(5);
            var SB = row.insertCell(6);
            var BB = row.insertCell(7);
            var K = row.insertCell(8);


            var stat_type = [OPP, H, AB, HR, RBI, R, SB, BB, K];
            for(var j = 0;j < stat_type.length;j++){
                stat_type[j].className = "dashboard_td";
            } 
            // Add some text to the new cells:
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
        /* 
        var pgt = document.getElementById("prev_games_table").rows[0].cells;
        pgt[0].innerHTML = "Opp";
        pgt[1].innerHTML = "H";
        pgt[2].innerHTML = "AB";
        pgt[3].innerHTML = "HR";
        pgt[4].innerHTML = "RBI";
        pgt[5].innerHTML = "R";
        pgt[6].innerHTML = "SB";
        pgt[7].innerHTML = "BB";                   
        pgt[8].innerHTML = "K";
        for(var i = 1;i <= 10;i++){
            var pgt = document.getElementById("prev_games_table").rows[i].cells;
            pgt[0].innerHTML = data.last_ten_games[i-1].OPP + "<br />" + data.last_ten_games[i-1].SCORE;
            pgt[1].innerHTML = data.last_ten_games[i-1].H;
            pgt[2].innerHTML = data.last_ten_games[i-1].AB;
            pgt[3].innerHTML = data.last_ten_games[i-1].HR;                  
            pgt[4].innerHTML = data.last_ten_games[i-1].RBI;
            pgt[5].innerHTML = data.last_ten_games[i-1].R;
            pgt[6].innerHTML = data.last_ten_games[i-1].SB;
            pgt[7].innerHTML = data.last_ten_games[i-1].BB;
            pgt[8].innerHTML = data.last_ten_games[i-1].K;
        }*/               
    }       

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == document.getElementById("stats_modal")) {
            close_dash();
        }
    };
    
    $('#close').click(function() {
        close_dash();
    });
    
//    document.getElementsByClassName("close")[0].onclick = close();

}
