    
    function update_contest_status_selector()
        {
        var 
        
        contest_status_selectors = document.getElementsByClassName("contest_status_selector_button"),
        selector_to_activate = window.session.contest_status - 1;

        for (var i=0; i<3; i++)
            {
            if (i === selector_to_activate) contest_status_selectors[i].className += " contest_status_selected";
            else contest_status_selectors[i].className = "contest_status_selector_button"; 
            }
        }
    

    function switch_contest_status(contest_status)
        {
        window.session.contest_status = contest_status;
        init();
        }