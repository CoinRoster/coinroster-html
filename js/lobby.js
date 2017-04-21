
    // supporting functions for contests, generally
    
    function bind_payout_window(element, settlement_type, pay_table)
        {
        element.onclick = (function(settlement_type, raw_pay_table)
            {
            return function()
                {
                var payout_info = "<div style=\"font-size:14px;text-align:left!important\">";
                switch (settlement_type)
                    {
                    case "HEADS-UP" :
                        payout_info += "This is a heads-up pool. The winning entry will double up.";
                        break;
                    case "DOUBLE-UP" :
                        payout_info += "This is a double-up pool. The top half of entries will double up.";
                        break;
                    case "JACKPOT" :
                        payout_info += "This is a jackpot pool with the following pay table:";
                        payout_info += "<br/>";
                        payout_info += "<br/>";
                        payout_info += "<table class=\"pay_table\">";

                        pay_table = JSON.parse(raw_pay_table);

                        for (var i=0; i<pay_table.length; i++)
                            {
                            var pay_table_item = pay_table[i],

                            rank = pay_table_item.rank,
                            payout = pay_table_item.payout;

                            payout_info += "<tr><td>" + rank + "<sup>" + get_ordinal_suffix(rank) + "</sup>" + "</td><td>" + multiply(payout, 100) + "%</td></tr>";
                            }

                        payout_info += "</table>";
                        payout_info += "</div>";
                        break;
                    case "PARI-MUTUEL" :
                        payout_info += "This is a pari-mutuel pool. The entire pot will be distributed pro-rata to those who choose the correct outcome.";
                        break;
                    }
                show_simple_modal(payout_info, "good", null);
                };
            })(settlement_type, pay_table);
        }

    function bind_progressive_payout_window(element, payout_info)
        {
        element.onclick = (function(payout_info)
            {
            return function()
                {
                var payout_info_div = [
                    "<div style=\"font-size:14px;text-align:left!important\">",
                    "Progressive Jackpot Details:<br/><br/>",
                    payout_info,
                    "</div>"
                ].join("");
                show_simple_modal(payout_info_div, "good", null);
                };
            })(payout_info);
        }

    function settlement_type_string(settlement_type)
        {
        switch (settlement_type)
            {
            case "JACKPOT" : return "Jackpot";
            case "HEADS-UP" : return "Heads up";
            case "DOUBLE-UP" : return "Double-up";
            case "PARI-MUTUEL" : return "Pari-mutuel";
            }
        }

    function contest_status_string(contest_status)
        {
        switch (contest_status)
            {
            case 1 : return "Open";
            case 2 : return "In play";
            case 3 : return "Settled";
            case 4 : return "Under-subscribed";
            case 5 : return "Cancelled";
            }
        }
        
    function get_registration_deadline_string(registration_date_ms)
        {
        var

        registration_deadline_date = dateconv_ms_to_string(registration_date_ms),
        registration_deadline_time = dateconv_ms_to_time(registration_date_ms);
        return registration_deadline_date + " at " + registration_deadline_time;
        }
                
    function redirect_to_contest(contest_id)
        {
        location = "/contest.html?id=" + contest_id;
        }  
    function redirect_to_leaderboard(contest_id)
        {
        location = "/rosters.html?contest_id=" + contest_id;
        }
    function redirect_to_my_entries(contest_id)
        {
        location = "/contests/entries.html?contest_id=" + contest_id;
        }
        
    function bind_registration_countdown(element, registration_deadline)
        {
        if (typeof element === "string") element = id(element);
        
        element.style.width = "140px";
        element.style.display = "inline-block";
        
        setInterval(function()
            {
            update_countdown();
            }, 1000);

        update_countdown();
        
        function update_countdown()
            {
            var countdown_string = "";
 
            if (new Date() > registration_deadline) countdown_string = "Contest is in play!";
            else
                {
                var time_remaining = get_time_remaining(registration_deadline),
                days = time_remaining.days,
                hours = time_remaining.hours,
                mins = time_remaining.minutes,
                secs = time_remaining.seconds;

                var

                show_hours = false,
                show_mins = false,
                show_secs = false;

                if (days > 0) 
                    {
                    countdown_string = days + "d ";
                    show_hours = true;
                    show_mins = true;
                    show_secs = true;
                    }
                else if (hours > 0) 
                    {
                    show_hours = true;
                    show_mins = true;
                    show_secs = true;
                    }
                else if (mins > 0) 
                    {
                    show_mins = true;
                    show_secs = true;
                    }
                else show_secs = true;

                if (show_hours)
                    {
                    if (hours < 10) hours = "0" + hours;
                    countdown_string += hours + "h ";
                    }
                if (show_mins)
                    {
                    if (mins < 10) mins = "0" + mins;
                    countdown_string += mins + "m ";
                    }
                if (show_secs)
                    {
                    if (secs < 10) secs = "0" + secs;
                    countdown_string += secs + "s ";
                    }
                }

            element.innerHTML = countdown_string;
            }
        }
        
