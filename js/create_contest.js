/* Contest & Sport Selectors */
var contest_type_selector = id("contest_type_selector");
var roster_sport_selector = id("roster_sport_selector");
var roster_multistat_overall = id("roster_multistat_overall");
var roster_settlement_type = id("roster_settlement_type");
var prop_sport_selector = id("prop_sport_selector");
var prop_basketball_type_selector = id("prop_basketball_type");
var prop_hockey_type_selector = id("prop_hockey_type");
var prop_golf_type_selector = id("prop_golf_type");
var prop_baseball_type_selector = id("prop_baseball_type");
var prop_golf_match_multistat_overall = id("prop_golf_multistat_overall");
var prop_golf_over_multistat_overall = id("prop_golf_multistat_over_overall");
var prop_bitcoin_type_selector = id("prop_bitcoin_type");

var checkboxes = $("*[class$='_checkbox']");
var inputs = $("*[class$='checkbox_input']");
var inputs_labels = $("*[class$='dynamic_checkbox_label']");

var available_sports = get_available_sports();

// Link scoring checkboxes and input fields
 $.each(checkboxes, function(index, data){
  $(data).on('change', function(){
    if ($(this)[0].checked) {
      inputs[index].disabled = false;
      inputs_labels[index].classList.remove("dimmed");
    } else {
      inputs[index].value = "";
      inputs[index].disabled = true;
      inputs_labels[index].classList.add("dimmed");
    }  
  })
 });

 // Generate checkboxes for available games
 function generate_game_checkboxes(games, div)
  {
    div.innerHTML = "";
    
    games.forEach((game) => {
      var label = document.createElement("label");
      var input = document.createElement("input");
      var title_div = document.createElement("span");

      input.type = 'checkbox';
      input.value = game.gameID;
      input.checked = true;
      
      title_div.innerHTML = game.name + " - " + new Date(game.date_milli).toLocaleTimeString();
      title_div.classList.add("game_checkbox_title");
      
      label.appendChild(input);
      label.appendChild(title_div);

      div.appendChild(label);
    });
  };

// Collect data from game checkboxes
function populate_gameIDs(games, gameID)
  {
    for (var i=0; i<games.length; i++) {
      var checked = games[i].childNodes[0].checked;

      if (checked) {
        gameID.push(games[i].childNodes[0].value);
      }
    }
  }

function toggle_over_under_odds(sport){
    // fixed odds
    if(id(sport + "_over_fixed_odds").checked){
        id("prop_" + sport + "_over_under_odds").classList.remove("hidden");
        o_u = id("prop_" + sport + "_over_under_value").value;
        id(sport + "_over_odds_label").innerHTML = "Over " + o_u;
        id(sport + "_under_odds_label").innerHTML = "Under " + o_u;
    }
    else{
        id("prop_" + sport + "_over_under_odds").classList.add("hidden");
    }
}

function toggle_make_cut_odds(sport){
    // fixed odds
    if(id(sport + "_make_cut_fixed_odds").checked){
        id("prop_" + sport + "_make_cut_odds").classList.remove("hidden");
    }
    else{
        id("prop_" + sport + "_make_cut_odds").classList.add("hidden");
    }
}


function toggle_match_odds(sport){
    // fixed odds
    var selected = id(sport + "_match_selected_players_list").getElementsByTagName("li");
    if(id(sport + "_match_fixed_odds").checked){
        id(sport + "_match_risk_div").classList.remove("hidden");
        for(i = 0; i < selected.length; i++){
            li = selected[i];
            player_id = li.id;
            li.innerHTML += `<input type="number" style="font-family:FontAwesome, gotham_medium; width: 50px !important; float:right; height: 5px;" placeholder="Odds" class="input_style" id="` + player_id + `_odds" value="">`
        }
    }
    else{
        id(sport + "_match_risk_div").classList.add("hidden");
        for(i = 0; i < selected.length; i++){
            li = selected[i];
            li.removeChild(li.getElementsByTagName("input")[0]);
        }
    }
}

 var reset_elements = function()
  {
    hide(document.getElementsByClassName("roster_basketball_scoring")[0]);
    hide(document.getElementsByClassName("roster_hockey_scoring")[0]);  
    hide(document.getElementsByClassName("roster_golf_scoring")[0]);
    hide(document.getElementsByClassName("roster_baseball_scoring")[0]);
    hide(document.getElementsByClassName("prop_basketball_match_play")[0]);
    hide(document.getElementsByClassName("prop_basketball_over_under")[0]);
    hide(document.getElementsByClassName("prop_hockey_match_play")[0]);
    hide(document.getElementsByClassName("prop_hockey_over_under")[0]);
    hide(document.getElementsByClassName("prop_golf_make_the_cut")[0]);
    hide(document.getElementsByClassName("prop_golf_over_under")[0]);
    hide(document.getElementsByClassName("prop_golf_match_play")[0]);
    hide(document.getElementsByClassName("prop_golf_number_of_shots")[0]);
    hide(document.getElementsByClassName("prop_golf_stats_multistat")[0]);
    hide(document.getElementsByClassName("prop_baseball_match_play")[0]);
    hide(document.getElementsByClassName("prop_baseball_over_under")[0]);
    hide(document.getElementsByClassName("prop_baseball_over_under")[0]);
    hide(document.getElementsByClassName("prop_basketball_title")[0]);
    hide(document.getElementsByClassName("prop_hockey_title")[0]);  
    hide(document.getElementsByClassName("prop_golf_title")[0]);
    hide(document.getElementsByClassName("prop_baseball_title")[0]);
    hide(document.getElementsByClassName("roster_basketball_title")[0]);
    hide(document.getElementsByClassName("roster_hockey_title")[0]);  
    hide(document.getElementsByClassName("roster_golf_title")[0]);
    hide(document.getElementsByClassName("roster_baseball_title")[0]);
  };

contest_type_selector.onchange = function()
  {
    var roster_fields = document.getElementsByClassName("roster_fields");
    var prop_fields = document.getElementsByClassName("prop_fields");
    var misc_fields = document.getElementsByClassName("misc_fields");

    reset_elements();
    document.getElementById("roster_sport_selector").selectedIndex = "0";
    document.getElementById("prop_sport_selector").selectedIndex = "0";
    
    function populate_sports()
    {
      var basketball = available_sports.BASKETBALL;
      var golf = available_sports.GOLF_4;
      var baseball = available_sports.BASEBALL;
      var hockey = available_sports.HOCKEY;
      var bitcoin = available_sports.BITCOIN;

      roster_sport_selector.innerHTML = "<option value=\"\" selected disabled hidden>Select</option>";
      prop_sport_selector.innerHTML = "<option value=\"\" selected disabled hidden>Select</option>";

      // Cant have two .add() inside of one statement, only second one is called...?
      if (basketball) {
        var option = document.createElement("option");
        option.text = "Basketball";
        option.value = "Basketball";
        roster_sport_selector.add(option);
      } 
      
      if (basketball) {
        var option = document.createElement("option");
        option.text = "Basketball";
        option.value = "Basketball";
        prop_sport_selector.add(option);
        } 
        
      if (golf) {
        var option = document.createElement("option");
        option.text = "Golf";
        option.value = "Golf";
        roster_sport_selector.add(option);
        }

      if (golf) {
        var option = document.createElement("option");
        option.text = "Golf";
        option.value = "Golf";
        prop_sport_selector.add(option);
        }

      if (baseball) {
        var option = document.createElement("option");
        option.text = "Baseball";
        option.value = "Baseball";
        roster_sport_selector.add(option);
        }

      if (baseball) {
        var option = document.createElement("option");
        option.text = "Baseball";
        option.value = "Baseball";
        prop_sport_selector.add(option);
        }
    
      if (hockey) {
        var option = document.createElement("option");
        option.text = "Hockey";
        option.value = "Hockey";
        roster_sport_selector.add(option);
      } 
      
      if (hockey) {
        var option = document.createElement("option");
        option.text = "Hockey";
        option.value = "Hockey";
        prop_sport_selector.add(option);
        } 
      if (bitcoin) {
        var option = document.createElement("option");
        option.text = "Bitcoin";
        option.value = "Bitcoin";
        prop_sport_selector.add(option);
        } 
    }

    switch (selectorHTML(contest_type_selector))
      {
        case "Roster":
          show(roster_fields[0]);
          hide(prop_fields[0]);
          hide(misc_fields[0]);
          populate_sports();
          break;
        case "Prop":
          show(prop_fields[0]);
          hide(roster_fields[0]);
          hide(misc_fields[0]);
          populate_sports();
          break;
        case "Misc":
          show(misc_fields[0]);
          hide(roster_fields[0]);
          hide(prop_fields[0]);
          break;
      }
  };

