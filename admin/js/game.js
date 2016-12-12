
    function action_on_tab_change(selection)
        {
        switch(selection)
            {
            case 0: /* Create Pool */
                pool_report();
                break;
            case 1: /* Create Pool */
                initialize_registration_deadline();
                break;
            }
        }
                     
/*----------------------------------------------------------------------*/

    // contest report
    
    var 
    
    pool_report_array = [],
    number_of_pools;
    
    function pool_report()
        {
        var call = api({ method: "PoolReport", args: {} });
        
        var pool_report = call.pool_report;
        number_of_pools = pool_report.length;

        for (var i=0; i<number_of_pools; i++)
            {
            var pool_item = pool_report[i],
                    
            id = pool_item.id,
            created = pool_item.created,
            created_by = pool_item.created_by,
            category = pool_item.category,
            sub_category = pool_item.sub_category,
            title = pool_item.title,
            description = pool_item.description,
            settlement_type = pool_item.settlement_type,
            pay_table = pool_item.pay_table,
            odds_table = pool_item.odds_table,
            rake = pool_item.rake,
            salary_cap = pool_item.salary_cap,
            cost_per_entry = pool_item.cost_per_entry,
            min_users = pool_item.min_users,
            max_users = pool_item.max_users,
            entries_per_user = pool_item.entries_per_user,
            roster_size = pool_item.roster_size,
            registration_deadline = pool_item.registration_deadline,
            status = pool_item.status,
            odds_source = pool_item.odds_source;
  
            pool_report_array.push([
                id,
                created,
                created_by,
                category,
                sub_category,
                title,
                description,
                settlement_type,
                pay_table,
                odds_table,
                rake,
                salary_cap,
                cost_per_entry,
                min_users,
                max_users,
                entries_per_user,
                roster_size,
                registration_deadline,
                status,
                odds_source
            ]);
            
            
            }
            
        populate_pool_report_table();
        }
        
    function populate_pool_report_table()
        {
        var table = new_table("pool_report_table"),
        row_count = 0,
        right_align_array = [1,7,8,9,10,11,12,13];

        for (var i=0; i<number_of_pools; i++)
            {
            var pool_item = pool_report_array[i],
                    
            id = pool_item[0],
            created = pool_item[1],
            created_by = pool_item[2],
            category = pool_item[3],
            sub_category = pool_item[4],
            title = pool_item[5],
            description = pool_item[6],
            settlement_type = pool_item[7],
            pay_table = pool_item[8],
            odds_table = pool_item[9],
            rake = pool_item[10],
            salary_cap = pool_item[11],
            cost_per_entry = pool_item[12],
            min_users = pool_item[13],
            max_users = pool_item[14],
            entries_per_user = pool_item[15],
            roster_size = pool_item[16],
            
            registration_deadline = pool_item[17],
            registration_deadline_date = dateconv_ms_to_string(registration_deadline),
            registration_deadline_time = dateconv_ms_to_time(registration_deadline),
            registration_deadline_string = registration_deadline_date + " at " + registration_deadline_time,
            
            status = pool_item[18],
            status_string = "",
            
            odds_source = pool_item[19];
    
            switch (status)
                {
                case 1:
                    status_string = "Reg open";
                    break;
                case 2:
                    status_string = "In play";
                    break;
                case 3:
                    status_string = "Settled";
                    break;
                case 4:
                    status_string = "Under-subscribed";
                    break;
                case 5:
                    status_string = "Cancelled";
                    break;
                }
                
            if (max_users === 0) max_users = "UMLIMITED";
            if (entries_per_user === 0) entries_per_user = "UMLIMITED";
            if (roster_size === 0) roster_size = "VARIABLE";
            
            cost_per_entry = toBTC(cost_per_entry);
            
            salary_cap = commas(salary_cap);
            
            if (settlement_type !== "JACKPOT") pay_table = "";
    
            created = dateconv_ms_to_string(created);

            var row = new_row(table, row_count++, [
                id,
                created,
                created_by,
                category,
                sub_category,
                settlement_type,
                rake,
                salary_cap,
                cost_per_entry,
                min_users,
                max_users,
                entries_per_user,
                roster_size,
                registration_deadline_string,
                status_string,
                title,
                description,
                pay_table,
                odds_table,
                odds_source
            ]);
            
            right_align(row, right_align_array);
            }
            
        var header = new_row(table, 0, [
            "Id",
            "Created",
            "Created by",
            "Category",
            "Sub category",
            "Settlement type",
            "Rake",
            "Salary cap",
            "Cost per entry",
            "Min users",
            "Max users",
            "Entries per user",
            "Roster size",
            "Registration deadline",
            "Status",
            "Title",
            "Description",
            "Pay table",
            "Odds table",
            "Odds source"
        ]);
        // style headers:

        for (var i=1; i<header.length; i++) header[i].className = "header_cell";
        
        right_align(header, right_align_array);
        }
    