/*----------------------------------------------------------------------*/

    // supporting functions for roster contest
    
    function add_player(player_id)
        {
        var row = id("player_" + player_id),
                
        name = row.name,
        price = row.price,
        count = row.count,
        
        salary_cap = fromCurrency(id("salary_cap").innerHTML),
        remaining_players = id("remaining_players").innerHTML,
        
        drafted,
        max_players = 999,
        show_max_players = false;

        if (remaining_players.indexOf("/") !== -1)
            {
            remaining_players = remaining_players.split("/");
            drafted = remaining_players[0];
            max_players = remaining_players[1];
            show_max_players = true;
            }
        else drafted = remaining_players;

        if (max_players > 0 && drafted === max_players) show_simple_modal("Your roster is full", "bad", null);
        else if (price <= salary_cap)
            {
            id("salary_cap").innerHTML = "$" + commas(subtract(salary_cap, price));
            if (show_max_players) id("remaining_players").innerHTML = ++drafted + "/" + max_players;
            else id("remaining_players").innerHTML = ++drafted;
            id("player_table").deleteRow(row.rowIndex);
            insert_player_row("roster_table", player_id, name, price, count);
            }
        else show_simple_modal("You cannot afford to draft " + name, "bad", null);
        }
        
    function remove_player(player_id)
        {
        var row = id("player_" + player_id),
                
        name = row.name,
        price = row.price,
        count = row.count,
        
        salary_cap = fromCurrency(id("salary_cap").innerHTML),
        remaining_players = id("remaining_players").innerHTML;
        
        if (remaining_players.indexOf("/") !== -1)
            {
            remaining_players = remaining_players.split("/");
            
            var
            
            drafted = remaining_players[0],
            max_players = remaining_players[1];
    
            id("remaining_players").innerHTML = --drafted + "/" + max_players;
            }
        else id("remaining_players").innerHTML = --remaining_players;
        
        id("salary_cap").innerHTML = "$" + commas(add(salary_cap, price));
        id("roster_table").deleteRow(row.rowIndex);
        
        insert_player_row("player_table", player_id, name, price, count);
        }
        
    function sort_player_tables()
        {
        var 
        
        player_table = id("player_table"),
        roster_table = id("roster_table"),
        
        player_table_rows = player_table.rows,
        roster_table_rows = roster_table.rows,
        
        player_table_data = [],
        roster_table_data = [];

        for (var i=0, limit = player_table_rows.length; i<limit; i++) 
            {
            var row = player_table_rows[i];
            player_table_data.push(
                {
                id: row.id,
                name: row.name,
                price: row.price,
                count: row.count
                });
            }
        for (var i=0, limit = roster_table_rows.length; i<limit; i++) 
            {
            var row = roster_table_rows[i];
            roster_table_data.push(
                {
                id: row.id,
                name: row.name,
                price: row.price,
                count: row.count
                });
            }
        
        player_table.innerHTML = "";
        roster_table.innerHTML = "";
        
        for (var i=0, limit = player_table_data.length; i<limit; i++) 
            {
            var player = player_table_data[i];
            insert_player_row("player_table", player.id, player.name, player.price, player.count);
            }
            
        for (var i=0, limit = roster_table_data.length; i<limit; i++) 
            {
            var player = roster_table_data[i];
            insert_player_row("roster_table", player.id, player.name, player.price, player.count);
            }
        }
        
    function insert_player_row(table_id, player_id, name, price, count)
        {
        var 
        
        table = id(table_id),
        number_of_rows = table.rows.length,
        row_index = -1;

        if (number_of_rows !== 0)
            {
            for (var i=0; i<number_of_rows; i++)
                {
                var row = table.rows[i];
                if (window.player_sort_scheme === "price")
                    {
                    if (price === row.price && name < row.name)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    if (price > row.price)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    }
                else if (window.player_sort_scheme === "name")
                    {
                    if (name < row.name)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    }
                else if (window.player_sort_scheme === "count")
                    {
                    if (count === row.count && name < row.name)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    if (count > row.count)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    }
                }
            }
            
        var row_data = [
            "<span class=\"\">" + name + "</span>",
            "<span class=\"green\">$" + commas(price) + "</span>"
        ];
        
        if (typeof count !== "undefined") 
            {
            if (count === 0) count = "";
            row_data.push("<span class=\"draft_count_color\">" + count + "</span>");
            }
        
        var row = new_row(table, row_index, row_data);
        
        row[0].id = "player_" + player_id;
        row[0].player_id = player_id,
        row[0].name = name;
        row[0].price = price;
        row[0].count = count;

        row[0].onmouseenter = function()
            {
            row[0].style.background = "rgb(100,104,108)";
            };
        row[0].onmouseleave = function()
            {
            row[0].style.background = "rgb(80,84,88)";
            };
        if (table_id === "player_table") 
            {
            row[0].onclick = (function(player_id)
                {
                return function()
                    {
                    add_player(player_id);
                    }
                })(player_id);
            }
        else 
            {
            row[0].onclick = (function(player_id)
                {
                return function()
                    {
                    remove_player(player_id);
                    }
                })(player_id);
            }
            
        row[2].width = "1";
        row[2].style.textAlign = "right";
        if (row[3])
            {
            row[3].width = "1";
            row[3].style.textAlign = "right";
            }   
        }
        
    function get_valid_roster()
        {
        var remaining_players = id("remaining_players").innerHTML;
        
        if (remaining_players.indexOf("/") !== -1)
            {
            remaining_players = remaining_players.split("/");
            
            var
            
            drafted = remaining_players[0],
            max_players = remaining_players[1];
    
            if (drafted !== max_players) return show_simple_modal("You must draft " + max_players + " players", "bad", null);
            }
            
        var 
        
        rows = id("roster_table").rows,
        number_of_players = rows.length,
        roster = [];

        if (number_of_players === 0) return show_simple_modal("You must draft at least one player", "bad", null);
        
        for (var i=0; i<number_of_players; i++)
            {
            var row = rows[i],
                    
            player_id = row.player_id,
            //name = row.name,
            price = row.price;
    
            roster.push({
                id: player_id,
                //name: name,
                price: price
            });
            }
            
        return roster;
        }
                
/*----------------------------------------------------------------------*/

    // supporting functions for pari-mutuel contest
    
    function get_implied_odds(wager_grand_total, option_item, force_full_precision)
        {
        var 
        
        precision = 2,
        option_wager_total = option_item.wager_total,
        implied_odds = 0;

        if (force_full_precision) precision = 8;
                                
        if (option_wager_total !== 0) implied_odds = divide(wager_grand_total, option_wager_total, precision);
        
        return implied_odds;
        }