roster_sport_selector.onchange = function()
 {
  var basketball_scoring = document.getElementsByClassName("roster_basketball_scoring");
  var golf_scoring = document.getElementsByClassName("roster_golf_scoring");
  var baseball_scoring = document.getElementsByClassName("roster_baseball_scoring");
  var hockey_scoring = document.getElementsByClassName("roster_hockey_scoring");
    
  var roster_basketball_games = document.getElementById("roster_basketball_games");
  var roster_baseball_games = document.getElementById("roster_baseball_games");
  var roster_hockey_games = document.getElementById("roster_hockey_games");
    
  var basketball_title = document.getElementById("roster_basketball_title");
  var golf_title = document.getElementById("roster_golf_title");
  var baseball_title = document.getElementById("roster_baseball_title");
  var hockey_title = document.getElementById("roster_hockey_title");

  reset_elements();

  if (available_sports.BASKETBALL) {
    generate_game_checkboxes(available_sports.basketball_games, roster_basketball_games);
  }
    
  if (available_sports.HOCKEY) {
    generate_game_checkboxes(available_sports.hockey_games, roster_hockey_games);
  }

  if (available_sports.BASEBALL) {
    generate_game_checkboxes(available_sports.baseball_games, roster_baseball_games);
  }

  // Set titles
  if (available_sports.BASKETBALL) {
    var title = available_sports.basketball_contest;
    basketball_title.innerHTML = title;
  } 
  
  if (available_sports.HOCKEY) {
    var title = available_sports.hockey_contest;
    hockey_title.innerHTML = title;
  }
    
  if (available_sports.GOLF_4) {
    var title = available_sports.golf_contest;
    golf_title.innerHTML = title;
  }
  
  if (available_sports.BASEBALL) {
    var title = available_sports.baseball_contest;
    baseball_title.innerHTML = title;
  }

  switch (selectorHTML(roster_sport_selector))
    {
      case "Basketball":
        show(basketball_title);
        show(basketball_scoring[0]);
        show(roster_basketball_games);
        hide(golf_title);
        hide(baseball_title);
        hide(golf_scoring[0]);
        hide(baseball_scoring[0]);
        hide(roster_baseball_games);
        hide(hockey_title);
        hide(hockey_scoring[0]);
        hide(roster_hockey_games);
        break;
      case "Hockey":
        show(hockey_title);
        show(hockey_scoring[0]);
        show(roster_hockey_games);
        hide(basketball_title);
        hide(basketball_scoring[0]);
        hide(roster_basketball_games);
        hide(golf_title);
        hide(baseball_title);
        hide(golf_scoring[0]);
        hide(baseball_scoring[0]);
        hide(roster_baseball_games);
        break;
      case "Golf":
        show(golf_title);
        show(golf_scoring[0]);
        hide(basketball_title);
        hide(baseball_title);
        hide(basketball_scoring[0]);
        hide(baseball_scoring[0]);
        hide(roster_baseball_games);
        hide(roster_basketball_games);
        hide(hockey_title);
        hide(hockey_scoring[0]);
        hide(roster_hockey_games);
        break;
      case "Baseball":
        show(baseball_title);
        show(baseball_scoring[0]);
        show(roster_baseball_games);
        hide(golf_title);
        hide(basketball_title);
        hide(basketball_scoring[0]);
        hide(golf_scoring[0]);
        hide(roster_basketball_games);
        hide(hockey_title);
        hide(hockey_scoring[0]);
        hide(roster_hockey_games);
        break;
    }
 };

roster_multistat_overall.onchange = function()
  {
    var roster_golf_multistat = document.getElementsByClassName("roster_golf_multistat");

    switch (selectorHTML(roster_multistat_overall))
      {
        case "Multi-stat":
          show(roster_golf_multistat[0]);
          break;
        case "Score to Par":
          hide(roster_golf_multistat[0]);
          break;
      }
  };

roster_settlement_type.onchange = function()
 {
  var roster_jackpot = document.getElementsByClassName("roster_settlement_jackpot");
  var roster_double_up = document.getElementsByClassName("roster_settlement_double_up");

  switch (selectorHTML(roster_settlement_type))
    {
      case "Jackpot":
        show(roster_jackpot[0]);
        hide(roster_double_up[0]);
        break;
      case "Double-Up":
        show(roster_double_up[0]);
        hide(roster_jackpot[0]);
        break;
      case "Heads-Up":
        hide(roster_jackpot[0]);
        hide(roster_double_up[0]);
        break;
    }
 };

prop_sport_selector.onchange = function()
 {
  var prop_basketball_type = document.getElementsByClassName("prop_basketball_type");
  var prop_hockey_type = document.getElementsByClassName("prop_hockey_type");  
  var prop_golf_type = document.getElementsByClassName("prop_golf_type");
  var prop_baseball_type = document.getElementsByClassName("prop_baseball_type");
  var prop_golf_type_selector = document.getElementById("prop_golf_type");
  var prop_bitcoin_type = document.getElementsByClassName("prop_bitcoin_type");

  available_sports = get_available_sports();

  $('#prop_golf_type option[value="Make the Cut"]').remove();
  
  reset_elements();
  document.getElementById("prop_basketball_type").selectedIndex = "0";
  document.getElementById("prop_hockey_type").selectedIndex = "0";
  document.getElementById("prop_golf_type").selectedIndex = "0";
  document.getElementById("prop_baseball_type").selectedIndex = "0";
  document.getElementById("prop_bitcoin_type").selectedIndex = "0";
   
if(available_sports.GOLF_1) {   
    var option = document.createElement("option");
    option.text = "Make the Cut";
    option.value = "Make the Cut";
    prop_golf_type_selector.add(option);
  }

  var basketball_title = document.getElementById("prop_basketball_title");
  var hockey_title = document.getElementById("prop_hockey_title");  
  var golf_title = document.getElementById("prop_golf_title");
  var baseball_title = document.getElementById("prop_baseball_title");
  var bitcoin_title = document.getElementById("prop_bitcoin_title");

  // Set titles
  if (available_sports.BASKETBALL) {
    var title = available_sports.basketball_contest;
    basketball_title.innerHTML = title;
  } 

  if (available_sports.HOCKEY) {
    var title = available_sports.hockey_contest;
    hockey_title.innerHTML = title;
  } 
  
  if (available_sports.GOLF_4) {
    var title = available_sports.golf_contest;
    golf_title.innerHTML = title;
  }
  
  if (available_sports.BASEBALL) {
    var title = available_sports.baseball_contest;
    baseball_title.innerHTML = title;
  }
  if (available_sports.BITCOIN) {
    var title = available_sports.bitcoin_contest;
    bitcoin_title.innerHTML = title;
  }

 switch (selectorHTML(prop_sport_selector))
  {
    case "Bitcoin":
      show(bitcoin_title);
      show(prop_bitcoin_type[0]);
      hide(prop_golf_type[0]);
      hide(golf_title);
      hide(baseball_title);
      hide(prop_baseball_type[0]);
      hide(hockey_title);
      hide(prop_hockey_type[0]);
      hide(basketball_title);
      hide(prop_basketball_type[0]);
      break;
    case "Basketball":
      show(basketball_title);
      show(prop_basketball_type[0]);
      hide(prop_golf_type[0]);
      hide(golf_title);
      hide(baseball_title);
      hide(prop_baseball_type[0]);
      hide(hockey_title);
      hide(prop_hockey_type[0]);
      hide(bitcoin_title);
      hide(prop_bitcoin_type[0]);
      break;
    case "Hockey":
      show(hockey_title);
      show(prop_hockey_type[0]);
      hide(prop_golf_type[0]);
      hide(golf_title);
      hide(baseball_title);
      hide(prop_baseball_type[0]);
      hide(basketball_title);
      hide(prop_basketball_type[0]);
      hide(bitcoin_title);
      hide(prop_bitcoin_type[0]);
      break;
    case "Golf":
      show(golf_title);
      show(prop_golf_type[0]);
      hide(basketball_title);
      hide(baseball_title);
      hide(prop_basketball_type[0]);
      hide(prop_baseball_type[0]);
      hide(hockey_title);
      hide(prop_hockey_type[0]);
      hide(bitcoin_title);
      hide(prop_bitcoin_type[0]);
      break;
    case "Baseball":
      show(baseball_title)
      show(prop_baseball_type[0]);
      hide(golf_title);
      hide(basketball_title);
      hide(prop_basketball_type[0]);
      hide(prop_golf_type[0]);
      hide(hockey_title);
      hide(prop_hockey_type[0]);
      hide(bitcoin_title);
      hide(prop_bitcoin_type[0]);
      break;
  }
 };

// BASKETBALL PROP
prop_basketball_type_selector.onchange = function()
 {
   var prop_basketball_match_play = document.getElementsByClassName("prop_basketball_match_play");
   var prop_basketball_over_under = document.getElementsByClassName("prop_basketball_over_under");
   var players = get_all_players("BASKETBALL");
   var selected_players = [];

   function add_player(player) 
    {
        selected_players.push(player);
        populate_match_play_players();
    }

    function remove_player(player)
     {
        for (i = 0;i < selected_players.length; i++) {
          selected_players = selected_players.filter((el) =>  el.player_id !== player.player_id);
        }  
        populate_match_play_players();
     }

    function populate_match_play_players()
      {
        var players_to_populate = players;
        var player_select = document.getElementById("basketball_match_player_list");
        var selected_players_list = document.getElementById("basketball_match_selected_players_list");
        player_select.innerHTML = "";
        selected_players_list.innerHTML = "";
        
        fixed_odds = id("basketball_match_fixed_odds").checked;

        for (i = 0;i < selected_players.length; i++) {
          players_to_populate = players_to_populate.filter(player => player.player_id !== selected_players[i].player_id);
        }      

        players_to_populate.forEach((player) => {
          var li = document.createElement("li");
          li.innerHTML = player.name;
          li.value = player.player_id;
          li.onclick = function() {
            add_player(player);
          }
          player_select.appendChild(li);
        });

        selected_players.forEach((player) => {
          var li = document.createElement("li");
          li.innerHTML = fixed_odds ? "<span class='pointer'>" + player.name + `</span><input type="number" style="font-family:FontAwesome, gotham_medium; width: 50px !important; float:right; height: 5px;" placeholder="Odds" class="input_style" id="` + player.player_id + `_odds" value="">` : "<span class='pointer'>" + player.name + "</span>";
          li.id = player.player_id;
          selected_players_list.appendChild(li);
          li.getElementsByTagName("span")[0].onclick = function() {
            remove_player(player);
          }
          
        });
      }

    function populate_over_under_players()
      {
        var player_select = document.getElementById("prop_basketball_over_under_player");

        players.forEach((player) => {
          var option = document.createElement("option");
          option.text = player.name;
          option.value = player.player_id;
          player_select.add(option);
        });
      }

   switch (selectorHTML(prop_basketball_type_selector))
    {
      case "Match Play":
        show(prop_basketball_match_play[0]);
        hide(prop_basketball_over_under[0]);
        populate_match_play_players();
        break;
      case "Over/Under":
        show(prop_basketball_over_under[0]);
        hide(prop_basketball_match_play[0]);
        populate_over_under_players();
        break;
    }
 };