/*----------------------------------------------------------------------*/

    // Initialize registration deadline calendar
            
    function initialize_registration_deadline()
        {
        var date_now = new Date().getTime(),

        default_date = date_now,
        min_date = date_now,
        max_date = null;

        initialize_calendar
            (
            id("registration_deadline_tcal"),
            default_date,
            min_date,
            max_date
            );
        }

/*----------------------------------------------------------------------*/

    // dynamic form
    
    var 
    
    settlement_type_selector = id("settlement_type_selector"),
    entries_per_user_selector = id("entries_per_user_selector"); 
    
    settlement_type_selector.onchange = function()
        {
        var settlement_type = selectorHTML(settlement_type_selector);
        id("min_users_input").readOnly = false;
        id("max_users_input").readOnly = false;
        switch (settlement_type)
            {
            case "HEADS-UP" :
                id("min_users_input").readOnly = true;
                id("max_users_input").value = 2;
                id("max_users_input").readOnly = true;
                hide("create_jackpot_pay_table");
                break;
            case "DOUBLE-UP" :
                id("max_users_input").value = "";
                hide("create_jackpot_pay_table");
                break;
            case "JACKPOT" :
                id("max_users_input").value = "";
                show("create_jackpot_pay_table");
                break;
            }
        id("min_users_input").value = 2;
        };
                
/*----------------------------------------------------------------------*/

    // create jackpot pay table
    
    var jackpot_pay_table;
    
    function create_jackpot_pay_table()
        {
        jackpot_pay_table = new_table("jackpot_pay_table");
        
        var
        
        row_count = 0,
        number_of_payouts = +id("number_of_payouts_input").value;

        if (isNaN(number_of_payouts) || number_of_payouts < 3) 
            {
            hide("validate_pay_table_button");
            id("jackpot_pay_table").innerHTML = "";
            return alert("Pay table must have at least 3 ranks");
            }

        for (var i=0; i<number_of_payouts; i++)
            {
            var rank = i + 1;
            new_row(jackpot_pay_table, row_count++, [
                rank + "<sup>" + get_ordinal_suffix(rank) + "</sup>",
                "<input type=\"text\" class=\"input_style text_input\" >"
            ]);
            }
            
        var header = new_row(jackpot_pay_table, 0, [
            "Rank",
            "% Payout"
        ]);
            
        for (var i=1; i<header.length; i++) header[i].className = "header_cell";
        
        show("validate_pay_table_button");
        }
        
    function validate_jackpot_pay_table(suppress_valid_alert)
        {
        var 
        
        rows = jackpot_pay_table.rows,
        total_payout = 0;        

        for (var i=1; i<rows.length; i++)
            {
            var payout = rows[i].querySelector("input").value;
            
            if (payout === "")
                {
                alert("Rank " + i + ": no value entered");
                return false;
                }
            if (isNaN(payout))
                {
                alert("Rank " + i + ": invalid payout value");
                return false;
                }
            if (payout >= 100)
                {
                alert("Rank " + i + ": payout cannot be 100% or greater");
                return false;
                }
            if (+payout === 0)
                {
                alert("Rank " + i + ": payout cannot be 0%");
                return false;
                }
                
            total_payout += +payout;
            }
        
        if (total_payout > 100) 
            {
            alert("Jackpot is over-allocated: " + total_payout + "%");
            return false;
            }
        else if (total_payout < 100) 
            {
            alert("Jackpot is under-allocated: " + total_payout + "%");
            return false;
            }
        else if (suppress_valid_alert) return true;
        else alert("Pay table is valid!");
        }
    
