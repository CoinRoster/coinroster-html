/* Contest & Sport Selectors */
var contest_type_selector = id("contest_type_selector");
var roster_sport_selector = id("roster_sport_selector");
var roster_multistat_overall = id("roster_multistat_overall");
var roster_settlement_type = id("roster_settlement_type");
var prop_sport_selector = id("prop_sport_selector");
var prop_basketball_type_selector = id("prop_basketball_type");
var prop_golf_type_selector = id("prop_golf_type");
var prop_baseball_type_selector = id("prop_baseball_type");
var prop_golf_match_multistat_overall = id("prop_golf_multistat_overall");
var prop_golf_over_multistat_overall = id("prop_golf_multistat_over_overall");

var checkboxes = $("*[class$='_checkbox']");
var inputs = $("*[class$='checkbox_input']");
var inputs_labels = $("*[class$='dynamic_checkbox_label']");

var avaliable_sports;

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

 var reset_elements = function()
  {
    hide(document.getElementsByClassName("roster_basketball_scoring")[0]);
    hide(document.getElementsByClassName("roster_golf_scoring")[0]);
    hide(document.getElementsByClassName("roster_baseball_scoring")[0]);
    hide(document.getElementsByClassName("prop_basketball_match_play")[0]);
    hide(document.getElementsByClassName("prop_basketball_over_under")[0]);
    hide(document.getElementsByClassName("prop_golf_make_the_cut")[0]);
    hide(document.getElementsByClassName("prop_golf_over_under")[0]);
    hide(document.getElementsByClassName("prop_golf_match_play")[0]);
    hide(document.getElementsByClassName("prop_golf_number_of_shots")[0]);
    hide(document.getElementsByClassName("prop_golf_stats_multistat")[0]);
    hide(document.getElementsByClassName("prop_baseball_match_play")[0]);
    hide(document.getElementsByClassName("prop_baseball_over_under")[0]);
    hide(document.getElementsByClassName("prop_baseball_over_under")[0]);
  };