// HOCKEY PROP
prop_hockey_type_selector.onchange = function()
 {
   var prop_hockey_match_play = document.getElementsByClassName("prop_hockey_match_play");
   var prop_hockey_over_under = document.getElementsByClassName("prop_hockey_over_under");
   var players = get_all_players("HOCKEY");
   var selected_players = [];

   function add_player(player) 
    {
        selected_players.push(player);
        populate_match_play_players();
    }

    function remove_player(player)
     {
        for (i = 0;i < selected_players.length; i++) {
          selected_players = selected_players.filter((el) =>  el.player_id !== player.player_id);
        }  
        populate_match_play_players();
     }

    function populate_match_play_players()
      {
        var players_to_populate = players;
        var player_select = document.getElementById("hockey_match_player_list");
        var selected_players_list = document.getElementById("hockey_match_selected_players_list");
        player_select.innerHTML = "";
        selected_players_list.innerHTML = "";
        
        fixed_odds = id("hockey_match_fixed_odds").checked;

        for (i = 0;i < selected_players.length; i++) {
          players_to_populate = players_to_populate.filter(player => player.player_id !== selected_players[i].player_id);
        }      

        players_to_populate.forEach((player) => {
          var li = document.createElement("li");
          li.innerHTML = player.name;
          li.value = player.player_id;
          li.onclick = function() {
            add_player(player);
          }
          player_select.appendChild(li);
        });

        selected_players.forEach((player) => {
          var li = document.createElement("li");
          li.innerHTML = fixed_odds ? "<span class='pointer'>" + player.name + `</span><input type="number" style="font-family:FontAwesome, gotham_medium; width: 50px !important; float:right; height: 5px;" placeholder="Odds" class="input_style" id="` + player.player_id + `_odds" value="">` : "<span class='pointer'>" + player.name + "</span>";
          li.id = player.player_id;
          selected_players_list.appendChild(li);
          li.getElementsByTagName("span")[0].onclick = function() {
            remove_player(player);
          }
          
        });
      }

    function populate_over_under_players()
      {
        var player_select = document.getElementById("prop_hockey_over_under_player");

        players.forEach((player) => {
          var option = document.createElement("option");
          option.text = player.name;
          option.value = player.player_id;
          player_select.add(option);
        });
      }

   switch (selectorHTML(prop_hockey_type_selector))
    {
      case "Match Play":
        show(prop_hockey_match_play[0]);
        hide(prop_hockey_over_under[0]);
        populate_match_play_players();
        break;
      case "Over/Under":
        show(prop_hockey_over_under[0]);
        hide(prop_hockey_match_play[0]);
        populate_over_under_players();
        break;
    }
 };


// GOLF PROP
prop_golf_type_selector.onchange = function()
 {
   var prop_golf_make_the_cut = document.getElementsByClassName("prop_golf_make_the_cut");
   var prop_golf_over_under = document.getElementsByClassName("prop_golf_over_under");
   var prop_golf_match_play = document.getElementsByClassName("prop_golf_match_play");
   var prop_golf_number_of_shots = document.getElementsByClassName("prop_golf_number_of_shots");

   var players = get_all_players("GOLF");
   var selected_players = [];
   var make_the_cut_player = document.getElementById("prop_golf_make_the_cut_player");
   var over_under_player = document.getElementById("prop_golf_over_under_player");
   var prop_golf_number_of_shots_player = document.getElementById("prop_golf_number_of_shots_player");
   var match_players = document.getElementById("golf_match_player_list");
   var match_selected_players = document.getElementById("golf_match_selected_players_list");

   function add_player(player)
    {
      selected_players.push(player);
      populate_golf_match_players();
    }

    function remove_player(player)
     {
        for (i = 0;i < selected_players.length; i++) {
          selected_players = selected_players.filter((el) =>  el.player_id !== player.player_id);
        }  
        populate_golf_match_players();
     }

   function populate_golf_match_players()
    {
      var players_to_populate = players;
      match_players.innerHTML = "";
      match_selected_players.innerHTML = "";
      fixed_odds = id("golf_match_fixed_odds").checked;

      for (i = 0;i < selected_players.length; i++) {
        players_to_populate = players_to_populate.filter(player => player.player_id !== selected_players[i].player_id);
      }   

      players_to_populate.forEach((player) => {
        var li = document.createElement("li");
        li.innerHTML = player.name;
        li.value = player.player_id;
        li.onclick = function() {
          add_player(player);
        }
        match_players.appendChild(li);
      });

      selected_players.forEach((player) => {
          var li = document.createElement("li");
          li.innerHTML = fixed_odds ? "<span class='pointer'>" + player.name + `</span><input type="number" style="font-family:FontAwesome, gotham_medium; width: 50px !important; float:right; height: 5px;" placeholder="Odds" class="input_style" id="` + player.player_id + `_odds" value="">` : "<span class='pointer'>" + player.name + "</span>";
          li.id = player.player_id;
          li.getElementsByTagName("span")[0].onclick = function() {
            remove_player(player);
          }
          match_selected_players.appendChild(li);
      });
    }

   function populate_golf_players(element)
    {
      players.forEach((player) => {
        var option = document.createElement("option");
        option.text = player.name;
        option.value = player.player_id;
        element.add(option);
      });
    }

   switch (selectorHTML(prop_golf_type_selector))
    {
      case "Make the Cut":
        show(prop_golf_make_the_cut[0]);
        hide(prop_golf_over_under[0]);
        hide(prop_golf_match_play[0]);
        hide(prop_golf_number_of_shots[0]);
        populate_golf_players(make_the_cut_player);
        break;
      case "Over/Under":
        show(prop_golf_over_under[0]);
        hide(prop_golf_make_the_cut[0]);
        hide(prop_golf_match_play[0]);
        hide(prop_golf_number_of_shots[0]);
        populate_golf_players(over_under_player);
        break;
      case "Match Play":
        show(prop_golf_match_play[0]);
        hide(prop_golf_make_the_cut[0]);
        hide(prop_golf_over_under[0]);
        hide(prop_golf_number_of_shots[0]);
        populate_golf_match_players();
        break;
      case "Number of Shots":
        show(prop_golf_number_of_shots[0]);
        hide(prop_golf_make_the_cut[0]);
        hide(prop_golf_over_under[0]);
        hide(prop_golf_match_play[0]);
        populate_golf_players(prop_golf_number_of_shots_player);
        break;
    }
 };

prop_bitcoin_type_selector.onchange = function()
{
    var prop_bitcoin_over_under = document.getElementsByClassName("prop_bitcoin_over_under");
    switch (selectorHTML(prop_bitcoin_type_selector))
    {
      case "Over/Under":
        show(prop_bitcoin_over_under[0]);
      break;
    }
    
};

prop_golf_match_multistat_overall.onchange = function()
 {
   var prop_golf_stats_multistat = document.getElementsByClassName("prop_golf_stats_multistat");

   switch (selectorHTML(prop_golf_multistat_overall))
    {
      case "Multi-stat":
        show(prop_golf_stats_multistat[0]);
        break;
      case "Score to Par":
        hide(prop_golf_stats_multistat[0]);
        break;
    }
 };

prop_golf_over_multistat_overall.onchange = function()
 {
    var prop_golf_over_stats_multistat = document.getElementsByClassName("prop_golf_over_stats_multistat");

    switch (selectorHTML(prop_golf_over_multistat_overall))
     {
        case "Multi-stat":
          show(prop_golf_over_stats_multistat[0]);
          id("prop_golf_over_under_round_tournament").classList.add("push_left");
          break;
        case "Score to Par":
          hide(prop_golf_over_stats_multistat[0]);
          id("prop_golf_over_under_round_tournament").classList.remove("push_left");
          break;
     }
 };

 prop_baseball_type_selector.onchange = function()
  {
    var prop_baseball_match_play = document.getElementsByClassName("prop_baseball_match_play");
    var prop_baseball_over_under = document.getElementsByClassName("prop_baseball_over_under");
    var players = get_all_players("BASEBALL");
    var selected_players = [];

    function add_player(player) 
    {
        selected_players.push(player);
        populate_match_play_players();
    }

    function remove_player(player)
     {
        for (i = 0;i < selected_players.length; i++) {
          selected_players = selected_players.filter((el) =>  el.player_id !== player.player_id);
        }  
        populate_match_play_players();
     }

     function populate_match_play_players()
      {
        var players_to_populate = players;
        
        var fixed_odds = false;
        if(id("baseball_match_fixed_odds").checked)
            fixed_odds = true;
          
        var player_select = document.getElementById("baseball_match_player_list");
        var selected_players_list = document.getElementById("baseball_match_selected_players_list");
        player_select.innerHTML = "";
        selected_players_list.innerHTML = "";
          
        for (i = 0;i < selected_players.length; i++) {
          players_to_populate = players_to_populate.filter(player => player.player_id !== selected_players[i].player_id);
        }      

        players_to_populate.forEach((player) => {
          var li = document.createElement("li");
          li.innerHTML = player.name;
          li.value = player.player_id;
          li.onclick = function() {
            add_player(player);
          }
          player_select.appendChild(li);
        });

        selected_players.forEach((player) => {
          var li = document.createElement("li");
          li.innerHTML = fixed_odds ? "<span class='pointer'>" + player.name + `</span><input type="number" style="font-family:FontAwesome, gotham_medium; width: 50px !important; float:right; height: 5px;" placeholder="Odds" class="input_style" id="` + player.player_id + `_odds" value="">` : "<span class='pointer'>" + player.name + "</span>";
          li.id = player.player_id;
          selected_players_list.appendChild(li);
          li.getElementsByTagName("span")[0].onclick = function() {
            remove_player(player);
          }
          
        });
      }

      function populate_over_under_player()
       {
         var player_select = document.getElementById("prop_baseball_over_under_player");

         players.forEach((player) => {
          var option = document.createElement("option");
          option.text = player.name;
          option.value = player.player_id;
          player_select.add(option);
        });
       }

    switch (selectorHTML(prop_baseball_type_selector))
      {
        case "Match Play":
          show(prop_baseball_match_play[0]);
          hide(prop_baseball_over_under[0]);
          populate_match_play_players();
          break;
        case "Over/Under":
          show(prop_baseball_over_under[0]);
          hide(prop_baseball_match_play[0]);
          populate_over_under_player();
          break;
      }
  };

function create_jackpot_table()
  {
    jackpot_table = new_table("jackpot_table");
    jackpot_table.id = 'jackpot_table_element';
    var

    row_count = 0,
    number_of_payouts = +id("number_of_payouts").value;

    if (isNaN(number_of_payouts) || number_of_payouts < 3) return show_simple_modal("There must be 3 or more payouts");
    else if (number_of_payouts > 10) return show_simple_modal("There can be up to 10 payouts");

    for (var i=0; i < number_of_payouts; i++) {
        var rank = i + 1;
        new_row(jackpot_table, row_count++, [
            rank,
            "<input type=\"number\" placeholder=\"% of payout\" class=\"input_style text_input\">"
        ]);
    }
        
    var header = new_row(jackpot_table, 0, [
        "Id",
        "Description"
    ]);
        
    for (var i=1; i<header.length; i++) header[i].className = "header_cell";
  }

