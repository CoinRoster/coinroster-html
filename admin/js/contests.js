           
    var 
    
    contest_type_selector = id("contest_type_selector"),
    category_selector = id("category_selector"),
    sub_category_selector = id("sub_category_selector"),
    settlement_type_selector = id("settlement_type_selector"),
    entries_per_user_selector = id("entries_per_user_selector"),
    score_normalization_selector,

    normalization_done = false,
    normalization_scheme_used = "";
    
    function action_on_tab_change(selection)
        {
        switch(selection)
            {
            case 0: /* Contest Report */
                contest_report();
                break;
            case 1: /* Create Contest */
                if (id("category_selector").options.length === 0)
                    {
                    initialize_registration_deadline();
                    initialize_settlement_deadline();
                    populate_category_selector("category_selector");
                    tinymce.init({
                        selector: 'textarea.do_tinymce',
                        height: 200,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table contextmenu paste code'
                        ],
                        toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
                    });
                    }
                break;
            case 2: /* Live Scoring */
                normalization_done = false;
                normalization_scheme_used = "";
                score_normalization_selector = id("scoring_normalization_selector");
                hide("score_contest");
                show("scorable_contest_report");
                in_play_contest_report("scorable_contest_table");
                break;
            case 3: /* Settle Contest */
                normalization_done = false;
                normalization_scheme_used = "";
                score_normalization_selector = id("settlement_normalization_selector");
                hide("settle_contest");
                show("in_play_contest_report");
                in_play_contest_report("in_play_contest_report_table");
                break;
            case 4: /* Create Progressive */
                if (id("category_selector_progressive").options.length === 0)
                    {
                    populate_category_selector("category_selector_progressive");
                    }
                break;
            case 5: /* Progressive Report */
                progressive_report();
                break;
            case 6:
                if (id("category_selector_progressive").options.length === 0)
                    {
                    populate_code_selector("code_selector_progressive");
                    }
                break; 
            case 7: /* User Generated Contest */
                get_pending_contests('user');
                break;
            case 8: /* User Generated Contest */
                hide("settle_crowd_contest");
                show("crowd_contest_report");
                crowd_contest_report("crowd_contest_report_table");
                break;
            }
        }
                     
/*----------------------------------------------------------------------*/

    // contest report
    
    var 
    
    contest_report_array = [],
    number_of_contests;
    
    function contest_report()
        {
        var call = api({ 
            method: "ContestReport_Admin", 
            args: {
                category: "",
                sub_category: ""
            }  
        });
        
        var contest_report = call.contest_report;
        number_of_contests = contest_report.length;
        
        var table = new_table("contest_report_table"),
        row_count = 0,
        right_align_array = [1,11,12,13,14,15,16,17,18,19];

        for (var i=0; i<number_of_contests; i++)
            {
            var contest_item = contest_report[i],
                    
            id = contest_item.id,
            created = contest_item.created,
            created_by = contest_item.created_by,
            category = contest_item.category,
            sub_category = contest_item.sub_category,
            progressive = contest_item.progressive,
            contest_type = contest_item.contest_type,
            title = contest_item.title,
            description = contest_item.description,
            settlement_type = contest_item.settlement_type,
            pay_table = contest_item.pay_table,
            option_table = contest_item.option_table,
            rake = (contest_item.rake * 100) + "%",
            salary_cap = contest_item.salary_cap,
            cost_per_entry = contest_item.cost_per_entry,
            min_users = contest_item.min_users,
            max_users = contest_item.max_users,
            entries_per_user = contest_item.entries_per_user,
            roster_size = contest_item.roster_size,
            
            odds_source = contest_item.odds_source,
    
            registration_deadline = contest_item.registration_deadline,
            registration_deadline_date = dateconv_ms_to_string(registration_deadline),
            registration_deadline_time = dateconv_ms_to_time(registration_deadline),
            registration_deadline_string = registration_deadline_date + " at " + registration_deadline_time,
            
            status = contest_item.status,
            status_string = "";
      
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
            
            if (!progressive) progressive = "";
            
            cost_per_entry = toBTC(cost_per_entry);
            
            salary_cap = commas(salary_cap);
            
            if (settlement_type !== "JACKPOT") pay_table = "";
            
            var 
            
            total_prize_pool = contest_item.total_prize_pool,
            number_of_entries = divide(total_prize_pool, cost_per_entry);
            total_prize_pool += " BTC";
            
            if (settlement_type === "PARI-MUTUEL") 
                {
                salary_cap = "";
                roster_size = "";
                max_users = "";
                entries_per_user = "";
                odds_source = "";
                }
    
            created = dateconv_ms_to_string(created);

            var row = new_row(table, row_count++, [
                id,
                created,
                created_by,
                registration_deadline_string,
                status_string,
                contest_type,
                category,
                sub_category,
                progressive,
                settlement_type,
                rake,
                salary_cap,
                cost_per_entry,
                number_of_entries,
                total_prize_pool,
                min_users,
                max_users,
                entries_per_user,
                roster_size,
                title,
                //description,
                //pay_table,
                //option_table,
                odds_source,
            ]);
            
            right_align(row, right_align_array);
            }
            
        var header = new_row(table, 0, [
            "Id",
            "Created",
            "Created by",
            "Registration deadline",
            "Status",
            "Type",
            "Category",
            "Sub category",
            "Progressive",
            "Settlement type",
            "Rake",
            "Salary cap",
            "Cost per entry",
            "Entries",
            "Total value",
            "Min users",
            "Max users",
            "Entries per user",
            "Roster size",
            "Title",
            //"Description",
            //"Pay table",
            //"Option table",
            "Odds source"
        ]);
        // style headers:

        for (var i=1; i<header.length; i++) header[i].className = "header_cell";
        
        right_align(header, right_align_array);
        }

/*----------------------------------------------------------------------*/

    // switch contest type, show/hide relevant fields
 
    contest_type_selector.onchange = function()
        {
        var 
        
        pari_mutuel_contest_fields = document.getElementsByClassName("pari_mutuel_contest_field"),
        roster_contest_fields = document.getElementsByClassName("roster_contest_field");

        switch (selectorHTML(contest_type_selector))
            {
            case "PARI-MUTUEL":
                for (var i=0; i<roster_contest_fields.length; i++) hide(roster_contest_fields[i]);
                for (var i=0; i<pari_mutuel_contest_fields.length; i++) show(pari_mutuel_contest_fields[i], "table-row");
                break;
            case "ROSTER":
                for (var i=0; i<pari_mutuel_contest_fields.length; i++) hide(pari_mutuel_contest_fields[i]);
                for (var i=0; i<roster_contest_fields.length; i++) show(roster_contest_fields[i], "table-row");
                if (selectorHTML(settlement_type_selector) !== "JACKPOT") hide("create_jackpot_pay_table");
                break;
            }
        };
     
