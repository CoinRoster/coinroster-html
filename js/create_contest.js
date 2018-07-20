/* Contest & Sport Selectors */
var contest_type_selector = id("contest_type_selector");
var roster_sport_selector = id("roster_sport_selector");
var roster_multistat_overall = id("roster_multistat_overall");
var roster_settlement_type = id("roster_settlement_type");
var prop_sport_selector = id("prop_sport_selector");
var prop_basketball_type_selector = id("prop_basketball_type");
var prop_golf_type_selector = id("prop_golf_type");
var prop_baseball_type_selector = id("prop_baseball_type");
var prop_golf_multistat_overall = id("prop_golf_multistat_overall");

/*  Checkboxes*/
var roster_basketball_points_checkbox = id("roster_basketball_points_checkbox");
var roster_basketball_rebounds_checkbox = id("roster_basketball_rebounds_checkbox");
var roster_basketball_assists_checkbox = id("roster_basketball_assists_checkbox");
var roster_basketball_steals_checkbox = id("roster_basketball_steals_checkbox");
var roster_basketball_blocks_checkbox = id("roster_basketball_blocks_checkbox");
var roster_basketball_turnovers_checkbox = id("roster_basketball_turnovers_checkbox");
var roster_golf_eagles_checkbox = id("roster_golf_eagles_checkbox");
var roster_golf_birdies_checkbox = id("roster_golf_birdies_checkbox");
var roster_golf_pars_checkbox = id("roster_golf_pars_checkbox");
var roster_golf_bogeys_checkbox = id("roster_golf_bogeys_checkbox");
var roster_golf_double_bogeys = id("roster_golf_double_bogeys");

contest_type_selector.onchange = function()
  {
    var roster_fields = document.getElementsByClassName("roster_fields");
    var prop_fields = document.getElementsByClassName("prop_fields");
    var misc_fields = document.getElementsByClassName("misc_fields");

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

  // Prop resets, so that users can go back and pick a different sport without breaking the form
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

   switch (selectorHTML(prop_basketball_type_selector))
    {
      case "Match Play":
        show(prop_basketball_match_play[0]);
        hide(prop_basketball_over_under[0]);
        break;
      case "Over/Under":
        show(prop_basketball_over_under[0]);
        hide(prop_basketball_match_play[0]);
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

prop_golf_multistat_overall.onchange = function()
 {
   var prop_golf_stats_multistat = document.getElementsByClassName("prop_golf_stats_multistat");

   switch (selectorHTML(prop_golf_multistat_overall))
    {
      case "Multi-stat":
        show(prop_golf_stats_multistat[0]);
        break;
      case "Overall":
        hide(prop_golf_stats_multistat[0]);
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

roster_basketball_points_checkbox.onchange = function()
 {
  var checked = roster_basketball_points_checkbox.checked;
  var points = document.getElementsByClassName("roster_basketball_points");
  var points_input = document.getElementById("roster_basketball_points");



  var checkboxes = $("*[class$='_checkbox']")

  var i;
  for (1 = 0; i < checkboxes.length; i++) {
    console.log(checkboxes[i]);
  }

  
  
  if (checked) {
    points[0].classList.remove("dimmed");
    points_input.disabled = false; 
  } else {
    points[0].classList.add("dimmed");
    points_input.disabled = true;
    points_input.value = "";
  }
 };

 roster_basketball_rebounds_checkbox.onchange = function()
  {
    var checked = roster_basketball_rebounds_checkbox.checked;
    var rebounds = document.getElementsByClassName("roster_basketball_rebounds");
    var rebounds_input = document.getElementById("roster_basketball_rebounds");

    if (checked) {
      rebounds[0].classList.remove("dimmed");
      rebounds_input.disabled = false;
    } else {
      rebounds[0].classList.add("dimmed");
      rebounds_input.disabled = true;
      rebounds_input.value = "";
    }
  };

roster_basketball_assists_checkbox.onchange = function()
 {
  var checked = roster_basketball_assists_checkbox.checked;
  var assists = document.getElementsByClassName("roster_basketball_assists");
  var assists_input = document.getElementById("roster_basketball_assists");

  if (checked) {
    assists[0].classList.remove("dimmed");
    assists_input.disabled = false;
  } else {
    assists[0].classList.add("dimmed");
    assists_input.disabled = true;
    assists_input.value = "";
  }
 };

roster_basketball_steals_checkbox.onchange = function()
 {
  var checked = roster_basketball_steals_checkbox.checked;
  var steals = document.getElementsByClassName("roster_basketball_steals");
  var steals_input = document.getElementById("roster_basketball_steals");

  if (checked) {
    steals[0].classList.remove("dimmed");
    steals_input.disabled = false;
  } else {
    steals[0].classList.add("dimmed");
    steals_input.disabled = true;
    steals_input.value = "";
  }
 };

roster_basketball_blocks_checkbox.onchange = function()
 {
  var checked = roster_basketball_blocks_checkbox.checked;
  var blocks = document.getElementsByClassName("roster_basketball_blocks");
  var blocks_input = document.getElementById("roster_basketball_blocks");

  if (checked) {
    blocks[0].classList.remove("dimmed");
    blocks_input.disabled = false;
  } else {
    blocks[0].classList.add("dimmed");
    blocks_input.disabled = true;
    blocks_input.value = "";
  }
 };

roster_basketball_turnovers_checkbox.onchange = function()
 {
  var checked = roster_basketball_turnovers_checkbox.checked;
  var turnovers = document.getElementsByClassName("roster_basketball_turnovers");
  var turnovers_input = document.getElementById("roster_basketball_turnovers");

  if (checked) {
    turnovers[0].classList.remove("dimmed");
    turnovers_input.disabled = false;
  } else {
    turnovers[0].classList.add("dimmed");
    turnovers_input.disabled = true;
    turnovers_input.value = "";
  }
 };

roster_golf_eagles_checkbox.onchange = function()
 {

 }

 roster_golf_birdies_checkbox.onchange = function()
  {

  }

roster_golf_pars_checkbox.onchange = function()
 {

 }

roster_golf_bogeys_checkbox.onchange = function()
 {

 }

roster_golf_double_bogeys.onchange = function()
 {

 }
