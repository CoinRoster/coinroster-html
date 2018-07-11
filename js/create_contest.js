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
          show(roster_fields);
          hide(prop_fields);
          hide(misc_fields);
          break;
        case "Prop":
          show(prop_fields);
          hide(roster_fields);
          hide(misc_fields);
          break;
        case "Misc":
          show(misc_fields);
          hide(roster_fields);
          hide(prop_fields);
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
        show(basketball_scoring);
        hide(golf_scoring);
        hide(baseball_scoring);
        break;
      case "Golf":
        show(golf_scoring);
        hide(basketball_scoring);
        hide(baseball_scoring);
        break;
      case "Baseball":
        show(baseball_scoring);
        hide(basketball_scoring);
        hide(golf_scoring);
        break;
    }
 };