function get_all_players(sport)
  {
  var call = api({
      method: "GetPlayerList",
      args: {
          sport: sport
      }
  });
  
  if (call.status === "1") return call.player_list;
  else return null;
  }

function get_available_sports()
  {
    var call = api({
        method: "GetAvailableSports",
        args: {}
    });
    
    if (call.status === "1") return call;
    else return null;
  }

function add_error(element) {
  id(element).classList.add("error");
}

function clear_error(element) {
  id(element).classList.remove("error");
}

// Check what scoring options are selected and populate scoring object
function get_score_value(input, name, score_obj, error) {
  if (id(input).value) {
    if (isNaN(id(input).value)) {
      error.error = true;
      add_error(input);
      show_simple_modal("Please set a valid value for " + name);
    } else if (name === "eagles") {
      score_obj["eagles+"] = Number(id(input).value);
    } else if (name === "double-bogeys") {
      score_obj["double-bogeys-"] = Number(id(input).value);
    } else {
      score_obj[name.toLowerCase()] = Number(id(input).value);
    }
  } else if (id(input + "_checkbox").checked) {
    error.error = true;
    add_error(input);
    show_simple_modal("Please enter a valid value for " + name);
  }
}

function getCheckedValue(name) {
  var radios = document.getElementsByName(name);
  for ( i=0; i<radios.length; i++ ) {
      if ( radios[i].checked ) {
          return radios[i].value;
      }
  }
  return null;
}

function create_contest_attempt(data, method)
  {
    var call = api({
        method,
        args: {
            data
        }
    });
   
    if (call.status === "1" && data.private) 
    {
      show_simple_modal(
        `Contest created! Your private contest's unique URL: \n ` + call.url,
        "good",
        function() {
          window.location = call.url;
        }
      );
    } else if (call.status === "1") 
      {
        show_simple_modal(
          "Your contest has been created successfully!",
          "good",
          function() {
            window.location = call.url;    
          }
        );
      } else {
        show_simple_modal("Error: " + call.error);
      };
  }