contest_type_selector.onchange = function()
  {
    var roster_fields = document.getElementsByClassName("roster_fields");
    var prop_fields = document.getElementsByClassName("prop_fields");
    var misc_fields = document.getElementsByClassName("misc_fields");

    reset_elements();
    document.getElementById("roster_sport_selector").selectedIndex = "0";
    document.getElementById("prop_sport_selector").selectedIndex = "0";

    avaliable_sports = get_available_sports();

    function populate_sports()
     {
        // var basketball = avaliable_sports.BASKETBALL;
        // var golf = avaliable_sports.GOLF_4;
        // var baseball = avaliable_sports.BASEBALL;

        var basketball = true;
        var golf = true;
        var baseball = true;
        
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

  switch (selectorHTML(roster_sport_selector))
    {
      case "Basketball":
        show(basketball_scoring[0]);
        hide(golf_scoring[0]);
        hide(baseball_scoring[0]);
        break;
      case "Golf":
        show(golf_scoring[0]);
        hide(basketball_scoring[0]);
        hide(baseball_scoring[0]);
        break;
      case "Baseball":
        show(baseball_scoring[0]);
        hide(basketball_scoring[0]);
        hide(golf_scoring[0]);
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
  var prop_golf_type = document.getElementsByClassName("prop_golf_type");
  var prop_baseball_type = document.getElementsByClassName("prop_baseball_type");
  var prop_golf_type_selector = document.getElementById("prop_golf_type");

  avaliable_sports = get_available_sports();

  $('#prop_golf_type option[value="Make the Cut"]').remove();
  
  reset_elements();
  
  document.getElementById("prop_basketball_type").selectedIndex = "0";
  document.getElementById("prop_golf_type").selectedIndex = "0";
  document.getElementById("prop_baseball_type").selectedIndex = "0";

  if (avaliable_sports.GOLF_1 || avaliable_sports.GOLF_2 || avaliable_sports.GOLF_3) {
    var option = document.createElement("option");
    option.text = "Make the Cut";
    option.value = "Make the Cut";
    prop_golf_type_selector.add(option);
  }

  switch (selectorHTML(prop_sport_selector))
  {
    case "Basketball":
      show(prop_basketball_type[0]);
      hide(prop_golf_type[0]);
      hide(prop_baseball_type[0]);
      break;
    case "Golf":
      show(prop_golf_type[0]);
      hide(prop_basketball_type[0]);
      hide(prop_baseball_type[0]);
      break;
    case "Baseball":
      show(prop_baseball_type[0]);
      hide(prop_basketball_type[0]);
      hide(prop_golf_type[0]);
      break;
  }
 };

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
          li.innerHTML = player.name;
          li.id = player.player_id;
          li.onclick = function() {
            remove_player(player);
          }
          selected_players_list.appendChild(li);
        });
      }

    function populate_over_under_players()
      {
        var player_select = document.getElementById("prop_basketball_over_under_player");

        players.forEach((player) => {
          var option = document.createElement("option");
          option.text = player.name;
          option.value = player.id;
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
        li.innerHTML = player.name;
        li.id = player.player_id;
        li.onclick = function() {
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
        option.value = player.id;
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
          break;
        case "Score to Par":
          hide(prop_golf_over_stats_multistat[0]);
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
          li.innerHTML = player.name;
          li.id = player.player_id;
          li.onclick = function() {
            remove_player(player);
          }
          selected_players_list.appendChild(li);
        });
      }

      function populate_over_under_player()
       {
         var player_select = document.getElementById("prop_baseball_over_under_player");

         players.forEach((player) => {
          var option = document.createElement("option");
          option.text = player.name;
          option.value = player.id;
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

    if (isNaN(number_of_payouts) || number_of_payouts < 2) return alert("There must be 2 or more payouts");
    else if (number_of_payouts > 10) return alert("There can be up to 10 payouts");

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
function get_score_value(input, checkbox, name, score_obj) {
  if (id(input).value) {
    if (isNaN(id(input).value)) {
      add_error(input);
      alert("Please set a valid value for " + name);
    } else {
      score_obj[name] = id(input).value;
    }
  } else if (id(checkbox).checked) {
    add_error(input);
    alert("Please enter a valid value for " + name);
  }
}

function any_checked(boxes, flag){
  boxes.forEach(function(box) {
    if (id(box).checked) {
      flag.flag = true;
      console.log()
    }
  });
}

function create_new_contest()
  {
    var contest_type = selectorValue("contest_type_selector");
    var private = id("contest_private").checked;

    if (!contest_type) {
      alert("Please select a contest type");
    }

  if (contest_type === "Roster") {
    var sport = selectorValue("roster_sport_selector");

    if (!sport) {
      alert("Please select a sport");
    }

    // Clear errors
    clear_error("roster_cost_per_entry");
    clear_error("roster_basketball_points");
    clear_error("roster_basketball_rebounds");
    clear_error("roster_basketball_assists");
    clear_error("roster_basketball_steals");
    clear_error("roster_basketball_blocks");
    clear_error("roster_basketball_turnovers");
    clear_error("roster_baseball_rbi");
    clear_error("roster_baseball_hits");
    clear_error("roster_baseball_runs");
    clear_error("roster_baseball_strikeouts");
    clear_error("roster_baseball_walks");

    var scoring = {};
    var checked_boxes_flag = {flag: false};
    var cost_per_entry = id("roster_cost_per_entry").value;
    

    if (sport === "Basketball") {
      get_score_value("roster_basketball_points", "roster_basketball_points_checkbox", "points", scoring);
      get_score_value("roster_basketball_rebounds", "roster_basketball_rebounds_checkbox", "rebounds", scoring);
      get_score_value("roster_basketball_assists", "roster_basketball_assists_checkbox", "assists", scoring);
      get_score_value("roster_basketball_steals", "roster_basketball_steals_checkbox", "steals", scoring);
      get_score_value("roster_basketball_blocks", "roster_basketball_blocks", "blocks", scoring);
      get_score_value("roster_basketball_turnovers", "roster_basketball_turnovers_checkbox", "turnovers", scoring);
      any_checked([
        "roster_basketball_points_checkbox",
        "roster_basketball_rebounds_checkbox",
        "roster_basketball_steals_checkbox",
        "roster_basketball_blocks",
        "roster_basketball_turnovers_checkbox"
      ], checked_boxes_flag);
    } else if (sport === "Baseball") {
      get_score_value("roster_baseball_rbi", "roster_baseball_rbi_checkbox", "RBIs", scoring);
      get_score_value("roster_baseball_hits", "roster_baseball_hits_checkbox", "hits", scoring);
      get_score_value("roster_baseball_runs", "roster_baseball_runs_checkbox", "runs", scoring);
      get_score_value("roster_baseball_strikeouts", "roster_baseball_strikeouts_checkbox", "strikeouts", scoring);
      get_score_value("roster_baseball_walks", "roster_baseball_walks_checkbox", "walks", scoring);
      any_checked([
        "roster_baseball_rbi_checkbox",
        "roster_baseball_hits_checkbox",
        "roster_baseball_runs_checkbox",
        "roster_baseball_strikeouts_checkbox",
        "roster_baseball_walks_checkbox"
      ], checked_boxes_flag);
    } else if (sport === "Golf") {
      // golf
    }

    if (!scoring.length && selectorValue(roster_multistat_overall) !== "Score to Par" && !checked_boxes_flag.flag) {
      alert("Please select at least one scoring option");
    } else if (!cost_per_entry || isNaN(cost_per_entry)) {
      add_error("roster_cost_per_entry");
      alert("Please provide a valid cost to enter the contest");
    }
    
    console.log(!scoring.length);
    console.log(selectorValue(roster_multistat_overall) !== "Score to Par")
    console.log(checked_boxes_flag);

    var json_obj = {

    };

    // api call

  }

  if (contest_type === "Prop") {
    var sport = selectorValue("prop_sport_selector");
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
      alert("Please enter a valid contest title");
    } else if (!description || description.length < 2) {
      add_error("misc_description");
      alert("Please enter a valid contest description");
    } else if (!reg_deadline || Date.parse(reg_deadline) + reg_deadline_time < Date.now() + hour) {
        add_error("misc_registration_deadline");
        alert("Please set a valid registration deadline");
    } else if (
        !set_deadline || 
        Date.parse(set_deadline) < Date.now() || 
        Date.parse(set_deadline) + set_deadline_time < Date.parse(reg_deadline) + reg_deadline_time + hour
      ) {
        add_error("misc_settlement_deadline");
        alert("Please set a valid settlement deadline");
    } else if (!number_of_options || !pari_mutuel_table_element) {
        add_error("number_of_options");
        alert("Please select at least 2 pari-mutuel options");        
    } else if (!min_wager || isNaN(min_wager)) {
      add_error("misc_min_wager");
      alert("Please enter a valid minimum wager amount");
    } else {
      // Get values from pari-mutuel table
      var table_rows = pari_mutuel_table.firstChild.childNodes[0].children.length;
      var table_error = false;
      
      for (i=1; i<table_rows;i++) {
        var desc = pari_mutuel_table.firstChild.childNodes[0].children[i].childNodes[1].childNodes[0].value;
        if (!desc || desc.length < 2) {
          table_error = true;
        } else {
          table_values.push(desc);
        }
      }

      if (table_error) {
        alert("Please enter valid pari-mutuel option descriptions");
      } else {
        // Make the JSON call now that all validation has passed
        var registration_deadline = dateconv_date_start_time(Date.parse(reg_deadline));
        var settlement_deadline = dateconv_date_start_time(Date.parse(set_deadline));
        registration_deadline += reg_deadline_time;
        settlement_deadline += set_deadline_time;

        var json_obj = {
          title,
          description,
          registration_deadline,
          settlement_deadline,
          min_wager,
          settlement_type,
          pari_mutuel_options: table_values,
          private
        };

        var json = JSON.stringify(json_obj);

        // api call

      }
    }
  }
}