/*----------------------------------------------------------------------*/

    // Scrape player odds
    
    var 
    
    player_odds_array,
    player_odds_table;
    
    function scrape_player_odds(scrape)
        {
        id("player_odds_table").innerHTML = "";
        hide("multiplier_row");
        hide("number_of_players_row");
        hide("add_player_button");
        
        if (scrape)
            {
            var 
            
            url = id("odds_url_input").value.trim(),
                    
            call = api({
                method: "ScrapePlayerOdds",
                args: {
                    url: url
                }
            });

            if (call.status === "1") 
                {
                show("multiplier_row", "table-row");
                player_odds_array = call.player_odds_array;
                populate_player_pricing_table();
                }
            }
        else show("number_of_players_row", "table-row");
        }
        
    function create_manual_player_table()
        {
        player_odds_array = [];
        
        var number_of_players = +id("number_of_players_input").value;
        
        for (var i=0; i<number_of_players; i++)
            {
            player_odds_array[i] = {
                name: "",
                odds: ""
            };
            }
            
        show("multiplier_row", "table-row");
        
        populate_player_pricing_table();
        }

    function populate_player_pricing_table()
        {
        player_odds_table = new_table("player_odds_table");
        
        var
        
        row_count = 0,
        number_of_players = player_odds_array.length;

        for (var i=0; i<number_of_players; i++)
            {
            var player_item = player_odds_array[i],
                    
            player_name = player_item.name,
            player_odds = player_item.odds;
        
            new_row(player_odds_table, row_count++, [
                "<input type=\"text\" class=\"input_style text_input\" value=\"" + player_name + "\">",
                "<input type=\"text\" class=\"input_style text_input\" value=\"" + player_odds + "\">",
                "",
                "<button type=\"button\" class=\"input_style\" onclick=\"remove_player(this);\">Remove player</button>"
            ]);
            }
            
        var header = new_row(player_odds_table, 0, [
            "Player",
            "Odds",
            "Price"
        ]);
            
        for (var i=1; i<header.length; i++) header[i].className = "header_cell";
        
        show("add_player_button");
        }
     
    function remove_player(button)
        {
        var i = button.parentNode.parentNode.rowIndex;
        player_odds_table.deleteRow(i);
        }
                
    function add_player()
        {
        new_row(player_odds_table, -1, [
            "<input type=\"text\" class=\"input_style text_input\">",
            "<input type=\"text\" class=\"input_style text_input\">",
            "",
            "<button type=\"button\" class=\"input_style\" onclick=\"remove_player(this);\">Remove player</button>"
        ]);
        }
           
    function price_players()
        {
        var 
        
        rows = player_odds_table.rows,
        multiplier = id("odds_multiplier_input").value;
        
        for (var i=1; i<rows.length; i++)
            {
            var 
            
            row = rows[i],
            player_odds = row.cells[1].querySelector("input").value,
            player_price;
            
            if (multiplier !== "") player_price = +multiplier * (1 / player_odds);

            row.cells[2].innerHTML = "$" + toCurrency(player_price);
            }
        }
        
