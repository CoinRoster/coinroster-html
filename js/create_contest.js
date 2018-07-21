/* Can be refactored to a loop.. _checkbox suffix */
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

/*  Checkboxes */
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
var roster_golf_double_bogeys_checkbox = id("roster_golf_double_bogeys_checkbox");

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
