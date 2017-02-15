        
/*----------------------------------------------------------------------*/

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

                            payout_info += "<tr><td>" + rank + "<sup>" + get_ordinal_suffix(rank) + "</sup>" + "</td><td>" + payout * 100 + "%</td></tr>";
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

    function get_registration_deadline_string(registration_date_ms)
        {
        var

        registration_deadline_date = dateconv_ms_to_string(registration_date_ms),
        registration_deadline_time = dateconv_ms_to_time(registration_date_ms);
        return "<div style=\"white-space:nowrap\">" + registration_deadline_date + "</div>" + registration_deadline_time;
        }
                
    function redirect_to_contest(contest_id)
        {
        location = "/contest.html?id=" + contest_id;
        }
        
/*----------------------------------------------------------------------*/

    // supporting functions for roster contest
    
    function add_player(player_id)
        {
        var row = id("player_" + player_id),
                
        name = row.name,
        price = row.price,
        
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
            id("salary_cap").innerHTML = "$" + toCurrency(salary_cap - price);
            if (show_max_players) id("remaining_players").innerHTML = ++drafted + "/" + max_players;
            else id("remaining_players").innerHTML = ++drafted;
            id("player_table").deleteRow(row.rowIndex);
            insert_player_row("roster_table", player_id, name, price);
            }
        else show_simple_modal("You cannot afford to draft " + name, "bad", null);
        }
        
    function remove_player(player_id)
        {
        var row = id("player_" + player_id),
                
        name = row.name,
        price = row.price,
        
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
        
        id("salary_cap").innerHTML = "$" + toCurrency(salary_cap + price);
        id("roster_table").deleteRow(row.rowIndex);
        
        insert_player_row("player_table", player_id, name, price);
        }
        
    function insert_player_row(table_id, player_id, name, price)
        {
        var 
        
        table = id(table_id),
        number_of_rows = table.rows.length,
        row_index = -1,
        action_button;

        if (table_id === "player_table") action_button = "<button class=\"text_button auto_width\" onclick=\"add_player(" + player_id + ")\">Draft</button>";
        else action_button = "<button class=\"text_button auto_width\" onclick=\"remove_player(" + player_id + ")\">Drop</button>";

        if (number_of_rows !== 0)
            {
            for (var i=0; i<number_of_rows; i++)
                {
                var row = table.rows[i];
                if (player_id < row.player_id)
                    {
                    row_index = row.rowIndex;
                    break;
                    }
                }
            }
            
        var row = new_row(table, row_index, [
            "<span class=\"\">" + name + "</span>",
            "<span class=\"green\">$" + toCurrency(price) + "</span>",
            action_button
        ]);
        
        row[0].id = "player_" + player_id;
        row[0].player_id = player_id,
        row[0].name = name;
        row[0].price = price;

        row[2].style.textAlign = "right";
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
    
    function get_implied_odds(wager_grand_total, option_item)
        {
        var 
        
        option_wager_total = option_item.wager_total,
        implied_odds = 0;
                                
        if (option_wager_total !== 0) implied_odds = divide(wager_grand_total, option_wager_total, 2);
        
        return implied_odds;
        }