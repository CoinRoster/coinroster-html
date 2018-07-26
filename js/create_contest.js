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

    switch (selectorHTML(contest_type_selector))
      {
        case "Roster":
          show(roster_fields[0]);
          hide(prop_fields[0]);
          hide(misc_fields[0]);
          break;
        case "Prop":
          show(prop_fields[0]);
          hide(roster_fields[0]);
          hide(misc_fields[0]);
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

  reset_elements();

  document.getElementById("prop_basketball_type").selectedIndex = "0";
  document.getElementById("prop_golf_type").selectedIndex = "0";
  document.getElementById("prop_baseball_type").selectedIndex = "0";

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

   function select_player(player) 
    {
        selected_players.push(player);
        populate_match_play_players();
    }

    function populate_match_play_players()
      {
        var player_select = document.getElementById("prop_basketball_match_player");

        for (i = 0;i < selected_players.length; i++) {
          players.filter(player => player.player_id !== selected_players[i].player_id);
        }      

        console.log(players);
        console.log("======");
        console.log(selected_players);

        // var players_to_populate = 0;

        /* check if anyone is in selected players */

        players.forEach((player) => {
          var option = document.createElement("option");
          option.text = player.name;
          option.value = player.id;
          option.onclick = function() {
            select_player(player);
          }
          player_select.add(option);
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

   switch (selectorHTML(prop_golf_type_selector))
    {
      case "Make the Cut":
        show(prop_golf_make_the_cut[0]);
        hide(prop_golf_over_under[0]);
        hide(prop_golf_match_play[0]);
        hide(prop_golf_number_of_shots[0]);
        break;
      case "Over/Under":
        show(prop_golf_over_under[0]);
        hide(prop_golf_make_the_cut[0]);
        hide(prop_golf_match_play[0]);
        hide(prop_golf_number_of_shots[0]);
        break;
      case "Match Play":
        show(prop_golf_match_play[0]);
        hide(prop_golf_make_the_cut[0]);
        hide(prop_golf_over_under[0]);
        hide(prop_golf_number_of_shots[0]);
        break;
      case "Number of Shots":
        show(prop_golf_number_of_shots[0]);
        hide(prop_golf_make_the_cut[0]);
        hide(prop_golf_over_under[0]);
        hide(prop_golf_match_play[0]);
        break;
    }
 };

prop_golf_match_multistat_overall.onchange = function()
 {
   var prop_golf_stats_multistat = document.getElementsByClassName("prop_golf_stats_multistat");
    var prop_golf_match_score_to_par = document.getElementsByClassName("prop_golf_match_score_to_par");

   switch (selectorHTML(prop_golf_multistat_overall))
    {
      case "Multi-stat":
        show(prop_golf_stats_multistat[0]);
        hide(prop_golf_match_score_to_par[0]);
        break;
      case "Score to Par":
        show(prop_golf_match_score_to_par[0]);
        hide(prop_golf_stats_multistat[0]);
        break;
    }
 };

prop_golf_over_multistat_overall.onchange = function()
 {
    var prop_golf_over_stats_multistat = document.getElementsByClassName("prop_golf_over_stats_multistat");
    var prop_golf_over_score_to_par = document.getElementsByClassName("prop_golf_over_score_to_par");

    switch (selectorHTML(prop_golf_over_multistat_overall))
     {
        case "Multi-stat":
          show(prop_golf_over_stats_multistat[0]);
          hide(prop_golf_over_score_to_par[0]);
          break;
        case "Score to Par":
          show(prop_golf_over_score_to_par[0]);
          hide(prop_golf_over_stats_multistat[0]);
          break;
     }
 };

 prop_baseball_type_selector.onchange = function()
  {
    var prop_baseball_match_play = document.getElementsByClassName("prop_baseball_match_play");
    var prop_baseball_over_under = document.getElementsByClassName("prop_baseball_over_under");

    switch (selectorHTML(prop_baseball_type_selector))
      {
        case "Match Play":
          show(prop_baseball_match_play[0]);
          hide(prop_baseball_over_under[0]);
          break;
        case "Over/Under":
          show(prop_baseball_over_under[0]);
          hide(prop_baseball_match_play[0]);
          break;
      }
  };

/* How to pass values into JSON? Where to check if it all adds up to 100%? */
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
