
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
                    default :
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
            default : return "Pari-mutuel";
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
                player_id: row.player_id,
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
                player_id: row.player_id,
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
            insert_player_row("player_table", player.player_id, player.name, player.price, player.count);
            }
            
        for (var i=0, limit = roster_table_data.length; i<limit; i++) 
            {
            var player = roster_table_data[i];
            insert_player_row("roster_table", player.player_id, player.name, player.price, player.count);
            }
        }
        
    function insert_player_row(table_id, player_id, name, price, count)
        {
        var 
        
        table = id(table_id),
        number_of_rows = table.rows.length,
        row_index = -1,
        sort_scheme = window.player_sort_scheme;

        if (number_of_rows !== 0)
            {
            for (var i=0; i<number_of_rows; i++)
                {
                var row = table.rows[i];
                if (sort_scheme === "price")
                    {
                    if (price === row.price && name < row.name)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    if (+price > +row.price)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    }
                else if (sort_scheme === "name")
                    {
                    if (name < row.name)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    }
                else if (sort_scheme === "count")
                    {
                    if (count === row.count && name < row.name)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    if (+count > +row.count)
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
            
        row_data.push("<span class=\"get_info\"><i class=\"fas fa-arrow-circle-right\"></i></span>");
        
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
        row[3].width = "1";
        if (row[4])
            {
            row[4].width = "1";
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

    // supporting functions for pari-mutuel contest table
    
    function insert_pari_mutuel_table_header(table)
        {
        var main_header = "";
        
        if (window.contest_status === 1) main_header = "<ul><li>Outcome</li><li style='float:right'>Enter wager</li></ul>";
        else main_header = "Outcome";
    
        var header = new_row(table, -1, [
            main_header,
            "<ul><li class='li_left'>Wagers</li><li class='li_right'>Odds</li></ul>"
        ]);
        
        header[1].style.textAlign = "left";
        header[2].style.textAlign = "left";
        }
    
    function insert_option_row(table, option_id, description, wager_total, wager_value, implied_odds, outcome)
        {
        var
        
        contest_status = window.contest_status,
        sort_scheme = window.option_sort_scheme,
        
        number_of_rows = table.rows.length,
        row_index = -1;

        implied_odds = +implied_odds;
        option_id = +option_id;
        
        if (number_of_rows !== 0)
            {
            for (var i=1; i<number_of_rows; i++)
                {
                var row = table.rows[i];
                if (sort_scheme === "odds")
                    {
                    if (implied_odds === +row.implied_odds && description < row.description)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    if (implied_odds < +row.implied_odds)
                        {
                        if (implied_odds === 0) continue;
                        row_index = row.rowIndex;
                        break;
                        }
                    else if (implied_odds === 0 && description < row.description)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    }
                else if (sort_scheme === "order")
                    {
                    if (option_id < +row.option_id)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    }
                else if (sort_scheme === "text")
                    {
                    if (description < row.description)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    }
                }
            }  
            
        var

        wager_input = "<input id='wager_input_" + option_id + "' btc-input='true' class='light_on_dark_input right_align green' placeholder='Enter wager' style='width:100px'/>",
        mark_outcome = (contest_status === 3 && outcome === 1) ? "<img src='/img/star.png' width='12' height='12'/>&nbsp;&nbsp;" : "",
        first_cell_content = "";

        if (contest_status === 1) first_cell_content = "<ul><li>" + description + "</li><li class='wager_input'>" + wager_input + " BTC</li></ul>";
        else first_cell_content = "<div class='pari_mutuel_preserve_padding'>" + mark_outcome + description + "</div>";

        var row = new_row(table, row_index, [
            first_cell_content,
            "<ul class='wagers_and_odds'><li class='li_left'>" + "<div class='field_label auto_width'>Wagers:</div>" + toBTC(wager_total) + " BTC" + getFiatDisplay(wager_total, "allow_inline") + "</li><li class='li_right'>" + "<div class='field_label auto_width'>Odds:</div>" + getOddsDisplay(implied_odds) + "</li></ul>"
        ]);

        row[0].option_id = option_id;
        row[0].description = description;
        row[0].wager_total = wager_total;
        row[0].wager_value = wager_value; // gets updated in update_wager_input() below
        row[0].implied_odds = implied_odds;
        row[0].outcome = outcome;
                
        row[1].style.textAlign = "left";
        row[2].style.textAlign = "left";
        
        if (wager_value > 0) update_wager_input(id("wager_input_" + option_id), wager_value);

        function update_wager_input(input, wager_value)
            {
            var 
            
            parent = input.parentNode,
            row = parent.parentNode.parentNode.parentNode;
    
            if (parent.querySelector(".fiat_display")) destroy(parent.lastChild);
            
            if (wager_value === "") 
                {
                input.value = "";
                return false;
                }
                
            row.wager_value = wager_value;
            input.value = toBTC(wager_value, true);
            
            parent.appendChild(getFiatDisplay(wager_value, "never_inline", true));
            return true;
            }

        if (contest_status === 1) bind_btc_input(id("wager_input_" + option_id), function(input)
            {
            var wager_not_null = update_wager_input(input, input.value);
            if (wager_not_null && input.value < window.cost_per_entry)
                {
                show_simple_modal("Wager cannot be less than " + window.cost_per_entry + " BTC", "bad", function()
                    {
                    update_wager_input(input, window.cost_per_entry);
                    update_submit_button();
                    });
                }
            else update_submit_button();
            });
        }
        
    function sort_option_table()
        {
        var 
        
        table = id("pari_mutuel_table"),
        
        pari_mutuel_rows = table.rows,
        
        pari_mutuel_data = [];

        for (var i=1, limit = pari_mutuel_rows.length; i<limit; i++) 
            {
            var row = pari_mutuel_rows[i];
            pari_mutuel_data.push(
                {
                option_id: row.option_id,
                description: row.description,
                wager_total: row.wager_total,
                wager_value: row.wager_value,
                implied_odds: row.implied_odds,
                outcome: row.outcome
                });
            }
            
        pari_mutuel_data.sort(function(a, b) // forces 0 odds to the bottom in the odds sort
            {
            return b.wager_total - a.wager_total;
            });
            
        table.innerHTML = "";
        
        insert_pari_mutuel_table_header(table);
        
        for (var i=0, limit = pari_mutuel_data.length; i<limit; i++) 
            {
            var option = pari_mutuel_data[i];
            insert_option_row(table, option.option_id, option.description, option.wager_total, option.wager_value, option.implied_odds, option.outcome);
            }
        }
        
/*----------------------------------------------------------------------*/

    // supporting functions for pari-mutuel table in My Entries
    
    function insert_option_report_table_header(table)
        {
        var header = new_row(table, -1, [
            "Outcome",
            "Odds",
            "My wagers",
            "Payout",
            "Scenario P/L"
        ]);

        header[1].style.textAlign = "left";
        }
    
    function insert_option_report_row(table, option_id, description, user_wager, implied_odds, implied_payout, scenario_PL, outcome)
        {
        var
        
        contest_status = window.contest_status,
        sort_scheme = window.option_sort_scheme,
        
        number_of_rows = table.rows.length,
        row_index = -1;

        implied_odds = +implied_odds;
        option_id = +option_id;
        
        if (number_of_rows !== 0)
            {
            for (var i=1; i<number_of_rows; i++)
                {
                var row = table.rows[i];
                if (sort_scheme === "odds")
                    {
                    if (implied_odds === +row.implied_odds && description < row.description)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    if (implied_odds < +row.implied_odds)
                        {
                        if (implied_odds === 0) continue;
                        row_index = row.rowIndex;
                        break;
                        }
                    else if (implied_odds === 0 && option_id < row.option_id)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    }
                else if (sort_scheme === "PL")
                    {
                    if (scenario_PL === +row.scenario_PL && description < row.description)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    if (scenario_PL > +row.scenario_PL)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    }
                else if (sort_scheme === "order")
                    {
                    if (option_id < +row.option_id)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    }
                else if (sort_scheme === "text")
                    {
                    if (description < row.description)
                        {
                        row_index = row.rowIndex;
                        break;
                        }
                    }
                }
            }  
            
        var 
        
        mark_outcome = "",
        PNL_class = "orange_actual";

        if (user_wager > 0) // user has a wager
            {
            if (scenario_PL > 0) PNL_class = "green"; // override if profit
            else if (scenario_PL === 0) PNL_class = "white";
            }
        
        if (window.contest_status === 3)
            {
            show("payout_container");
            show("PNL_container");

            if (outcome === 1)
                {
                id("exposure_label").innerHTML = "Wagered:";
                id("payout_value").innerHTML = toBTC(implied_payout) + " BTC";
                id("payout_value").style.color = "rgb(230,230,230)";
                id("payout_value_fiat").innerHTML = getFiatDisplay(implied_payout, "soft_inline");
                id("PNL_value").innerHTML = toBTC(scenario_PL, false, true) + " BTC";
                id("PNL_value").className = PNL_class;
                id("PNL_value_fiat").innerHTML = getFiatDisplay(scenario_PL, "soft_inline");

                mark_outcome = "<img src='/img/star.png' width='12' height='12'/>&nbsp;&nbsp;";
                //row_index = 1; // causes winning outcome to float to the top
                }
            }

        var 

        row_data = [],
        implied_odds_cell = "<div class='field_label extra_wide'>Odds:</div>" + getOddsDisplay(implied_odds),
        scenario_PL_cell = "<div class='field_label extra_wide'>Scenario P/L:</div><span class='" + PNL_class + "'>" + toBTC(scenario_PL, false, true) + " BTC</span>" + getFiatDisplay(scenario_PL, "allow_inline");

        if (user_wager > 0) // user has a wager
            {
            row_data = [
                mark_outcome + description,
                implied_odds_cell,
                "<div class='field_label extra_wide'>My Wagers:</div>" + toBTC(user_wager) + " BTC" + getFiatDisplay(user_wager, "allow_inline"),
                "<div class='field_label extra_wide'>Payout:</div>" + toBTC(implied_payout) + " BTC" + getFiatDisplay(implied_payout, "allow_inline"),
                scenario_PL_cell
            ];
            }
        else row_data = [
            mark_outcome + description,
            implied_odds_cell,
            "<div class='field_label extra_wide'>My Wagers:</div>--",
            "<div class='field_label extra_wide'>Payout:</div>--",
            scenario_PL_cell
        ];

        var row = new_row(table, row_index, row_data);

        row[0].option_id = option_id;
        row[0].description = description;
        row[0].user_wager = user_wager;
        row[0].implied_odds = implied_odds;
        row[0].implied_payout = implied_payout;
        row[0].scenario_PL = scenario_PL;
        row[0].outcome = outcome;
        
        row[1].style.textAlign = "left";
        }
    
    function sort_option_report_table()
        {
        var 
        
        table = id("pari_mutuel_entry_report_table"),
        
        pari_mutuel_rows = table.rows,
        
        pari_mutuel_data = [];

        for (var i=1, limit = pari_mutuel_rows.length; i<limit; i++) 
            {
            var row = pari_mutuel_rows[i];
            pari_mutuel_data.push(
                {
                option_id: row.option_id,
                description: row.description,
                user_wager: row.user_wager,
                implied_odds: row.implied_odds,
                implied_payout: row.implied_payout,
                scenario_PL: row.scenario_PL,
                outcome: row.outcome
                });
            }
            
        pari_mutuel_data.sort(function(a, b) // forces 0 odds to the bottom in the odds sort
            {
            return b.wager_total - a.wager_total;
            });
            
        table.innerHTML = "";
        
        insert_option_report_table_header(table);
        
        for (var i=0, limit = pari_mutuel_data.length; i<limit; i++) 
            {
            var option = pari_mutuel_data[i];
            insert_option_report_row(table, option.option_id, option.description, option.user_wager, option.implied_odds, option.implied_payout, option.scenario_PL, option.outcome);
            }
        }
        
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