function create_new_contest()
  {
    var contest_type = selectorValue("contest_type_selector");
    var private = id("contest_private").checked;

    if (!contest_type) {
      show_simple_modal("Please select a contest type");
    }

  if (contest_type === "Roster") {
    var sport = selectorValue("roster_sport_selector");
    var settlement_type = selectorValue("roster_settlement_type");
    var json_obj = {};
    var scoring = {};
    var gameIDs = [];
    var jackpot_payouts = [];
    var score_to_par = false;
    var round_tournament;
    var submit_error = {error: false};              
    var cost_per_entry = id("roster_cost_per_entry").value;
    var number_of_payouts = id("number_of_payouts").value;
    var roster_jackpot_max_users = id("roster_jackpot_max_users").value;
    var roster_double_up_max_users = id ("roster_double_up_max_users").value;
    var max_rosters_per_user = id("max_rosters_per_user").value;
    var jackpot_table_error = false;
    // var roster_size = id("roster_size").value;
    // var roster_salary_cap = id ("roster_salary_cap").value;

    if (!sport) {
      show_simple_modal("Please select a sport");
      submit_error.error = true;
    }

    clear_error("roster_cost_per_entry");
    clear_error("roster_basketball_points");
    clear_error("roster_basketball_rebounds");
    clear_error("roster_basketball_assists");
    clear_error("roster_basketball_steals");
    clear_error("roster_basketball_blocks");
    clear_error("roster_hockey_goals");
    clear_error("roster_hockey_assists");
    clear_error("roster_hockey_plus_minus");
    clear_error("roster_hockey_sog");
    clear_error("roster_hockey_bs");
    clear_error("roster_baseball_rbi");
    clear_error("roster_baseball_hits");
    clear_error("roster_baseball_runs");
    clear_error("roster_baseball_strikeouts");
    clear_error("roster_baseball_walks");    
    clear_error("roster_golf_eagles");
    clear_error("roster_golf_birdies");
    clear_error("roster_golf_pars");
    clear_error("roster_golf_bogeys");
    clear_error("roster_golf_double_bogeys");
    clear_error("number_of_payouts");
    clear_error("roster_jackpot_max_users");
    clear_error("roster_double_up_max_users");
    clear_error("max_rosters_per_user");
    // clear_error("roster_size");
    // clear_error("roster_salary_cap");

    if (sport === "Basketball") {
      json_obj.sub_category = "BASKETBALL";
      get_score_value("roster_basketball_points", "pts", scoring, submit_error);
      get_score_value("roster_basketball_rebounds", "reb", scoring, submit_error);
      get_score_value("roster_basketball_assists", "ast", scoring, submit_error);
      get_score_value("roster_basketball_steals", "stl", scoring, submit_error);
      get_score_value("roster_basketball_blocks", "blk", scoring, submit_error);
      get_score_value("roster_basketball_turnovers", "tov", scoring, submit_error);
      get_score_value("roster_basketball_fgm", "fgm", scoring, submit_error);
      get_score_value("roster_basketball_fga", "fga", scoring, submit_error);
      get_score_value("roster_basketball_3pm", "3pm", scoring, submit_error);
      
      // Populate gameID's
      var basketball_games = document.getElementById("roster_basketball_games").children;
      populate_gameIDs(basketball_games, gameIDs);
      json_obj.gameIDs = gameIDs;
        
    }
    else if (sport === "Hockey") {
      json_obj.sub_category = "HOCKEY";
      get_score_value("roster_hockey_goals", "goals", scoring, submit_error);
      get_score_value("roster_hockey_assists", "assists", scoring, submit_error);
      get_score_value("roster_hockey_plus_minus", "plus-minus", scoring, submit_error);
      get_score_value("roster_hockey_sog", "sog", scoring, submit_error);
      get_score_value("roster_hockey_bs", "bs", scoring, submit_error);
      
      // Populate gameID's
      var hockey_games = document.getElementById("roster_hockey_games").children;
      populate_gameIDs(hockey_games, gameIDs);
      json_obj.gameIDs = gameIDs;
        
    } 
      
    else if (sport === "Baseball") {
      json_obj.sub_category = "BASEBALL";
      get_score_value("roster_baseball_rbi", "RBIs", scoring, submit_error);
      get_score_value("roster_baseball_hits", "hits", scoring, submit_error);
      get_score_value("roster_baseball_runs", "runs", scoring, submit_error);
      get_score_value("roster_baseball_strikeouts", "strikeouts", scoring, submit_error);
      get_score_value("roster_baseball_walks", "walks", scoring, submit_error);
      
      // Populate gameID's
      var baseball_games = document.getElementById("roster_baseball_games").children;
      populate_gameIDs(baseball_games, gameIDs);
      json_obj.gameIDs = gameIDs;
    } 
      
      else if (sport === "Golf") {
      json_obj.sub_category = "GOLF";
      var type = selectorValue(roster_multistat_overall);
      round_tournament = getCheckedValue("round_tournament");

      if (type === "Multi-stat") {
        get_score_value("roster_golf_eagles", "eagles", scoring, submit_error);
        get_score_value("roster_golf_birdies", "birdies", scoring, submit_error);
        get_score_value("roster_golf_pars", "pars", scoring, submit_error);
        get_score_value("roster_golf_bogeys", "bogeys", scoring, submit_error);
        get_score_value("roster_golf_double_bogeys", "double-bogeys", scoring, submit_error);
      } else if (type === "Score to Par") {
        score_to_par = true;
      }
    }

    if (settlement_type === "Jackpot") {
      var jackpot_table = id("jackpot_table");
      var counter = 0;
      if (jackpot_table.firstChild) {
        if (jackpot_table.firstChild.childNodes[0]) {
          var table_rows = jackpot_table.firstChild.childNodes[0].children.length;
      
          for (i=1; i<table_rows;i++) {
            var amount = jackpot_table.firstChild.childNodes[0].children[i].childNodes[1].childNodes[0].value;
            if (!amount || isNaN(amount)) {
              jackpot_table_error = true;
            } else {
              jackpot_payouts.push(Number(amount));
            }
          }
    
          jackpot_payouts.forEach(function(percent) {
            
            if (Number(percent) <= 0) {
              jackpot_table_error = true;
            } else {
              counter += percent;
            }
          });
    
          if (counter !== 100) {
            jackpot_table_error = true;
          }
        }
      } 
    }
    
    // Validation
    var scores_empty = $.isEmptyObject(scoring);

    if (gameIDs.length < 1 && sport !== "Golf" && !submit_error.error) {
      show_simple_modal("Please select at least one game");
      submit_error.error = true;
    } else if (scores_empty && selectorValue(roster_multistat_overall) !== "Score to Par" && !submit_error.error) {
      show_simple_modal("Please select at least one scoring option");
    } else if (sport === "Golf" && (round_tournament === "on" || !round_tournament) && !submit_error.error) {
      submit_error.error = true;
      show_simple_modal("Please select either a round or tournament");
    } else if ((!cost_per_entry || isNaN(cost_per_entry)) && !submit_error.error) {
      add_error("roster_cost_per_entry");
      show_simple_modal("Please provide a valid cost to enter the contest");
      submit_error.error = true;
    } else if (!settlement_type && !submit_error.error) {
      show_simple_modal("Please select a settlement type");
      submit_error.error = true;
    } else if (settlement_type === "Jackpot" && (!number_of_payouts || Number(number_of_payouts) < 3) && !submit_error.error) {
      add_error("number_of_payouts");
      show_simple_modal("Please enter a valid number of payouts (must be three or more)");
      submit_error.error = true;
    } else if (jackpot_table_error && !submit_error.error) {
      show_simple_modal("Please enter valid jackpot payout values (must add up to 100.0%)");
    } else if (settlement_type === "Jackpot" && (
        !roster_jackpot_max_users || 
        Number(roster_jackpot_max_users) < 2) &&
        roster_jackpot_max_users !== "0" && !submit_error.error
      )
    {
      add_error("roster_jackpot_max_users");
      show_simple_modal("Please enter a valid maximum number of users");
      submit_error.error = true;
    } else if (settlement_type === "Double-Up" && (
        !roster_double_up_max_users || 
        Number(roster_double_up_max_users) < 2) &&
        roster_double_up_max_users !== "0" && !submit_error.error
      ) 
    {  
      add_error("roster_double_up_max_users");
      show_simple_modal("Please enter a valid maximum number of users");
      submit_error.error = true;
    } else if ( (!max_rosters_per_user || isNaN(max_rosters_per_user) || Number(max_rosters_per_user) < 0)  && !submit_error.error ) {
      add_error("max_rosters_per_user");
      show_simple_modal("Please enter roster per user maximum");
      submit_error.error = true;
    }  else if (!submit_error.error) {
      // Build the JSON object
      json_obj.contest_type = "ROSTER";
      json_obj.cost_per_entry = Number(cost_per_entry);
      json_obj.private = private;
      json_obj.max_rosters = Number(max_rosters_per_user);
      // json_obj.roster_size = Number(roster_size);
      // json_obj.salary_cap = Number(roster_salary_cap);

      if (settlement_type === "Jackpot") {
        json_obj.jackpot_payouts = jackpot_payouts;
        json_obj.max_users = Number(roster_jackpot_max_users);
        json_obj.settlement_type = "JACKPOT";
      } else if (settlement_type === "Double-Up") {
        json_obj.max_users = Number(roster_double_up_max_users);
        json_obj.settlement_type = "DOUBLE-UP";
      } else {
        json_obj.settlement_type = "HEADS-UP";
      }

      if (sport === "Golf") {
        round_tournament =  round_tournament.toLowerCase();
        
        var prop_data = {
          when: round_tournament
        }

        if (score_to_par) {
          prop_data.multi_stp = "score_to_par";
        } else {
          prop_data.multi_stp = "multi-stat";
        }

        json_obj.prop_data = prop_data;
      }

      if (sport !== "Golf" || selectorValue(roster_multistat_overall) !== "Score to Par") {
        json_obj.scoring_rules = scoring;
      }
      
      console.log(json_obj);

      create_contest_attempt(json_obj, "SetupRoster");

      // Roster size & Salary cap validation
      // else if (!roster_size || isNaN(roster_size) || Number(roster_size) < 1 && Number(roster_size) !== 0) {
      //   add_error("roster_size");
      //   show_simple_modal("Please enter a valid roster size")
      // } else if (!roster_salary_cap || isNaN(roster_salary_cap) || Number(roster_salary_cap) < 500) {
      //   add_error("roster_salary_cap");
      //   show_simple_modal("Please enter a valid salary cap (minimum $500)")
      // }
    }
  }

  if (contest_type === "Prop") {
    var json_obj = {};
    var players = [];
    var scoring = {};
    var submit_error = {error: false};
    var scoring_required = {required: true};
    var sport = selectorValue("prop_sport_selector");

    clear_error("prop_basketball_match_points");
    clear_error("props_basketball_match_rebounds");
    clear_error("props_basketball_match_assists");
    clear_error("props_basketball_match_steals");
    clear_error("props_basketball_match_blocks");
    clear_error("props_basketball_match_turnovers");
    clear_error("prop_basketball_over_under_value");
    clear_error("props_basketball_over_points");
    clear_error("props_basketball_over_rebounds");
    clear_error("props_basketball_over_assists");
    clear_error("props_basketball_over_steals");
    clear_error("props_basketball_over_blocks");
    clear_error("props_basketball_over_turnovers");
    clear_error("prop_golf_over_stats_eagles");
    clear_error("prop_golf_over_stats_birdies");
    clear_error("prop_golf_over_stats_pars");
    clear_error("prop_golf_over_stats_bogeys");
    clear_error("prop_golf_over_stats_double_bogeys");
    clear_error("prop_golf_over_under_value");
    clear_error("prop_golf_stats_eagles");
    clear_error("prop_golf_stats_birdies");
    clear_error("prop_golf_stats_pars");
    clear_error("prop_golf_stats_bogeys");
    clear_error("prop_golf_stats_double_bogeys");
    clear_error("prop_golf_stats_eagles");
    clear_error("prop_golf_stats_birdies");
    clear_error("prop_golf_stats_pars");
    clear_error("prop_golf_stats_bogeys");
    clear_error("prop_golf_stats_double_bogeys");
    clear_error("prop_baseball_over_under_value");
    clear_error("prop_baseball_match_rbi");
    clear_error("prop_baseball_match_hits");
    clear_error("prop_baseball_match_runs");
    clear_error("prop_baseball_match_strikeouts");
    clear_error("prop_baseball_match_walks");
    clear_error("props_hockey_match_goals");
    clear_error("props_hockey_match_assists");
    clear_error("props_hockey_match_plus_minus");
    clear_error("props_hockey_match_sog");
    clear_error("props_hockey_match_bs");
    clear_error("props_hockey_over_goals");
    clear_error("props_hockey_over_assists");
    clear_error("props_hockey_over_plus_minus");
    clear_error("props_hockey_over_sog");
    clear_error("props_hockey_over_bs");
    
    
    if (!sport) {
      show_simple_modal("Please select a sport");
      submit_error.error = true;
    }

    if (sport === "Basketball") {
      var prop_type = selectorValue("prop_basketball_type");
      json_obj.sub_category = "BASKETBALLPROPS";
      
      if (!prop_type) {
        show_simple_modal("Please select a prop type");
        submit_error.error = true;
      }

      if (prop_type === "Match Play") {
        // Collect and validate scores
        get_score_value("prop_basketball_match_points", "pts", scoring, submit_error);
        get_score_value("props_basketball_match_rebounds", "reb", scoring, submit_error);
        get_score_value("props_basketball_match_assists", "ast", scoring, submit_error);
        get_score_value("props_basketball_match_steals", "stl", scoring, submit_error);
        get_score_value("props_basketball_match_blocks", "blk", scoring, submit_error);
        get_score_value("props_basketball_match_turnovers", "tov", scoring, submit_error);
        get_score_value("props_basketball_match_fgm", "fgm", scoring, submit_error);
        get_score_value("props_basketball_match_fga", "fga", scoring, submit_error);
        get_score_value("props_basketball_match_3pm", "3pm", scoring, submit_error);

        // Get players
        var selected_players = document.getElementById("basketball_match_selected_players_list").childNodes;
        
        if (selected_players.length < 2) {
          show_simple_modal("Please select at least two players");
          submit_error.error = true;
        } else {
          selected_players.forEach((player) => {
            p = {}
            if(id("basketball_match_fixed_odds").checked){
                var id_to_get = player.id + "_odds";
                
                odds = id(id_to_get).value;
                if(isNaN(odds) || Number(odds) < 1){
                    show_simple_modal("Please ensure that each player has valid odds assigned", "bad", null);
                    add_error("prop_basketball_match_play_odds");
                }
                else{
                    odds = Number(odds); 
                    p['id'] = player.id
                    p['odds'] = odds;
                    players.push(p);
                }  
            }
            else{
                p['id'] = player.id;
                players.push(p);
            }
          });
          
          prop_data = {};
          if(id("basketball_match_fixed_odds").checked){
              risk = id("basketball_match_risk").value;
              if (!risk || isNaN(risk) || Number(risk).toFixed(8) <= 0){
                  show_simple_modal("Please ensure that the risk is valid", "bad", null);
                  submit_error.error = true;
              }
              else{
                  prop_data['risk'] = Number(risk);
              }
              
              tie_odds = id("basketball_match_tie").value;
              if (!tie_odds || isNaN(tie_odds) ){
                show_simple_modal("Please ensure that the odds for a TIE is valid", "bad", null);
                submit_error.error = true;
              }
              else{
                  prop_data['tie_odds'] = Number(tie_odds);
              }
          }
            
          prop_data['prop_type'] = "MATCH_PLAY";
          prop_data['players'] = players;

          json_obj.prop_data = prop_data;
          json_obj.scoring_rules = scoring;
        }
      } 
    else if (prop_type === "Over/Under") {
        var prop_data = { prop_type: "OVER_UNDER"};
        var over_under_value = document.getElementById("prop_basketball_over_under_value").value;
        var player = document.getElementById("prop_basketball_over_under_player").value;

        if ((!over_under_value || isNaN(over_under_value)) && !submit_error.error) {
          show_simple_modal("Please enter a valid over/under value");
          add_error("prop_basketball_over_under_value");
          submit_error.error = true;
        } else {
          prop_data.over_under_value = Number(over_under_value);
        }

        // Collect and validate scores
        get_score_value("props_basketball_over_points", "pts", scoring, submit_error);

        get_score_value("props_basketball_over_rebounds", "reb", scoring, submit_error);
        get_score_value("props_basketball_over_assists", "ast", scoring, submit_error);
        get_score_value("props_basketball_over_steals", "stl", scoring, submit_error);
        get_score_value("props_basketball_over_blocks", "blk", scoring, submit_error);
        get_score_value("props_basketball_over_turnovers", "tov", scoring, submit_error);
        get_score_value("props_basketball_over_fgm", "fgm", scoring, submit_error);
        get_score_value("props_basketball_over_fga", "fga", scoring, submit_error);
        get_score_value("props_basketball_over_3pm", "3pm", scoring, submit_error);

        if (!player && !submit_error.error) {
          show_simple_modal("Please pick a player");
          submit_error.error = true;
        } else {
          prop_data.player_id = player;
        }
          
        // fixed odds  
        if(id("basketball_over_fixed_odds").checked){
            over = id("prop_basketball_over_odds").value;
            under = id("prop_basketball_under_odds").value;
            risk = id("basketball_over_under_risk").value;
            if (!risk || isNaN(risk) || Number(risk).toFixed(8) <= 0)
                show_simple_modal("Please ensure that the risk is valid", "bad", null);
            if(isNaN(over) || Number(over) < 1 || isNaN(under) || Number(under) < 1 ){
                show_simple_modal("Please ensure that the odds for OVER and UNDER are valid", "bad", null);
                submit_error.error = true;
            }
            else{
                over = Number(over);
                under = Number(under);
                prop_data['over_odds'] = over;
                prop_data['under_odds'] = under;
                prop_data['risk'] = Number(risk);
            }
        }  
        
        json_obj.prop_data = prop_data;
        json_obj.scoring_rules = scoring;
      }
    } 
    // BITCOIN PROP  
    else if (sport === "Bitcoin") {
      var prop_type = selectorValue("prop_bitcoin_type");
      json_obj.sub_category = "BITCOINPROPS";
      
      if (!prop_type) {
        show_simple_modal("Please select a prop type");
        submit_error.error = true;
      }
      if (prop_type === "Over/Under") {
        var prop_data = { prop_type: "HIGHER_LOWER"};
        var over_under_value = document.getElementById("prop_bitcoin_over_under_value").value;
      }
        
      json_obj.prop_data = prop_data;
      json_obj.scoring_rules = scoring;
    }     
    // HOCKEY PROP  
    else if (sport === "Hockey") {
      var prop_type = selectorValue("prop_hockey_type");
      json_obj.sub_category = "HOCKEYPROPS";
      
      if (!prop_type) {
        show_simple_modal("Please select a prop type");
        submit_error.error = true;
      }

      if (prop_type === "Match Play") {
        // Collect and validate scores
        get_score_value("prop_hockey_match_goals", "goals", scoring, submit_error);
        get_score_value("prop_hockey_match_assists", "assists", scoring, submit_error);
        get_score_value("prop_hockey_match_plus_minus", "plus-minus", scoring, submit_error);
        get_score_value("prop_hockey_match_sog", "sog", scoring, submit_error);
        get_score_value("prop_hockey_match_bs", "bs", scoring, submit_error);

        // Get players
        var selected_players = document.getElementById("hockey_match_selected_players_list").childNodes;
        
        if (selected_players.length < 2) {
          show_simple_modal("Please select at least two players");
          submit_error.error = true;
        } else {
          selected_players.forEach((player) => {
            p = {}
            if(id("hockey_match_fixed_odds").checked){
                var id_to_get = player.id + "_odds";
                
                odds = id(id_to_get).value;
                if(isNaN(odds) || Number(odds) < 1){
                    show_simple_modal("Please ensure that each player has valid odds assigned", "bad", null);
                    add_error("prop_hockey_match_play_odds");
                }
                else{
                    odds = Number(odds); 
                    p['id'] = player.id
                    p['odds'] = odds;
                    players.push(p);
                }  
            }
            else{
                p['id'] = player.id;
                players.push(p);
            }
          });
          
          prop_data = {};
          if(id("hockey_match_fixed_odds").checked){
              risk = id("hockey_match_risk").value;
              if (!risk || isNaN(risk) || Number(risk).toFixed(8) <= 0){
                  show_simple_modal("Please ensure that the risk is valid", "bad", null);
                  submit_error.error = true;
              }
              else{
                  prop_data['risk'] = Number(risk);
              }
              
              tie_odds = id("hockey_match_tie").value;
              if (!tie_odds || isNaN(tie_odds) ){
                show_simple_modal("Please ensure that the odds for a TIE is valid", "bad", null);
                submit_error.error = true;
              }
              else{
                  prop_data['tie_odds'] = Number(tie_odds);
              }
          }
            
          prop_data['prop_type'] = "MATCH_PLAY";
          prop_data['players'] = players;

          json_obj.prop_data = prop_data;
          json_obj.scoring_rules = scoring;
        }
      } 
    else if (prop_type === "Over/Under") {
        var prop_data = { prop_type: "OVER_UNDER"};
        var over_under_value = document.getElementById("prop_hockey_over_under_value").value;
        var player = document.getElementById("prop_hockey_over_under_player").value;

        if ((!over_under_value || isNaN(over_under_value)) && !submit_error.error) {
          show_simple_modal("Please enter a valid over/under value");
          add_error("prop_hockey_over_under_value");
          submit_error.error = true;
        } else {
          prop_data.over_under_value = Number(over_under_value);
        }

        // Collect and validate scores
        get_score_value("prop_hockey_over_goals", "goals", scoring, submit_error);
        get_score_value("prop_hockey_over_assists", "assists", scoring, submit_error);
        get_score_value("prop_hockey_over_plus_minus", "plus-minus", scoring, submit_error);
        get_score_value("prop_hockey_over_sog", "sog", scoring, submit_error);
        get_score_value("prop_hockey_over_bs", "bs", scoring, submit_error);

        if (!player && !submit_error.error) {
          show_simple_modal("Please pick a player");
          submit_error.error = true;
        } else {
          prop_data.player_id = player;
        }
          
        // fixed odds  
        if(id("hockey_over_fixed_odds").checked){
            over = id("prop_hockey_over_odds").value;
            under = id("prop_hockey_under_odds").value;
            risk = id("hockey_over_under_risk").value;
            if (!risk || isNaN(risk) || Number(risk).toFixed(8) <= 0)
                show_simple_modal("Please ensure that the risk is valid", "bad", null);
            if(isNaN(over) || Number(over) < 1 || isNaN(under) || Number(under) < 1 ){
                show_simple_modal("Please ensure that the odds for OVER and UNDER are valid", "bad", null);
                submit_error.error = true;
            }
            else{
                over = Number(over);
                under = Number(under);
                prop_data['over_odds'] = over;
                prop_data['under_odds'] = under;
                prop_data['risk'] = Number(risk);
            }
        }  
        
        json_obj.prop_data = prop_data;
        json_obj.scoring_rules = scoring;
      }
    } 
      
    else if (sport === "Golf") {
      var prop_type = selectorValue("prop_golf_type");
      json_obj.sub_category = "GOLFPROPS";

      if (!prop_type && !submit_error.error) {
        show_simple_modal("Please select a prop type");
        submit_error.error = true;
      }

      if (prop_type === "Over/Under") {
        var prop_data = { prop_type: "OVER_UNDER"};
        var multi_stat = selectorValue("prop_golf_multistat_over_overall");
        var over_under_value = document.getElementById("prop_golf_over_under_value").value;
        var player = document.getElementById("prop_golf_over_under_player").value;
        var round_tournament = getCheckedValue("prop_golf_over_round_tournament");

        if ((!over_under_value || isNaN(over_under_value)) && !submit_error.error) {
          show_simple_modal("Please enter a valid over/under value");
          add_error("prop_golf_over_under_value");
          submit_error.error = true;
        } else {
          prop_data.over_under_value = Number(over_under_value);
        }

        if (!multi_stat && !submit_error.error) {
          show_simple_modal("Please select either multi-stat or score to par");
          submit_error.error = true;
        }

        if (multi_stat === "Score to Par") {
          prop_data.multi_stp = "score_to_par"
          scoring_required.required = false;
        } else if (multi_stat === "Multi-stat") {
          get_score_value("prop_golf_over_stats_eagles", "eagles", scoring, submit_error);
          get_score_value("prop_golf_over_stats_birdies", "birdies", scoring, submit_error);
          get_score_value("prop_golf_over_stats_pars", "pars", scoring, submit_error);
          get_score_value("prop_golf_over_stats_bogeys", "bogeys", scoring, submit_error);
          get_score_value("prop_golf_over_stats_double_bogeys", "double-bogeys", scoring, submit_error);

          prop_data.multi_stp = "multi-stat"
          json_obj.scoring_rules = scoring;
        }

        if (!player && !submit_error.error) {
          show_simple_modal("Please pick a player");
          submit_error.error = true;
        } else {
          prop_data.player_id = player;
        }

        if (!round_tournament && !submit_error.error) {
          show_simple_modal("Please select either a round or tournament");
          submit_error.error = true;
        } else {
          prop_data.when = round_tournament.toLowerCase();
        }
          
        if(id("golf_over_fixed_odds").checked){
            over = id("prop_golf_over_odds").value;
            under = id("prop_golf_under_odds").value;
            if(isNaN(over) || Number(over) < 1 || isNaN(under) || Number(under) < 1 ){
                show_simple_modal("Please ensure that the odds for OVER and UNDER are valid", "bad", null);
                submit_error.error = true;
            }
            else{
                over = Number(over);
                under = Number(under);
                prop_data['over_odds'] = over;
                prop_data['under_odds'] = under;
            }
            risk = id("golf_over_under_risk").value;
            if (!risk || isNaN(risk) || Number(risk).toFixed(8) <= 0){
                show_simple_modal("Please ensure that the risk is valid", "bad", null);
                submit_error.error = true;
            }
            else{
                prop_data['risk'] = Number(risk);
            }
        }

        json_obj.prop_data = prop_data;

      } else if (prop_type === "Match Play") {
        var prop_data = { prop_type: "MATCH_PLAY"};
        var players = [];
        var multi_stat = selectorValue("prop_golf_multistat_overall");
        var round_tournament = getCheckedValue("prop_golf_match_round_tournament");
        var selected_players = document.getElementById("golf_match_selected_players_list").childNodes;

        if (!multi_stat && !submit_error.error) {
          show_simple_modal("Please select either multi-stat or score to par");
          submit_error.error = true;
        }

        if (multi_stat === "Score to Par") {
          prop_data.multi_stp = "score_to_par"
          scoring_required.required = false;
        } else if (multi_stat === "Multi-stat") {
          get_score_value("prop_golf_stats_eagles", "eagles", scoring, submit_error);
          get_score_value("prop_golf_stats_birdies", "birdies", scoring, submit_error);
          get_score_value("prop_golf_stats_pars", "pars", scoring, submit_error);
          get_score_value("prop_golf_stats_bogeys", "bogeys", scoring, submit_error);
          get_score_value("prop_golf_stats_double_bogeys", "double-bogeys", scoring, submit_error);

          prop_data.multi_stp = "multi-stat"
          json_obj.scoring_rules = scoring;
        }

        if (!round_tournament && !submit_error.error) {
          show_simple_modal("Please select either a round or tournament");
          submit_error.error = true;
        } else {
          prop_data.when = round_tournament.toLowerCase();
        }

        if (selected_players.length < 2 && !submit_error.error) {
          show_simple_modal("Please select at least two players");
          submit_error.error = true;
        } else {
          selected_players.forEach((player) => {
            p = {}
            fixed_odds = id("golf_match_fixed_odds").checked
            if(fixed_odds){
                var id_to_get = player.id + "_odds";
                
                odds = id(id_to_get).value;
                if(isNaN(odds) || Number(odds) < 1){
                    show_simple_modal("Please ensure that each player has valid odds assigned", "bad", null);
                    add_error("prop_golf_match_play_odds");
                }
                else{
                    odds = Number(odds); 
                    p['id'] = player.id
                    p['odds'] = odds;
                    players.push(p);
                }  
            }
            else{
                p['id'] = player.id;
                players.push(p);
            }
          });
            
          if(id("golf_match_fixed_odds").checked){
              risk = id("golf_match_risk").value;
              if (!risk || isNaN(risk) || Number(risk).toFixed(8) <= 0){
                show_simple_modal("Please ensure that the risk is valid", "bad", null);
                submit_error.error = true;
              }
              else{
                  prop_data['risk'] = Number(risk);
              }
              
              tie_odds = id("golf_match_tie").value;
              if (!tie_odds || isNaN(tie_odds) ){
                show_simple_modal("Please ensure that the odds for a TIE is valid", "bad", null);
                submit_error.error = true;
              }
              else{
                  prop_data['tie_odds'] = Number(tie_odds);
              }
          }
          prop_data.players = players;
            
        }
        json_obj.prop_data = prop_data;
          
      } 
    else if (prop_type === "Number of Shots") {
        scoring_required.required = false;
        var prop_data = { prop_type: "NUMBER_SHOTS"};
        var shot_type = selectorValue("prop_golf_number_of_shots_type");
        var round_tournament = getCheckedValue("prop_golf_shots_round_tournament");
        var player = document.getElementById("prop_golf_number_of_shots_player").value;

        if (!shot_type && !submit_error.error) {
          show_simple_modal("Please select a shot type");
          submit_error.error = true;
        } else {
          prop_data.shot = shot_type;
        }

        if (!round_tournament && !submit_error.error) {
          show_simple_modal("Please select either a round or tournament");
          submit_error.error = true;
        } else {
          prop_data.when = round_tournament.toLowerCase();
        }

        if (!player && !submit_error.error) {
          show_simple_modal("Please pick a player");
          submit_error.error = true;
        } else {
          prop_data.player_id = player;
        }

        json_obj.prop_data = prop_data;

      } else if (prop_type === "Make the Cut") {
        scoring_required.required = false;
        var prop_data = { prop_type: "MAKE_CUT"};
        var player = document.getElementById("prop_golf_make_the_cut_player").value;

        if (!player && !submit_error.error) {
          show_simple_modal("Please pick a player");
          submit_error.error = true;
        } else {
          prop_data.player_id = player;
        }
          
         if(id("golf_make_cut_fixed_odds").checked){
            yes = id("prop_golf_make_cut_yes_odds").value;
            no = id("prop_golf_make_cut_no_odds").value;
            if(isNaN(yes) || Number(yes) < 1 || isNaN(no) || Number(no) < 1 ){
                show_simple_modal("Please ensure that the odds for Yes and No are valid", "bad", null);
                submit_error.error = true;
            }
            else{
                yes = Number(yes);
                no = Number(no);
                prop_data['yes_odds'] = yes;
                prop_data['no_odds'] = no;
            }
            risk = id("golf_make_cut_risk").value;
            if (!risk || isNaN(risk) || Number(risk).toFixed(8) <= 0){
                show_simple_modal("Please ensure that the risk is valid", "bad", null);
                submit_error.error = true;
            }
            else{
                prop_data['risk'] = Number(risk);
            }
        }
      
        json_obj.prop_data = prop_data;
      }      
    } else if (sport === "Baseball") {
      var prop_type = selectorValue("prop_baseball_type");
      json_obj.sub_category = "BASEBALLPROPS";
      
      if (!prop_type) {
        show_simple_modal("Please select a prop type");
        submit_error.error = true;
      }

      if (prop_type === "Match Play") {
        var prop_data = { prop_type: "MATCH_PLAY"};
        var players = [];
        var selected_players = document.getElementById("baseball_match_selected_players_list").childNodes;

        get_score_value("prop_baseball_match_rbi", "RBIs", scoring, submit_error);
        get_score_value("prop_baseball_match_hits", "hits", scoring, submit_error);
        get_score_value("prop_baseball_match_runs", "runs", scoring, submit_error);
        get_score_value("prop_baseball_match_strikeouts", "strikeouts", scoring, submit_error);
        get_score_value("prop_baseball_match_walks", "walks", scoring, submit_error);

        if (selected_players.length < 2 && !submit_error.error) {
          show_simple_modal("Please select at least two players");
          submit_error.error = true;
        } else {
          selected_players.forEach((player) => {
            p = {}
            if(id("baseball_match_fixed_odds").checked){
                var id_to_get = player.id + "_odds";
                
                odds = id(id_to_get).value;
                if(isNaN(odds) || Number(odds) < 1){
                    show_simple_modal("Please ensure that each player has valid odds assigned", "bad", null);
                    add_error("prop_baseball_match_play_odds");
                }
                else{
                    odds = Number(odds); 
                    p['id'] = player.id
                    p['odds'] = odds;
                    players.push(p);
                }  
            }
            else{
                p['id'] = player.id;
                players.push(p);
            }
              
          });
        prop_data.players = players;
        
        if(id("baseball_match_fixed_odds").checked){        
            risk = id("baseball_match_risk").value;
            if (!risk || isNaN(risk) || Number(risk).toFixed(8) <= 0){
                show_simple_modal("Please ensure that the risk is valid", "bad", null);
                submit_error.error = true;
            }
            else{
                prop_data['risk'] = Number(risk);
            }
       
            tie_odds = id("baseball_match_tie").value;
            if (!tie_odds || isNaN(tie_odds) ){
                show_simple_modal("Please ensure that the odds for a TIE is valid", "bad", null);
                submit_error.error = true;
            }
            else{
                prop_data['tie_odds'] = Number(tie_odds);
            }
        }
        
        json_obj.scoring_rules = scoring;
        json_obj.prop_data = prop_data;
                   
      } 
    }
    else if (prop_type === "Over/Under") {
        var prop_data = { prop_type: "OVER_UNDER"};
        var over_under_value = document.getElementById("prop_baseball_over_under_value").value;
        var player = document.getElementById("prop_baseball_over_under_player").value;

        if ((!over_under_value || isNaN(over_under_value)) && !submit_error.error) {
          show_simple_modal("Please enter a valid over/under value");
          add_error("prop_baseball_over_under_value");
          submit_error.error = true;
        } else {
          prop_data.over_under_value = Number(over_under_value);
        }

        get_score_value("prop_baseball_over_rbi", "RBIs", scoring, submit_error);
        get_score_value("prop_baseball_over_hits", "hits", scoring, submit_error);
        get_score_value("prop_baseball_over_runs", "runs", scoring, submit_error);
        get_score_value("prop_baseball_over_strikeouts", "strikeouts", scoring, submit_error);
        get_score_value("prop_baseball_over_walks", "walks", scoring, submit_error);
        
        if (!player && !submit_error.error) {
          show_simple_modal("Please pick a player");
          submit_error.error = true;
        } else {
          prop_data.player_id = player;
        }
          
        // fixed odds  
        if(id("baseball_over_fixed_odds").checked){
            over = id("prop_baseball_over_odds").value;
            under = id("prop_baseball_under_odds").value;
            if(isNaN(over) || Number(over) < 1 || isNaN(under) || Number(under) < 1 ){
                show_simple_modal("Please ensure that the odds for OVER and UNDER are valid", "bad", null);
            }
            else{
                over = Number(over);
                under = Number(under);
                prop_data['over_odds'] = over;
                prop_data['under_odds'] = under;
            }
            risk = id("baseball_over_under_risk").value;
            if (!risk || isNaN(risk) || Number(risk).toFixed(8) <= 0){
                show_simple_modal("Please ensure that the risk is valid", "bad", null);
                submit_error.error = true;
            }
            else{
                prop_data['risk'] = Number(risk);
            }
        }
        
        json_obj.scoring_rules = scoring;
        json_obj.prop_data = prop_data;
      }
    };
      
    // Validation
    var scores_empty = jQuery.isEmptyObject(scoring);
    
    if (scores_empty && scoring_required.required && !submit_error.error) {
      show_simple_modal("Please select at least one scoring option");
      submit_error.error = true;
    }
    
    if (!submit_error.error) {
      // build & submit json
      json_obj.private = private;

      console.log(json_obj);

      create_contest_attempt(json_obj, "SetupPropBet");
    }
  }

  if (contest_type === "Misc") {
    // Collect form data
    var title = id("misc_title").value;
    var description = id("misc_description").value;
    var reg_deadline = id("misc_registration_deadline").value;
    var reg_deadline_time = id("misc_registration_deadline_time_selector").value;
    var set_deadline = id("misc_settlement_deadline").value;
    var set_deadline_time = id("misc_settlement_deadline_time_selector").value;
    var min_wager = id("misc_min_wager").value;
    var settlement_type = selectorValue("misc_settlement_type");
    var number_of_options = id("number_of_options").value;
    var pari_mutuel_table = id("pari_mutuel_table");
    var pari_mutuel_table_element = id("pari_mutuel_table_element");
    var table_values = [];

    var hour = 3600000;
    reg_deadline_time *= 60 * 60 * 1000;
    set_deadline_time *= 60 * 60 * 1000;

    // Clear errors
    clear_error("misc_title");
    clear_error("misc_description");
    clear_error("misc_registration_deadline");
    clear_error("misc_settlement_deadline");
    clear_error("misc_min_wager");
    clear_error("number_of_options");

    // Validation
    if (!title || title.length < 2) {
      add_error("misc_title");
      show_simple_modal("Please enter a valid contest title");
    } else if (!description || description.length < 2) {
      add_error("misc_description");
      show_simple_modal("Please enter a valid contest description");
    } else if (!reg_deadline || Date.parse(reg_deadline) + reg_deadline_time < Date.now() + hour) {
        add_error("misc_registration_deadline");
        show_simple_modal("Please set a valid registration deadline");
    } else if (
        !set_deadline || 
        Date.parse(set_deadline) + set_deadline_time < Date.now() || 
        Date.parse(set_deadline) + set_deadline_time < Date.parse(reg_deadline) + reg_deadline_time + hour
      ) {
        add_error("misc_settlement_deadline");
        show_simple_modal("Please set a valid settlement deadline");
    } else if (!number_of_options || 
        Number(number_of_options) < 2 || 
        pari_mutuel_table_element.childElementCount === 0
      ) {
        add_error("number_of_options");
        show_simple_modal("Please select at least 2 pari-mutuel options");        
    } else if (!min_wager || isNaN(min_wager) || Number(min_wager).toFixed(8) <= 0) {
      add_error("misc_min_wager");
      show_simple_modal("Please enter a valid minimum wager amount");
    } else {
      // Get values from pari-mutuel table
      var table_rows = pari_mutuel_table.firstChild.childNodes[0].children.length;
      var table_error = false;
      var odds_error = false;
      for (i=1; i<table_rows;i++) {
        if (id('fixed_odds').checked !== true) {
          var desc = pari_mutuel_table.firstChild.childNodes[0].children[i].childNodes[1].childNodes[0].value;
        } 
        else {
          if(i === table_rows - 1) break;
          desc = {
            description: pari_mutuel_table.firstChild.childNodes[0].children[i].childNodes[1].childNodes[0].value,
            odds: pari_mutuel_table.firstChild.childNodes[0].children[i].childNodes[2].childNodes[0].value
          }
          if(isNaN(desc.odds) || Number(desc.odds) < 1){
            odds_error = true;
          }
        }
        // var desc = pari_mutuel_table.firstChild.childNodes[0].children[i].childNodes[1].childNodes[0].value;
        // console.log(pari_mutuel_table.firstChild.childNodes[0].children[i].childNodes[2].childNodes[0].value);
        if (!desc ) {
          table_error = true;
        } else {
          table_values.push(desc);
        }
      }
      
      risk_error = false;
      var risk = null;
      if (id('fixed_odds').checked === true) {
          risk = id("risk").value;
          if(!risk || isNaN(risk) || Number(risk).toFixed(8) <= 0){
              risk_error = true;
          }
          else{
            risk = Number(risk);
          }
      }
        
      if (table_error) {
        show_simple_modal("Please enter valid option descriptions", () => {});
      } 
      else if(odds_error){
        show_simple_modal("Please enter valid odds", "bad", null);
      }
     else if(risk_error){
        show_simple_modal("Please enter a valid risk", "bad", null);
      }
      else {
        // Make the JSON call now that all validation has passed
        var registration_deadline = dateconv_date_start_time(Date.parse(reg_deadline));
        var settlement_deadline = dateconv_date_start_time(Date.parse(set_deadline));
        registration_deadline += reg_deadline_time;
        settlement_deadline += set_deadline_time;

        min_wager = Number(min_wager);
          
        var json_obj = {
          title,
          description,
          registration_deadline,
          settlement_deadline,
          cost_per_entry: min_wager,
          settlement_type,
          pari_mutuel_options: table_values,
          private
        };
          
        if(risk !== null){
            json_obj.risk = risk;
        }
          
        console.log(json_obj);

        create_contest_attempt(json_obj, "SetupMisc");
      }
    }
  }
}