/*----------------------------------------------------------------------*/  

    // populate progressive code selector

    function populate_code_selector(_id) 
        {
        var code_selector = id(_id);        
        var balance_for_code = id("progressive_code_balance");

        code_selector.innerHTML = "<option></option>";
        api({
            method: "GetProgressiveCodes",
            args: {
                request_source: "admin_panel"
            }
        }, function(call)
            {
                var i;
                for (i = 0; i < call.codes.length; i++) {
                    var option = document.createElement("option");
                    option.value = call.codes[i];
                    option.innerHTML = call.codes[i];

                    code_selector.appendChild(option);
                }

                $(code_selector).trigger("chosen:updated");

                code_selector.onchange = function()
                    {
                    balance_for_code.innerHTML = call.balances[call.codes.indexOf(selectorValue(_id))];
                    };
            });
        
        }

/*----------------------------------------------------------------------*/

    // retrieve categories and sub-categories, populate drop-downs
    
    var category_map = [];
    
    function populate_category_selector(_id)
        {
        var category_selector = id(_id);
        
        category_selector.innerHTML = "<option></option>";
        
        api({
            method: "CategoryReport",
            args: {
                request_source: "admin_panel"
            }
        }, function(call)
            {
            var category_report = call.category_report;

            for (var i=0; i<category_report.length; i++)
                {
                var category = category_report[i],

                category_code = category.code,
                category_description = category.description,
                sub_categories = category.sub_categories,
                number_of_sub_categories = sub_categories.length;
        
                var option = document.createElement("option");
                option.value = category_code;
                option.innerHTML = "[" + category_code + "] " + category_description;

                category_selector.appendChild(option);

                if (number_of_sub_categories > 0)
                    {
                    var sub_category_object = [];
                    for (var j=0; j<number_of_sub_categories; j++)
                        {
                        var sub_category = sub_categories[j],

                        sub_category_code = sub_category.code,
                        sub_category_description = sub_category.description;
                
                        sub_category_object.push(
                            {
                            code: sub_category_code,
                            description: sub_category_description
                            });
                        }

                    category_map[category_code] = sub_category_object;
                    }
                }
            
            $(category_selector).trigger("chosen:updated");
            
            category_selector.onchange = function()
                {
                populate_sub_category_selector(_id);
                };
            });
        }
        
    function populate_sub_category_selector(_id)
        {
        var sub_category_selector = id("sub_" + _id);
        
        sub_category_selector.innerHTML = "<option></option>";
        
        var category_code = selectorValue(_id),
        sub_category_object = category_map[category_code];

        for (var i=0; i<sub_category_object.length; i++)
            {
            var sub_category = sub_category_object[i],

            sub_category_code = sub_category.code,
            sub_category_description = sub_category.description;
    
            var option = document.createElement("option");
            option.value = sub_category_code;
            option.innerHTML = "[" + sub_category_code + "] " + sub_category_description;

            sub_category_selector.appendChild(option);
            }
            
        if (_id === "category_selector")
            {
            sub_category_selector.onchange = function()
                {
                populate_progressive_selector();
                };
            }
            
        $(sub_category_selector).trigger("chosen:updated");
        }
        
    function populate_progressive_selector()
        {
        api({
            method: "ProgressiveReport",
            args: {
                category: selectorValue("category_selector"),
                sub_category: selectorValue("sub_category_selector")
            }
        }, function(call)
            {
            if (call.status === "1") 
                {
                var 

                progressive_report = call.progressive_report,
                progressive_selector = id("progressive_selector");
        
                progressive_selector.innerHTML = "<option></option>";

                for (var i=0; i<progressive_report.length; i++)
                    {
                    var progressive = progressive_report[i],

                    code = progressive.code,
                    balance = progressive.balance;
            
                    var option = document.createElement("option");
                    option.value = code;
                    option.innerHTML = "[" + code + "] " + toBTC(balance) + " BTC";

                    progressive_selector.appendChild(option);
                    }
                    
                $(progressive_selector).trigger("chosen:updated");
                }
            else alert("Error: " + call.error);
            });
        }

