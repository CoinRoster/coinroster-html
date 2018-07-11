var contest_type_selector = id("contest_type_selector");
var roster_sport_selector = id("roster_sport_selector");

contest_type_selector.onchange = function()
  {
    var roster_fields = document.getElementsByClassName("roster_fields");
    var prop_fields = document.getElementsByClassName("prop_fields");
    var misc_fields = document.getElementsByClassName("misc_fields");

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