/*----------------------------------------------------------------------*/

    // Validate and create pool
    
    function create_pool()
        {
        var
        
        category = selectorHTML("category_selector"),
        sub_category = selectorHTML("sub_category_selector");

        // check for title
        
        var title = id("pool_title_input").value;
        
        if (title === "") return alert("Please enter a title");
        
        // check for description
        
        var description = id("pool_description_textarea").value;
        
        if (description === "") return alert("Please enter a description");
        
        // get registration deadline
        
        var
        
        date = dateconv_date_start_time(id("registration_deadline_tcal").date_ms),
        time = selectorValue("registration_deadline_time_selector"),
        registration_deadline = date + time * 60 * 60 * 1000;

        if (registration_deadline - new Date().getTime() < 12 * 60 * 60 * 1000) return alert("Registration deadline must be at least 12 hours from now");
        
        // validate rake
        
        var rake = id("rake_input").value;
        
        if (rake === "") return alert("Please enter a rake");
        if (isNaN(rake)) return alert("Rake must be a number");
        if (rake > 100) return alert("Rake cannot be greater than 100%");
        if (rake < 0) return alert("Rake cannot be less than 0");
        /*if (rake === 0)
            {
            var proceed = confirm("You entered a 0% rake. Click OK if this is right.");
            if (!proceed) return;
            }
        if (rake >= 10) 
            {
            var proceed = confirm("You entered a rake 10% or greater. Click OK if this is right.");
            if (!proceed) return;
            }*/

        // validate cost per entry
        
        var cost_per_entry = id("cost_per_entry_input").value;
        
        if (cost_per_entry === "") return alert("Please enter a cost per entry");
        
        // check for settlement type
        
        var settlement_type = selectorHTML("settlement_type_selector");
        
        if (settlement_type === "") return alert("Please choose a settlement type");
        
        // make sure min users and max users are correct
        
        var
        
        min_users = id("min_users_input").value,
        max_users = id("max_users_input").value;

        if (min_users === "") return alert("Please enter min users");
        if (isNaN(min_users)) return alert("Min users must be a number");
        if (min_users < 2) return alert("Min users must be 2 or greater");
        
        // max_users can be "" to indicate unlimited and will be locked to 2 if HEADS-UP
        // so only validate max_users if !== ""
        
        if (max_users !== "") 
            {
            if (isNaN(max_users)) return alert("Max users must be a number");
            if (max_users < 2) return alert("Max users cannot be less than 2");
            if (settlement_type !== "HEADS-UP" && +max_users === 2) return alert("You entered max users 2 but didn't choose HEADS-UP");
            }
        else max_users = 0;

        // check for entries_per_user
        
        var entries_per_user = selectorHTML("entries_per_user_selector");
        
        // check for roster_size
        
        var roster_size = id("roster_size_input").value;
        
        if (roster_size === "") roster_size = 0;

        if (isNaN(roster_size)) return alert("Invalid roster size");
        if (roster_size < 0) return alert("Roster size cannot be negative");
        
        // if jackpot, validate pay table
        
        var pay_table = [];
        
        if (settlement_type === "JACKPOT")
            {
            if (typeof jackpot_pay_table === "undefined") return alert("Please enter jackpot pay table");
            
            var valid_pay_table = validate_jackpot_pay_table(true);
            
            if (!valid_pay_table) return;
            
            var rows = jackpot_pay_table.rows;

            for (var i=1; i<rows.length; i++)
                {
                pay_table.push({
                    rank: i,
                    payout: +rows[i].querySelector("input").value
                });
                }
            }
        
        // check for salary cap
        
        var salary_cap = id("salary_cap_input").value;
        
        if (salary_cap === "") return alert("Please enter salary cap");
        if (isNaN(salary_cap)) return alert("Salary cap must be a number");
        if (salary_cap < 1000) return alert("Salary cap cannot be less than 1000");

        // validate player prices
        
        if (typeof player_odds_table === "undefined") return alert("Please price players");
        
        var 
        
        player_rows = player_odds_table.rows,
        player_name_table = [],
        odds_table = [];
        
        for (var i=1; i<player_rows.length; i++)
            {
            var cells = player_rows[i].cells,
                    
            name = cells[0].querySelector("input").value,
            odds = cells[1].querySelector("input").value,
            price = cells[2].innerHTML;
    
            if (name === "" || odds === "" || price === "") return alert("Player table is incomplete");
            
            price = fromCurrency(price);
            
            if (price === 0) return alert("Invalid price or odds for " + name);
            if (price > salary_cap) return alert("Odds table row " + i + ": price cannot be greater than salary cap");
            
            if (player_name_table.contains(name)) return alert("Duplicate player: " + name);
            else player_name_table.push(name);
            
            odds_table.push({
                id: i,
                name: name,
                odds: odds,
                price: price
            });
            }
            
        var odds_source = id("odds_url_input").value.trim();
        if (odds_source === "") odds_source = "manual";
        
        // submit

        var call = api({
            method: "CreatePool",
            args: {
                category: category,
                sub_category: sub_category,
                title: title,
                description: description,
                registration_deadline: registration_deadline,
                rake: rake,
                cost_per_entry: cost_per_entry,
                settlement_type: settlement_type,
                min_users: min_users,
                max_users: max_users,
                entries_per_user: entries_per_user,
                roster_size: roster_size,
                pay_table: pay_table,
                salary_cap: salary_cap,
                odds_table: odds_table,
                odds_source: odds_source
            }
        });

        if (call.status === "1") 
            {
            alert("Pool created! Reloading panel.");
            location.reload();
            }
        else alert("Error: " + call.error);
        }
    