// Preselect values if coming from sport page
var category = get_url_param("category");

if (category === "basketball" && available_sports.BASKETBALL) {
  contest_type_selector.value = "Roster";
  contest_type_selector.onchange();
}
else if (category === "basketballprops" && available_sports.BASKETBALL) {
  contest_type_selector.value = "Prop";
  contest_type_selector.onchange();
} 
else if (category === "hockey" && available_sports.HOCKEY) {
  contest_type_selector.value = "Roster";
  contest_type_selector.onchange();
} 
else if (category === "hockeyprops" && available_sports.HOCKEY) {
  contest_type_selector.value = "Prop";
  contest_type_selector.onchange();
}
else if (category === "golf" && available_sports.GOLF_4) {
  contest_type_selector.value = "Roster";
  contest_type_selector.onchange();
} 
else if (category === "golfprops" && available_sports.GOLF_4) {
  contest_type_selector.value = "Prop";
  contest_type_selector.onchange();
} 
else if (category === "baseball" && available_sports.BASEBALL) {
  contest_type_selector.value = "Roster";
  contest_type_selector.onchange();
} 
else if (category === "baseballprops" && available_sports.BASEBALL) {
  contest_type_selector.value = "Prop";
  contest_type_selector.onchange();
} 
else if (category === "usergenerated") {
  contest_type_selector.value = "Misc";
  contest_type_selector.onchange();
}

