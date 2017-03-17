    (function()
        {
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

        if (pathname.indexOf("/admin/") !== -1) 
            {
            return init(); // avoid all mobile stuff below if admin
            }

        tab_id = "ssi_header_" + target;
        if (id(tab_id) !== null) id(tab_id).className = "ssi_header_active_tab";

        var 

        mobile_nav = document.getElementById("ssi_mobile_nav"),
        ssi_mobile_nav_button = document.getElementById("ssi_mobile_nav_button"),
        ssi_mobile_nav_placeholder = id("ssi_mobile_nav_placeholder"),
        ssi_mobile_shade = id("ssi_mobile_shade"),
        ssi_mobile_nav_placeholder_storage,
        mobile_nav_state = "hidden";

        function toggle_mobile_menu()
            {
            if (mobile_nav_state === "hidden")
                {
                show(ssi_mobile_shade);
                show(mobile_nav);
                mobile_nav.style.display = "block";
                ssi_mobile_nav_placeholder_storage = ssi_mobile_nav_placeholder.innerHTML;
                ssi_mobile_nav_placeholder.innerHTML = "Close Menu";
                mobile_nav_state = "visible";
                }
            else 
                {
                ssi_mobile_nav_placeholder.innerHTML = ssi_mobile_nav_placeholder_storage;
                hide(mobile_nav);
                hide(ssi_mobile_shade);
                mobile_nav_state = "hidden";
                }
            }

        ssi_mobile_nav_button.onclick = function()
            {
            toggle_mobile_menu();
            };

        ssi_mobile_shade.onclick = function()
            {
            toggle_mobile_menu();
            };

        if (typeof window.nav_text !== "undefined") ssi_mobile_nav_placeholder.innerHTML = window.nav_text;
        else ssi_mobile_nav_placeholder.innerHTML = "Menu";
                
        if (window.session)
            {
            var available_balance = window.session.available_balance;
            if (available_balance !== 0)
                {
                id("balance_bar_available_balance").innerHTML = toBTC(available_balance) + " BTC";
                id("balance_bar_fiat_balance").innerHTML = toFiat(available_balance);
                }
            else // user has 0 balance -> prompt for deposit
                {
                hide("fiat_balance_cell");
                show("deposit_cell", "table-cell");
                id("balance_bar_available_balance").innerHTML = "0.00";
                id("balance_bar_available_balance").className = "orange";
                }
            }
            
        init();
        })();