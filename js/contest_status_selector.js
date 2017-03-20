        
    function update_contest_status_selector(contest_status)
        {
        var 
        
        contest_status_selectors = document.getElementsByClassName("contest_status_selector_button"),
        selector_to_activate = contest_status - 1;

        for (var i=0; i<3; i++)
            {
            if (i === selector_to_activate) 
                {
                var color = "";
                switch (i)
                    {
                    case 0 : // open
                        color = "green";
                        break;
                    case 1 : // in play
                        color = "orange";
                        break;
                    case 2 : // settled
                        color = "white";
                        break;
                    }
                contest_status_selectors[i].className = "contest_status_selector_button contest_status_selected " + color;
                }
            else contest_status_selectors[i].className = "contest_status_selector_button steel"; 
            }
        }
    
    function switch_contest_status(contest_status)
        {
        init(contest_status);
        }