if (category === "basketball" && available_sports.BASKETBALL) {
  roster_sport_selector.value = "Basketball";
  roster_sport_selector.onchange();
} else if (category === "basketballprops" && available_sports.BASKETBALL) {
  prop_sport_selector.value = "Basketball";
  prop_sport_selector.onchange();
}
else if (category === "hockey" && available_sports.HOCKEY) {
  roster_sport_selector.value = "Hockey";
  roster_sport_selector.onchange();
} else if (category === "hockeyprops" && available_sports.HOCKEY) {
  prop_sport_selector.value = "Hockey";
  prop_sport_selector.onchange();
}
else if (category === "golf" && available_sports.GOLF_4) {
  roster_sport_selector.value = "Golf";
  roster_sport_selector.onchange();
} else if (category === "golfprops" && available_sports.GOLF_4) {
  prop_sport_selector.value = "Golf";
  prop_sport_selector.onchange();
} else if (category === "baseball" && available_sports.BASEBALL) {
  roster_sport_selector.value = "Baseball";
  roster_sport_selector.onchange();
} else if (category === "baseballprops" && available_sports.BASEBALL) {
  prop_sport_selector.value = "Baseball";
  prop_sport_selector.onchange();
}

// Enable correct round / tournament radio buttons
var round_one_radios = $("*[id$='_round_one']");
var round_two_radios = $("*[id$='_round_two']");
var round_three_radios = $("*[id$='_round_three']");
var tournament_radios = $("*[id$='_golf_tournament']");