/*----------------------------------------------------------------------*/
           
    // Initialize registration deadline calendar
            
    function initialize_registration_deadline()
        {
        var date_now = new Date().getTime(),

        default_date = date_now - 86400 * 1000,
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
           
    // Initialize registration deadline calendar
            
    function initialize_settlement_deadline()
        {
        var date_now = new Date().getTime(),

        default_date = date_now - 86400 * 1000,
        min_date = date_now,
        max_date = null;

        initialize_calendar
            (
            id("settlement_deadline_tcal"),
            default_date,
            min_date,
            max_date
            );
        }

/*----------------------------------------------------------------------*/

    // dynamic form

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

    // create pari-mutuel option table
    
    function create_pari_mutuel_table()
        {
        pari_mutuel_table = new_table("pari_mutuel_table");
        
        var
        
        row_count = 0,
        number_of_options = +id("number_of_options").value;

        if (isNaN(number_of_options) || number_of_options < 2) 
            {
            id("jackpot_pay_table").innerHTML = "";
            return alert("There must be 2 or more options");
            }

        for (var i=0; i<number_of_options; i++)
            {
            var rank = i + 1;
            new_row(pari_mutuel_table, row_count++, [
                rank,
                "<input type=\"text\" class=\"input_style text_input\" style=\"width:500px;\">"
            ]);
            }
            
        var header = new_row(pari_mutuel_table, 0, [
            "Id",
            "Description"
        ]);
            
        for (var i=1; i<header.length; i++) header[i].className = "header_cell";
        } 
          
/*----------------------------------------------------------------------*/

    // Scrape player odds
    
    var 
    
    player_odds_array,
    player_option_table;
    
    function scrape_player_odds(scrape)
        {
        cancel_excel_data();
        
        if (typeof player_option_table !== "undefined") player_option_table.innerHTML = "";
        hide("multiplier_row");
        hide("number_of_players_row");
        hide("add_player_button");
        
        if (scrape)
            {
            var url = id("odds_url_input").value.trim();
            
            if (url === "")
                {
                return alert("Please provide a scraping link");
                }
                    
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
        
    function paste_player_odds()
        {
        hide("multiplier_row");
        hide("number_of_players_row");
        hide("add_player_button");
        show("paste_excel_row", "table-row");
        if (typeof player_option_table !== "undefined") player_option_table.innerHTML = "";
        id("odds_url_input").value = "";
        id("excel_data_textarea").value = "";
        }
        
    function paste_pari_mutuel_options()
        {
        show("paste_pari_mutuel_row", "table-row");
        id("pari_mutuel_table").innerHTML = "";
        id("pari_mutuel_excel_textarea").value = "";
        }
        
    function process_excel_data(process_scheme, cancel_id)
        {
        if (process_scheme === "PARI-MUTUEL")
            {
            var 

            lines = id("pari_mutuel_excel_textarea").value.split("\n"),
            number_of_options = lines.length,    
            row_count = 0,
            rank = 1;
    
            pari_mutuel_table = new_table("pari_mutuel_table");
    
            for (var i=0; i<number_of_options; i++)
                {
                var line = lines[i].trim();
                
                if (line === "") continue;
                
                var row = new_row(pari_mutuel_table, row_count++, [
                    rank,
                    "<input type=\"text\" class=\"input_style text_input\" style=\"width:500px;\">"
                ]);
                
                row[2].firstChild.value = line;                
                
                rank++;                
                }
            
            var header = new_row(pari_mutuel_table, 0, [
                "Id",
                "Description"
            ]);

            for (var i=1; i<header.length; i++) header[i].className = "header_cell";
            }
        else
            {
            var 

            lines = id("excel_data_textarea").value.split("\n"),
            number_of_players = lines.length;

            player_option_table = new_table("player_option_table");

            for (var i=0; i<number_of_players; i++)
                {
                var 

                line = lines[i].trim(),
                player_name = null,
                player_value = null;

                if (line === "") continue;

                if (line.indexOf("\t") !== -1)
                    {
                    var fields = line.split("\t");
                    player_name = fields[0].trim();
                    player_value = fields[1].trim();
                    }
                else return alert("Only one column found in data - this method requires two");

                if (process_scheme === "PRICES") player_value = fromCurrency(player_value) | 0;

                var row_data = [
                    "<input type=\"text\" class=\"input_style text_input\" value=\"" + player_name + "\">",
                    "<input type=\"text\" class=\"input_style text_input\" value=\"" + player_value + "\">",
                    "<button type=\"button\" class=\"input_style\" onclick=\"remove_player(this);\">Remove player</button>"
                ];

                if (process_scheme === "ODDS") row_data.splice(2, 0, "");

                new_row(player_option_table, -1, row_data);
                }

            var header_data = [
                "Player",
                "Price",
                ""
            ];

            if (process_scheme === "ODDS") 
                {
                header_data.splice(1, 0, "Odds");
                show("multiplier_row", "table-row");
                }

            var header = new_row(player_option_table, 0, header_data);

            for (var i=1; i<header.length; i++) header[i].className = "header_cell";
            }
            
        cancel_excel_data(cancel_id);
        }
        
    function cancel_excel_data(_id)
        {
        hide(_id);
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
        player_option_table = new_table("player_option_table");
        
        var
        
        row_count = 0,
        number_of_players = player_odds_array.length;

        for (var i=0; i<number_of_players; i++)
            {
            var player_item = player_odds_array[i],
                    
            player_name = player_item.name,
            player_odds = player_item.odds;
        
            new_row(player_option_table, row_count++, [
                "<input type=\"text\" class=\"input_style text_input\" value=\"" + player_name + "\">",
                "<input type=\"text\" class=\"input_style text_input\" value=\"" + player_odds + "\">",
                "",
                "<button type=\"button\" class=\"input_style\" onclick=\"remove_player(this);\">Remove player</button>"
            ]);
            }
            
        var header = new_row(player_option_table, 0, [
            "Player",
            "Odds",
            "Price",
            ""
        ]);
            
        for (var i=1; i<header.length; i++) header[i].className = "header_cell";
        
        show("add_player_button");
        }
     
    function remove_player(button)
        {
        var i = button.parentNode.parentNode.rowIndex;
        player_option_table.deleteRow(i);
        }
                
    function add_player()
        {
        new_row(player_option_table, -1, [
            "<input type=\"text\" class=\"input_style text_input\">",
            "<input type=\"text\" class=\"input_style text_input\">",
            "",
            "<button type=\"button\" class=\"input_style\" onclick=\"remove_player(this);\">Remove player</button>"
        ]);
        }
           
    function price_players()
        {
        var 
        
        rows = player_option_table.rows,
        multiplier = id("odds_multiplier_input").value;
        
        for (var i=1; i<rows.length; i++)
            {
            var 
            
            row = rows[i],
            player_odds = row.cells[1].querySelector("input").value,
            player_price;
    
            if (player_odds.indexOf("/") !== -1)
                {
                var values = player_odds.split("/"),
                
                numerator = +values[0],
                denominator = +values[1];
        
                player_odds = divide(numerator, denominator);
                player_odds = add(player_odds, 1);
                }
            
            if (multiplier !== "") player_price = multiply(multiplier, (1 / player_odds)) | 0;

            row.cells[2].innerHTML = "$" + commas(player_price);
            }
        }
        
/*----------------------------------------------------------------------*/

    // driver for contest creation
    
    function create_contest()
        {
        var
        
        contest_type = selectorValue(contest_type_selector),
        category = selectorValue("category_selector"),
        sub_category = selectorValue("sub_category_selector"),
        progressive = selectorValue("progressive_selector");

        if (category === "") return alert("Please choose a category");
        if (sub_category === "") return alert("Please choose a sub-category");

        // check for title
        
        var title = id("contest_title_input").value;
        
        if (title === "") return alert("Please enter a title");
        
        // check for description
        
        var description = tinyMCE.get("contest_description_textarea").getContent();
        
        if (description === "") return alert("Please enter a description");
        
        // get registration deadline
        
        var
        
        date = dateconv_date_start_time(id("registration_deadline_tcal").date_ms),
        time = selectorValue("registration_deadline_time_selector"),
        registration_deadline = date + time * 60 * 60 * 1000;

        if (registration_deadline - new Date().getTime() < 1 * 60 * 60 * 1000) return alert("Registration deadline must be at least 1 hour from now");

        // get settlement deadline

        var

        date = dateconv_date_start_time(id("settlement_deadline_tcal").date_ms),
        time = selectorValue("settlement_deadline_time_selector"),
        settlement_deadline = date + time * 60 * 60 * 1000;

        if (settlement_deadline - registration_deadline < 1 * 60 * 60 * 1000) return alert("settlement deadline must be at least 1 hour from registration deadline");
        
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
        
        var common_args = {
            category: category,
            sub_category: sub_category,
            progressive: progressive,
            contest_type: contest_type,
            title: title,
            description: description,
            registration_deadline: registration_deadline,
            rake: rake,
            cost_per_entry: cost_per_entry,
            settlement_deadline: settlement_deadline
        };
            
        switch (contest_type)
            {
            case "ROSTER":
                create_roster_contest(common_args);
                break;
            case "PARI-MUTUEL":
                create_pari_mutuel_contest(common_args);
                break;
            }
        }
        
/*----------------------------------------------------------------------*/
  
    // validate and create roster contest

    function create_roster_contest(args)
        { 
        // check for settlement type
        
        var settlement_type = selectorHTML(settlement_type_selector);
        
        if (settlement_type === "") return alert("Please choose a settlement type");
        
        // make sure min users and max users are correct
        
        var
        
        min_users = id("min_users_input").value,
        max_users = id("max_users_input").value;

        if (min_users === "") return alert("Please enter min users");
        if (isNaN(min_users)) return alert("Min users must be a number");
        if (min_users < 2) return alert("Min users must be 2 or greater");
        if (!isInt(min_users)) return alert("Invalid value for [min users]");
        
        // max_users can be "" to indicate unlimited and will be locked to 2 if HEADS-UP
        // so only validate max_users if !== ""
        
        if (max_users !== "") 
            {
            if (!isInt(max_users)) return alert("Invalid value for [max users]");
            if (isNaN(max_users)) return alert("Max users must be a number");
            if (max_users < 2) return alert("Max users cannot be less than 2");
            if (settlement_type !== "HEADS-UP" && +max_users === 2) return alert("You entered max users 2 but didn't choose HEADS-UP");
            }
        else max_users = 0;
  
        // check for entries_per_user
        
        var entries_per_user = id("entries_per_user_input").value;

        if (entries_per_user !== "") 
            {
            if (isNaN(entries_per_user)) return alert("Invalid value for [entries per user]");
            if (entries_per_user < 1) return alert("Entries per user cannot be less than 1");
            if (!isInt(entries_per_user)) return alert("Invalid value for [entries per user]");
            }
        else entries_per_user = 0;

        // check for roster_size
        
        var roster_size = id("roster_size_input").value;
        
        if (roster_size === "") roster_size = 0;

        if (isNaN(roster_size)) return alert("Invalid roster size");
        if (roster_size < 0) return alert("Roster size cannot be negative");
        if (!isInt(roster_size)) return alert("Invalid value for [min users]");
        
        roster_size = +roster_size;
        
        // make sure score_header has been assigned
        
        var score_header = id("score_header_input").value;
        if (score_header === "") return alert("Please select a score column header.");
        score_header = capitalize_first_letter(score_header);
            
        // if jackpot, validate pay table
        
        var pay_table = [];
        
        if (settlement_type === "JACKPOT")
            {
            if (typeof jackpot_pay_table === "undefined") return alert("Please enter jackpot pay table");
            
            var valid_pay_table = validate_jackpot_pay_table(true);
            
            if (!valid_pay_table) return;
            
            var rows = jackpot_pay_table.rows;

            for (var i=1/*header is 0*/; i<rows.length; i++)
                {
                pay_table.push({
                    rank: i,
                    payout: +rows[i].querySelector("input").value
                });
                }
            }
        
        // check for salary cap
        
        var salary_cap = id("salary_cap_input").value | 0;
        
        if (salary_cap === "") return alert("Please enter salary cap");
        if (isNaN(salary_cap)) return alert("Salary cap must be a number");
        if (salary_cap < 1000) return alert("Salary cap cannot be less than 1000");

        // validate player prices
        
        if (typeof player_option_table === "undefined") return alert("Please price players");
        
        var 
        
        player_rows = player_option_table.rows,
        player_name_table = [],
        option_table = [],
        number_of_players = player_rows.length - 1; // exclude header

        if (typeof player_rows[0] === "undefined") return alert("Please add players");
        if (number_of_players < 2) return alert("Please add at least two players");
        if (number_of_players < roster_size + 1) return alert("Number of players must be greater than (roster size + 1)");
        
        var number_of_columns = player_rows[0].cells.length;
        
        for (var i=1/*header is 0*/; i<player_rows.length; i++)
            {
            var cells = player_rows[i].cells,
            name = "",
            odds = "",
            price = "";
    
            if (number_of_columns === 4) // has name, price, and odds
                {
                name = cells[0].querySelector("input").value,
                odds = cells[1].querySelector("input").value,
                price = cells[2].innerHTML;

                if (name === "" || odds === "" || price === "") return alert("Player table is incomplete");
                }
            else if (number_of_columns === 3) // has name and price only
                {
                name = cells[0].querySelector("input").value,
                price = cells[1].querySelector("input").value;

                if (name === "" || price === "") return alert("Player table is incomplete");
                }
            
            price = fromCurrency(price) | 0;
            
            if (price === 0) return alert("Invalid price for " + name);
            if (price > salary_cap) return alert("Row " + i + ": price cannot be greater than salary cap");
            
            if (player_name_table.contains(name)) return alert("Duplicate player: " + name);
            else player_name_table.push(name);
            
            option_table.push(
                {
                id: i,
                name: name,
                odds: odds,
                price: price
                });
            }
            
        var odds_source = id("odds_url_input").value.trim();
        if (odds_source === "") odds_source = "n/a";
        
        // submit

        args.settlement_type = settlement_type;
        args.min_users = min_users;
        args.max_users = max_users;
        args.entries_per_user = entries_per_user;
        args.roster_size = roster_size;
        args.score_header = score_header;
        args.pay_table = pay_table;
        args.salary_cap = salary_cap;
        args.option_table = option_table;
        args.odds_source = odds_source;
        
        do_create_contest(args);
        }

/*----------------------------------------------------------------------*/

    // validate and create roster contest

    function create_pari_mutuel_contest(args)
        {
        // the following arguments only apply in a roster contest:
        
        args.settlement_type = null;
        args.min_users = null;
        args.max_users = null;
        args.entries_per_user = null;
        args.roster_size = null;
        args.score_header = null;
        args.pay_table = null;
        args.salary_cap = null;
        args.odds_source = null;
        
        var 
        
        option_rows = pari_mutuel_table.rows,
        option_table = [];
        
        var settlement_type = selectorValue('settlement_type_selector_pari');
        if(settlement_type === '') return alert('settlement type error');
        args.settlement_type = settlement_type;

        
        for (var i=1/*header is 0*/; i<option_rows.length; i++)
            {
            var description = option_rows[i].querySelector("input").value;
            if (description === "") return alert("Option " + i + " requires a description");
            option_table.push(
                {
                id: i,
                description: description
                });
            }
            
        args.option_table = option_table;
        
        do_create_contest(args);
        }

/*----------------------------------------------------------------------*/

    // submit contest for creation
    
    function do_create_contest(args)
        {
        api({
            method: "CreateContest",
            args: args
        }, function(call)
            {
            if (call.status === "1") 
                {
                alert("Contest created! Reloading panel.");
                location.reload();
                }
            else alert("Error: " + call.error);
            });
        }

/*----------------------------------------------------------------------*/

    function in_play_contest_report(table_id)
        {
        var call = api({ 
            method: "ContestReport_Admin", 
            args: {
                category: "",
                sub_category: ""
            }  
        });
        
        var 
        
        contest_report = call.contest_report,
        table = new_table(table_id),
        row_count = 0;

        window.contest = [];

        for (var i=0; i<contest_report.length; i++)
            {
            var contest_item = contest_report[i];
                    
            if (contest_item.status === 2)
                {
                var
                
                id = contest_item.id,
                created = contest_item.created,
                created_by = contest_item.created_by,
                category = contest_item.category,
                sub_category = contest_item.sub_category,
                contest_type = contest_item.contest_type,
                title = contest_item.title,
                settlement_type = contest_item.settlement_type,
                
                button_string = "<button class=\"input_style\" style=\"width:auto\" onclick=\"settle_contest(" + id + ")\">Settle Contest</button>";
 
                window.contest[id] = contest_item;
                
                if (table_id === "scorable_contest_table")
                    {
                    if (contest_type === "PARI-MUTUEL") continue;
                    button_string = "<button class=\"input_style\" style=\"width:auto\" onclick=\"score_contest(" + id + ")\">Update Scores</button>";
                    }
        
                new_row(table, row_count++, [
                    id,
                    dateconv_ms_to_string(created),
                    created_by,
                    contest_type,
                    category,
                    sub_category,
                    settlement_type,
                    title,
                    button_string
                ]);
                }
            }
        }

/*----------------------------------------------------------------------*/
 
    function settle_contest(contest_id)
        {
        window.contest_id_to_settle = contest_id;
        
        var 
        
        contest_item = window.contest[contest_id],
        contest_type = contest_item.contest_type,
        contest_title = contest_item.title,
        scores_updated = contest_item.scores_updated,
        option_table = JSON.parse(contest_item.option_table);

        hide("in_play_contest_report");
        show("settle_contest");
        id("contest_type").innerHTML = contest_type;
        id("contest_id").innerHTML = contest_id;
        id("contest_title").innerHTML = contest_title;
        
        if (contest_type === "PARI-MUTUEL")
            {
            hide("settle_roster");
            show("settle_pari_mutuel");
            
            var table = new_table("pari_mutuel_outcome_table");
            
            for (var i=0; i<option_table.length; i++)
                {
                var option_item = option_table[i],
                        
                option_id = option_item.id,
                description = option_item.description;
                
                new_row(table, -1, [
                    "<input type=\"radio\" name=\"pari_mutuel_outcome_radio\" value=\"" + option_id + "\" />",
                    option_id,
                    description
                ]);
                }
            }   
        else if (contest_type === "ROSTER")
            {
            normalization_done = false;
            hide("settle_pari_mutuel");
            show("settle_roster");
      
            var table = new_table("roster_outcome_table");
            
            create_player_rows(table, option_table, scores_updated);
            
            if (scores_updated)
                {
                normalization_scheme_used = contest_item.scoring_scheme;
                selectByHTML(score_normalization_selector, normalization_scheme_used);
                }
            else score_normalization_selector.selectedIndex = 0;
            
            $(score_normalization_selector).trigger("chosen:updated");
            }
        }

    function score_contest(contest_id)
        {
        window.contest_id_to_settle = contest_id;
        
        var 
        
        contest_item = window.contest[contest_id],
        scores_updated = contest_item.scores_updated,
        option_table = JSON.parse(contest_item.option_table);
        
        hide("scorable_contest_report");
        show("score_contest");
        id("scoring_contest_id").innerHTML = contest_id;
        id("scoring_contest_title").innerHTML = contest_item.title;
        id("score_header").innerHTML = contest_item.score_header;

        /*normalization_done = false;
        score_normalization_selector.selectedIndex = 0;
        $(score_normalization_selector).trigger("chosen:updated");
        normalization_scheme_used = "";*/

        var table = new_table("roster_score_table");
        
        create_player_rows(table, option_table, scores_updated);
            
        if (scores_updated)
            {
            normalization_scheme_used = contest_item.scoring_scheme;
            selectByHTML(score_normalization_selector, normalization_scheme_used);
            }
        else score_normalization_selector.selectedIndex = 0;

        $(score_normalization_selector).trigger("chosen:updated");
        }
        
    function create_player_rows(table, option_table, scores_updated)
        {
        for (var i=0; i<option_table.length; i++)
            {
            var option_item = option_table[i],

            player_id = option_item.id,
            player_name = option_item.name,

            row_data = [
                player_id,
                player_name,
                "<input type=\"text\" class=\"input_style text_input\"/>"
            ];
            
            if (scores_updated > 0) row_data.push(option_item.score);

            var row = new_row(table, -1, row_data);
            
            if (scores_updated > 0) row[3].querySelector("input").value = option_item.score_raw;
            }
        }
                
    function cancel_settle_contest()
        {
        hide("settle_roster_button");
        hide("settle_contest");
        show("in_play_contest_report");
        }
        
    function cancel_score_contest()
        {
        hide("update_scores_button");
        hide("score_contest");
        show("scorable_contest_report");
        }
        
/*----------------------------------------------------------------------*/
 
    function validate_player_scores(step, table_id)
        {
        var 
        
        normalization_scheme = selectorValue(score_normalization_selector),
        player_rows = id(table_id).firstChild.rows,
        number_of_players = player_rows.length,
        player_scores = [],
        permitted_non_integers = [];

        var time_scheme = "";
        
        if (normalization_scheme.indexOf("TIME-") === 0)
            {
            time_scheme = normalization_scheme.slice(5);
            normalization_scheme = "TIME";
            }
        
        for (var i=0; i<number_of_players; i++)
            {
            var cells = player_rows[i].cells,
                    
            player_id = cells[0].innerHTML,
            player_name = cells[1].innerHTML,
            score_raw = cells[2].querySelector("input").value.trim(),
            score_normalized = score_raw;
                
            if (score_raw === "")
                {
                alert("Please provide a score for " + player_name);
                return false;
                }
                                
            if (step === "NORMALIZING") // validating the raw score inputs
                {
                switch (normalization_scheme)
                    {
                    case "INTEGER" :
                    case "INTEGER-INVERT" :
                        {
                        if (isNaN(score_raw))
                            {
                            var try_sport = window.contest[window.contest_id_to_settle].sub_category;
                            
                            if (try_sport === "GOLF" && score_raw === "E") score_normalized = 0;
                            else if (!permitted_non_integers.contains(score_raw))
                                {
                                var allow = confirm(player_name + " has been assigned a score of [" + score_raw + "]\n\nWould you like to allow the use of [" + score_raw + "]?");
                                if (!allow) return false;
                                else permitted_non_integers.push(score_raw);
                                }
                            }
                        else if (!isInt(score_raw))
                            {
                            alert("Score for " + player_name + " is not an integer. Consider using a DECIMAL scoring scheme.");
                            return false;
                            }
                        }
                        break;
                    case "DECIMAL" :
                    case "DECIMAL-INVERT" :
                        {
                        if (isNaN(score_raw))
                            {
                            if (!permitted_non_integers.contains(score_raw))
                                {
                                var allow = confirm(player_name + " has been assigned a score of [" + score_raw + "]\n\nWould you like to allow the use of [" + score_raw + "]?");
                                if (!allow) return false;
                                else permitted_non_integers.push(score_raw);
                                }
                            }
                        }
                        break;
                    case "TIME" :
                        {
                        // check if input contains the format specified in time_scheme
                        }
                        break;
                    }
                }
            else // step === "SUBMITTING" - validating the normalized scores
                {
                score_normalized = cells[3].innerHTML;
                
                switch (normalization_scheme)
                    {
                    // the following schemes will have normalized to integers
                    case "INTEGER" :
                    case "INTEGER-INVERT" :
                    case "TIME" :
                        {
                        if (!isInt(score_normalized))
                            {
                            alert("Invalid score for: " + player_name);
                            return false;
                            }
                        }
                        break;
                    // the following schemes will have normalized to integers / doubles
                    case "DECIMAL" :
                    case "DECIMAL-INVERT" :
                        {
                        if (isNaN(score_normalized))
                            {
                            alert("Invalid score for: " + player_name);
                            return false;
                            }
                        }
                        break;
                    }
                }
                
            player_scores.push({
                id: player_id,
                score_normalized: score_normalized,
                score_raw: score_raw
            });
            }
            
        return player_scores;
        }
        
    function normalize_player_scores(table_id)
        {
        var normalization_scheme = selectorValue(score_normalization_selector);
        
        if (normalization_done)
            {
            var proceed = confirm("You have already normalized player scores using the [" + normalization_scheme_used + "] scheme\n\nAre you sure you want to normalize using the [" + normalization_scheme + "] scheme?");
            if (!proceed) return false;
            }
        else
            {
            var proceed = confirm("Are you sure you want to normalize scores using the [" + normalization_scheme + "] scheme?");
            if (!proceed) return false;
            }
            
        var player_scores = validate_player_scores("NORMALIZING", table_id);
      
        var player_rows = id(table_id).firstChild.rows;
        
        var time_scheme = "";
        
        var try_sport = window.contest[window.contest_id_to_settle].sub_category;
                            
        if (normalization_scheme.indexOf("TIME-") === 0)
            {
            time_scheme = normalization_scheme.slice(5);
            alert(time_scheme);
            normalization_scheme = "TIME";
            }
        
        switch (normalization_scheme)
            {
            case "INTEGER" :
            case "DECIMAL" :
                {
                for (var i=0; i<player_scores.length; i++)
                    {
                    var cells = player_rows[i].cells,
                    
                    player = player_scores[i],
                    score_normalized = player.score_normalized,
                    score_raw = player.score_raw;
            
                    if (isNaN(score_normalized)) score_normalized = 0;
                    
                    cells[2].firstChild.value = score_raw;
                    
                    var cell_3;
                    
                    if (typeof cells[3] === "undefined") 
                        {
                        cell_3 = player_rows[i].insertCell();
                        cell_3.style.textAlign = "right";
                        }
                    else cell_3 = cells[3];
       
                    cell_3.innerHTML = +score_normalized;
                    }
                }
                break;
            case "INTEGER-INVERT" :
            case "DECIMAL-INVERT" :
                {
                var worst_score = -999999999;
                
                for (var i=0; i<player_scores.length; i++)
                    {
                    var player = player_scores[i],
                            
                    score_raw = +player.score_raw;
 
                    if (!isNaN(score_raw) && score_raw > worst_score) worst_score = score_raw;
                    }
                   
                for (var i=0; i<player_scores.length; i++)
                    {
                    var cells = player_rows[i].cells,
                    
                    player = player_scores[i],
                    score_raw = player.score_raw,
                    score_normalized,
                    cell_3;
            
                    // we want to preserve raw score as a string, so we process it here
            
                    if (typeof cells[3] === "undefined") 
                        {
                        cell_3 = player_rows[i].insertCell();
                        cell_3.style.textAlign = "right";
                        }
                    else cell_3 = cells[3];
                    
                    if (try_sport === "GOLF" && score_raw === "E") score_normalized = add(subtract(worst_score, 0), 1);
                    else if (isNaN(score_raw)) score_normalized = 0;
                    else score_normalized = add(subtract(worst_score, score_raw), 1);
                    
                    cells[2].firstChild.value = score_raw;
                    cell_3.innerHTML = +score_normalized;
                    }
                }
                break;
            case "TIME" :
                {
                // parse time_scheme and convert to whatever the lowest unit is (e.g. net seconds for MM-SS):
                // MM * 60 + SS
                }
                break;
            }
            
        normalization_scheme_used = normalization_scheme;
        normalization_done = true;
        
        if (table_id === "roster_outcome_table") 
            {
            show("settle_roster_button");
            }
        if (table_id === "roster_score_table") 
            {
            show("update_scores_button");
            }
        }
        
    function undo_normalize_player_scores()
        {
        var 
        
        player_rows = id("roster_outcome_table").firstChild.rows,
        number_of_players = player_rows.length;
        
        for (var i=0; i<number_of_players; i++) player_rows[i].deleteCell(3);
        
        normalization_done = false;
        normalization_scheme_used = "";
        }
     
/*----------------------------------------------------------------------*/
   
    function update_scores(table_id)
        {
        var player_scores = validate_player_scores("SUBMITTING", table_id);
        
        if (!player_scores) return;
        
        api({
            method: "UpdateScores",
            args: {
                contest_id: window.contest_id_to_settle,
                normalization_scheme: normalization_scheme_used,
                player_scores: player_scores
            }
        }, function(call)
            {
            if (call.status === "1") 
                {
                alert("Scores have been updated! Reloading panel.");
                location.reload();
                }
            else alert("Error: " + call.error);
            });
        }
        
/*----------------------------------------------------------------------*/
 
    function settle_pari_mutuel_contest()
        {
        var winning_outcome = get_radio_selection("pari_mutuel_outcome_radio");
        
        if (winning_outcome === null) return alert("Please select winning outcome!");
        
        api({
            method: "SettleContest",
            args: {
                contest_id: window.contest_id_to_settle,
                winning_outcome: winning_outcome
            }
        }, function(call)
            {
            if (call.status === "1") 
                {
                alert("Contest has been settled! Reloading panel.");
                location.reload();
                }
            else alert("Error: " + call.error);
            });
        }
     
/*----------------------------------------------------------------------*/
   
    function settle_roster_contest(table_id)
        {
        var player_scores = validate_player_scores("SUBMITTING", table_id);
        
        if (!player_scores) return;
        
        api({
            method: "SettleContest",
            args: {
                contest_id: window.contest_id_to_settle,
                normalization_scheme: normalization_scheme_used,
                player_scores: player_scores
            }
        }, function(call)
            {
            if (call.status === "1") 
                {
                alert("Contest has been settled! Reloading panel.");
                location.reload();
                }
            else alert("Error: " + call.error);
            });
        }

/*----------------------------------------------------------------------*/
           
    // Create Progressive
       
    id("progressive_code_input").onblur = function()
        {
        this.value = toCode(this.value);
        };
    
    function create_progressive()
        {
        var
        
        category = selectorValue("category_selector_progressive"),
        sub_category = selectorValue("sub_category_selector_progressive"),
        code = id("progressive_code_input").value,
        payout_info = id("progressive_payout_info").value;

        if (category === "") return alert("Choose a category");
        if (sub_category === "") return alert("Choose a sub-category");
        if (code === "") return alert("Enter a code");
        if (payout_info === "") return alert("Enter payout info");

        api({
            method: "CreateProgressive",
            args: {
                category: category,
                sub_category: sub_category,
                code: code,
                payout_info: payout_info
            }
        }, function(call)
            {
            if (call.status === "1")
                {
                alert("Progressive created! Reloading panel.");
                location.reload();
                }
            else alert(call.error);
            });
        }

/*----------------------------------------------------------------------*/

    function add_to_progressive()
        {
        var
        
        code = selectorValue("code_selector_progressive"),
        amount = id("progressive_addition_input").value;

        if (code === "") return alert("Choose a code");
        if (amount === "") return alert("Enter an amount");

        api (
            {
                method: "AddToProgressive",
                args: {
                    code: code,
                    amount_to_add: amount
                }
            }, function(call)
                {   
                if (call.status === "1")
                    {
                    alert("Progressive updated! Reloading panel.");
                    location.reload();
                    }
                else alert(call.error);
                });

        return;
        }

/*----------------------------------------------------------------------*/
           
    // Progressive Report
        
        
    function progressive_report()
        {
        api({
            method: "ProgressiveReport",
            args: {
                category: "",
                sub_category: ""
            }
        }, function(call)
            {
            if (call.status === "1") 
                {
                var 

                progressive_report = call.progressive_report,
                table = new_table("progressive_report_table"),
                row_count = 0;
        
                for (var i=0; i<progressive_report.length; i++)
                    {
                    var progressive = progressive_report[i],
                            
                    id = progressive.id,
                    
                    created = progressive.created,
                    created_date = dateconv_ms_to_string(created),
                    created_time = dateconv_ms_to_time(created),
                    created_string = created_date + " at " + created_time,
                    
                    created_by = progressive.created_by,
                    category = progressive.category,
                    sub_category = progressive.sub_category,
                    code = progressive.code,
                    payout_info = progressive.payout_info,
                    balance = progressive.balance;
            
                    var row = new_row(table, row_count++, [
                        id,
                        created_string,
                        created_by,
                        category,
                        sub_category,
                        code,
                        toBTC(balance) + " BTC",
                        payout_info
                    ]);
                    
                    row[7].style.textAlign = "right";
                    }
                    
                var header = new_row(table, 0, [
                    "Id",
                    "Created",
                    "Created by",
                    "Category",
                    "Sub-category",
                    "Code",
                    "Balance",
                    "Payout info"
                ]);
                // style headers:

                for (var i=1; i<header.length; i++) header[i].className = "header_cell";
                
                header[7].style.textAlign = "right";
                }
            else alert("Error: " + call.error);
            });
        }

/*----------------------------------------------------------------------*/
              
    function get_pending_contests(settlement_type) {

        var call = api({ 
            method: "GetUnapprovedContests",
            args: {
                settlement_type: settlement_type
            }
        });
        
        if (call.status === "1") {
            
            var
            
            pending_contest_array = call.pending_contests,
            number_of_contests = pending_contest_array.length,
            row_count = 0;
            if (settlement_type === 'crowd') {
                var ele = "pending_crowd_contest_table"
            } else {
                ele = "pending_contest_table";
            }
            
            var table = new_table(ele);

            if (number_of_contests > 0) {
                for (var i = 0; i < number_of_contests; i++) {
                    var contest_item = pending_contest_array[i],

                    contest_id = contest_item.contest_id,
                    created = contest_item.created,
                    created_date = dateconv_ms_to_string(created),
                    created_time = dateconv_ms_to_time(created),
                    created_by = contest_item.created_by,
                    category = contest_item.category,
                    title = contest_item.title,
                    description = contest_item.description,
                    settlement_type = contest_item.settlement_type,
                    option_table = contest_item.option_table,
                    rake = contest_item.rake,
                    cost_per_entry = contest_item.cost_per_entry;
                    
                    var row = new_row(table, row_count++, [
                        contest_id,
                        created_date,
                        created_time,
                        created_by,
                        category,
                        title,
                        description,
                        settlement_type,
                        option_table,
                        rake,
                        cost_per_entry,
                        "<button onclick=\"approve_contest(" + contest_id + ")\">Approve Contest</button>" + 
                        "&nbsp;" +
                        "<button onclick=\"reject_contest(" + contest_id + ")\">Reject Contest</button>"
                    ]);

                    row[1].style.textAlign = "right";
                    row[6].style.textAlign = "right";
                    
                    // highlight if older than 30 days:
                    
                    if (new Date().getTime()-30*1440*60*1000 > created) row[2].style.background = "rgb(255,231,166)";
                }
                
                var header = new_row(table, 0, [
                    "#",
                    "Date",
                    "Time",
                    "Created By",
                    "Category",
                    "Title",
                    "Description",
                    "Settlement Type",
                    "Option Table",
                    "Rake",
                    "Cost Per Entry",
                    "Action"
                ]);
                // style headers:

                for (var i=1; i<header.length; i++) header[i].className = "header_cell";
       
                header[1].style.textAlign = "center";
                header[6].style.textAlign = "right";
            }
            else id(ele).innerHTML = "None";
        }
        else id(ele).innerHTML = "Error getting transactions";        
    }

    function approve_contest (contest_id) {
        var args = {};
        args.admin_approval = "1";
        update_user_contest(args, contest_id);
    }

    function reject_contest (contest_id) {
        var args = {};
        args.admin_approval = "0";
        update_user_contest(args, contest_id);
    }
    
    function update_user_contest (args, contest_id) {
        args.contest_id = contest_id;
        console.log(args);
        api({
            method: 'ApproveUserContest',
            args: args
        }, function (call) {
            alert('call was successful');
            window.location.reload();
        })
    }

/*----------------------------------------------------------------------*/

    function crowd_contest_report(table_id)
    {
    var call = api({ 
        method: "PendingCrowdContestReport", 
        args: {
            category: "",
            sub_category: ""
        }  
    });
    
    var 
    
    contest_report = call.contest_report,
    table = new_table(table_id),
    row_count = 0;

    window.contest = [];

    for (var i = 0; i < contest_report.length; i++)
        {
        var contest_item = contest_report[i];
        document.getElementById('entries').innerHTML = JSON.stringify(contest_item.entries);

        var
        
        id = contest_item.contest_id,
        created = contest_item.created,
        created_by = contest_item.created_by,
        category = contest_item.category,
        sub_category = contest_item.sub_category,
        contest_type = contest_item.contest_type,
        title = contest_item.title,
        settlement_type = contest_item.settlement_type,
        
        button_string = "<button class=\"input_style\" style=\"width:auto\" onclick=\"settle_crowd_contest(" + id + ")\">Settle Contest</button>";

        window.contest[id] = contest_item;
 
        new_row(table, row_count++, [
            id,
            dateconv_ms_to_string(created),
            created_by,
            contest_type,
            category,
            sub_category,
            settlement_type,
            title,
            button_string
        ]);
        }

    }

/*----------------------------------------------------------------------*/
    window.contest_obj = [];
    function populate_user_contest() {
        var call = api({ method: "GetUnapprovedContests", args: {settlement_type:'crowd'} });
        
        if (call.status === "1") {
            
            var
            
            pending_contest_array = call.pending_contests,
            number_of_contests = pending_contest_array.length,
            table = new_table("crowd_contest_report_table"),
            row_count = 0;
            table.border = "1";

            if (number_of_contests > 0) {
                for (var i = 0; i < number_of_contests; i++) {
                    var contest_item = pending_contest_array[i],

                    contest_id = contest_item.contest_id,
                    created = contest_item.created,
                    created_date = dateconv_ms_to_string(created),
                    created_time = dateconv_ms_to_time(created),
                    created_by = contest_item.created_by,
                    category = contest_item.category,
                    title = contest_item.title,
                    description = contest_item.description,
                    settlement_type = contest_item.settlement_type,
                    option_table = contest_item.option_table,
                    rake = contest_item.rake,
                    cost_per_entry = contest_item.cost_per_entry;
                    
                    window.contest_obj[contest_id] = {
                        contest_id: contest_id,
                        created_date: created_date,
                        created_time: created_time,
                        created_by: created_by,
                        category: category,
                        title: title,
                        description: description,
                        settlement_type: settlement_type,
                        option_table: option_table,
                        rake: rake,
                        cost_per_entry: cost_per_entry,
                    };

                    var row = new_row(table, row_count++, [
                        contest_id,
                        created_date,
                        created_time,
                        created_by,
                        category,
                        title,
                        description,
                        settlement_type,
                        option_table,
                        rake,
                        cost_per_entry ,
                        "<button onclick=\"settle_crowd_contest(" + contest_id + ")\">Settle Contest</button>"
                    ]);

                    row[1].style.textAlign = "right";
                    row[6].style.textAlign = "right";
                    
                    // highlight if older than 30 days:
                    
                    if (new Date().getTime()-30*1440*60*1000 > created) row[2].style.background = "rgb(255,231,166)";
                }
                
                var header = new_row(table, 0, [
                    "#",
                    "Date",
                    "Time",
                    "Created By",
                    "Category",
                    "Title",
                    "Description",
                    "Settlement Type",
                    "Option Table",
                    "Rake",
                    "Cost Per Entry",
                    "Settle"
                ]);
                // style headers:

                for (var i=1; i<header.length; i++) header[i].className = "header_cell";
        
                header[1].style.textAlign = "center";
                header[6].style.textAlign = "right";
            }
            else id("user_contest_table").innerHTML = "None";
        }
        else id("user_contest_table").innerHTML = "Error getting transactions";       
    }

    function settle_crowd_contest(contest_id) {

        window.contest_id_to_settle = contest_id;

        var 
        
        contest = window.contest_obj[contest_id];
        contest_type = contest.contest_type,
        contest_title = contest.title,
        // scores_updated = contest_item.scores_updated,
        option_table = JSON.parse(contest.option_table);

        hide("user_contest_table");
        show("settle_contest");

        id("contest_type").innerHTML = contest_type;
        id("contest_id").innerHTML = contest_id;
        id("contest_title").innerHTML = contest_title;

        show("settle_pari_mutuel");
        
        var table = new_table("pari_mutuel_outcome_table");
        
        for (var i=0; i<option_table.length; i++)
            {
            var option_item = option_table[i],

            option_id = option_item.id,
            description = option_item.description;
            
            new_row(table, -1, [
                "<input type=\"radio\" name=\"pari_mutuel_outcome_radio\" value=\"" + option_id + "\" />",
                description
            ]);
            }
    }

    function settle_crowd_pari_mutuel_contest() {

        var winning_outcome = get_radio_selection("pari_mutuel_outcome_radio");
        
        if (winning_outcome === null) return alert("Please select winning outcome!");
        alert('success');
        api({
            method: "UserSettleContest",
            args: {
                contest_id: window.contest_id_to_settle,
                winning_outcome: winning_outcome
            }
        }, function(call)
            {
            if (call.status === "1") 
                {
                alert("Contest has been settled! Reloading panel.");
                location.reload();
                }
            else alert("Error: " + call.error);
            });
    }