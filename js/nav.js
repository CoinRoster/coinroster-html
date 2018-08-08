    (function()
        {
        if (!id("ssi_header")) return;
        var pathname = window.location.pathname;
                
        if (pathname === "/") target = "lobby";
        else
            {
            var

            url = pathname.split("/"),
            target = url[url.length - 1],
            index_of_dot = target.indexOf(".");

            if (index_of_dot > -1) target = target.substring(0, index_of_dot);

            if (target === "") target = url[url.length - 2];
            }

        if (pathname.indexOf("/admin/") !== -1) return init(); // avoid all mobile stuff below if admin
        else if (pathname.indexOf("/contests/") !== -1) target = "contests";
        else if (pathname.indexOf("/account/contest.html") !== -1) target = "create";
        else if (pathname.indexOf("/account/") !== -1) target = "account";

        tab_id = "ssi_header_" + target;
        if (id(tab_id) !== null) id(tab_id).className = "ssi_header_active_tab";

        var 

        mobile_nav = id("ssi_mobile_nav"),
        ssi_mobile_nav_bar = id("ssi_mobile_nav_bar"),
        ssi_mobile_nav_icon = id("ssi_mobile_nav_icon"),
        ssi_mobile_shade = id("ssi_mobile_shade"),
        mobile_nav_state = "hidden";
        
        if (window.nav_text)
            {
            hide("ssi_mobile_nav_logo");
            show("ssi_mobile_nav_placeholder");
            id("ssi_mobile_nav_placeholder").innerHTML = window.nav_text;
            }

        function toggle_mobile_menu()
            {
            if (mobile_nav_state === "hidden")
                {
                show(ssi_mobile_shade);
                show(mobile_nav);
                ssi_mobile_nav_icon.className = "menu_open";
                mobile_nav.style.display = "block";
                mobile_nav_state = "visible";
                }
            else 
                {
                hide(mobile_nav);
                hide(ssi_mobile_shade);
                ssi_mobile_nav_icon.className = "menu_closed";
                mobile_nav_state = "hidden";
                }
            }

        ssi_mobile_nav_bar.onclick = function()
            {
            toggle_mobile_menu();
            };

        ssi_mobile_shade.onclick = function()
            {
            toggle_mobile_menu();
            };
 
        if (window.session)
            {
            var available_balance = window.session.available_balance;
            if (available_balance !== 0)
                {
                id("balance_bar_available_balance").innerHTML = toBTC(available_balance) + " BTC";
                id("balance_bar_fiat_balance").innerHTML = toFiat(available_balance, true);
                }
            else // user has 0 balance -> prompt for deposit
                {
                hide("fiat_balance_cell");
                show("deposit_cell", "table-cell");
                id("balance_bar_available_balance").innerHTML = "0.00";
                id("balance_bar_available_balance").className = "red_orange";
                }
            }
            
        init();
        })();