var round_one_labels = $("*[class$='_round_one']");
var round_two_labels = $("*[class$='_round_two']");
var round_three_labels = $("*[class$='_round_three']");
var tournament_labels = $("*[class$='_golf_tournament']");

function enable_radios(radios, labels) {
  $.each(radios, function(index) {
    radios[index].disabled = false;
    labels[index].classList.remove("dimmed");
  });
}

if (available_sports.GOLF_1) {
  var radios_one_two = $.merge(round_one_radios, round_two_radios);
  var radios_three_tour = $.merge(round_three_radios, tournament_radios);

  var labels_one_two = $.merge(round_one_labels, round_two_labels);
  var labels_three_tour = $.merge(round_three_labels, tournament_labels);

  var radios = $.merge(radios_one_two, radios_three_tour);
  var labels = $.merge(labels_one_two, labels_three_tour);

  enable_radios(radios, labels);
} else if (available_sports.GOLF_2) {
  var radios = $.merge(round_two_radios, round_three_radios);
  var labels = $.merge(round_two_labels, round_three_labels);
  enable_radios(radios, labels);
} else if (available_sports.GOLF_3) {
  enable_radios(round_three_radios, round_three_labels);
}

// Enfore decimal on over/under
var basketball_over_under = document.getElementById("prop_basketball_over_under_value");
var hockey_over_under = document.getElementById("prop_hockey_over_under_value");
var golf_over_under = document.getElementById("prop_golf_over_under_value");
var baseball_over_under = document.getElementById("prop_baseball_over_under_value");

basketball_over_under.onblur = function()
  {
    var value = basketball_over_under.value;

    if (Number.isInteger(Number(value)) && !isNaN(value) && value) {
      if (Number(value) < 0) {
        document.getElementById("prop_basketball_over_under_value").value = Number(value) - 0.5;
        value = Number(value) - 0.5;
      } else {
        document.getElementById("prop_basketball_over_under_value").value = Number(value) + 0.5;
        value = Number(value) + 0.5;
      }
    }
    id("basketball_over_odds_label").innerHTML = "Over " + value;
    id("basketball_under_odds_label").innerHTML = "Under " + value;
  }

hockey_over_under.onblur = function()
  {
    var value = hockey_over_under.value;

    if (Number.isInteger(Number(value)) && !isNaN(value) && value) {
      if (Number(value) < 0) {
        document.getElementById("prop_hockey_over_under_value").value = Number(value) - 0.5;
        value = Number(value) - 0.5;
      } else {
        document.getElementById("prop_hockey_over_under_value").value = Number(value) + 0.5;
        value = Number(value) + 0.5;
      }
    }
    id("hockey_over_odds_label").innerHTML = "Over " + value;
    id("hockey_under_odds_label").innerHTML = "Under " + value;
  }

golf_over_under.onblur = function()
  {
    var value = golf_over_under.value;

    if (Number.isInteger(Number(value)) && !isNaN(value) && value) {
      if (Number(value) < 0) {
        document.getElementById("prop_golf_over_under_value").value = Number(value) - 0.5;
        value = Number(value) - 0.5;
      } else {
        document.getElementById("prop_golf_over_under_value").value = Number(value) + 0.5;
        value = Number(value) + 0.5;
      }
     }
    id("golf_over_odds_label").innerHTML = "Over " + value;
    id("golf_under_odds_label").innerHTML = "Under " + value;
  }

baseball_over_under.onblur = function()
  {
    var value = baseball_over_under.value;

    if (Number.isInteger(Number(value)) && !isNaN(value) && value) {
      if (Number(value) < 0) {
        document.getElementById("prop_baseball_over_under_value").value = Number(value) - 0.5;
        value = Number(value) - 0.5;
      } else {
        document.getElementById("prop_baseball_over_under_value").value = Number(value) + 0.5;
        value = Number(value) + 0.5;
      }
    }
    id("baseball_over_odds_label").innerHTML = "Over " + value;
    id("baseball_under_odds_label").innerHTML = "Under " + value;
  }

// Automatically build jackpot table
var jackpot_input = document.getElementById("number_of_payouts");

jackpot_input.onblur = function()
  {
    $("#create_jackpot_table").click();
  }

// Automatically build/update options table
var options_input = document.getElementById("number_of_options");
var fixed_odds = document.getElementById("fixed_odds");

options_input.onblur = function()
  {
    $("#create_pari_mutuel_table").click();
  }
