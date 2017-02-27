           
    var 
    
    contest_type_selector = id("contest_type_selector"),
    category_selector = id("category_selector"),
    sub_category_selector = id("sub_category_selector"),
    settlement_type_selector = id("settlement_type_selector"),
    entries_per_user_selector = id("entries_per_user_selector"); 
    
    function action_on_tab_change(selection)
        {
        switch(selection)
            {
            case 0: /* Contest Report */
                contest_report();
                break;
            case 1: /* Create Contest */
                if (category_selector.options.length === 0)
                    {
                    initialize_registration_deadline();
                    populate_category_selector();
                    tinymce.init({
                        selector: 'textarea',
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
            case 2: /* Settle Contest */
                in_play_contest_report();
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
            method: "ContestReport", 
            args: {
                category: "",
                sub_category: ""
            }  
        });
        
        var contest_report = call.contest_report;
        number_of_contests = contest_report.length;
        
        var table = new_table("contest_report_table"),
        row_count = 0,
        right_align_array = [1,10,11,12,13,14,15,16,17,18];

        for (var i=0; i<number_of_contests; i++)
            {
            var contest_item = contest_report[i],
                    
            id = contest_item.id,
            created = contest_item.created,
            created_by = contest_item.created_by,
            category = contest_item.category,
            sub_category = contest_item.sub_category,
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
                odds_source
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

    // retrieve categories and sub-categories, populate drop-downs
    
    var category_map = [];
    
    function populate_category_selector()
        {
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
            });
        }
        
    category_selector.onchange = function()
        {
        populate_sub_category_selector();
        };
        
    function populate_sub_category_selector()
        {
        sub_category_selector.innerHTML = "<option></option>";
        
        var 
        
        category_code = selectorValue(category_selector),
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
            
        $(sub_category_selector).trigger("chosen:updated");
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
        id("player_option_table").innerHTML = "";
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
            "Price"
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
            
            if (multiplier !== "") player_price = multiply(multiplier, (1 / player_odds));

            row.cells[2].innerHTML = "$" + toCurrency(player_price);
            }
        }
        
/*----------------------------------------------------------------------*/

    // driver for contest creation
    
    function create_contest()
        {
        var
        
        contest_type = selectorValue(contest_type_selector),
        category = selectorValue(category_selector),
        sub_category = selectorValue(sub_category_selector);

        // check for title
        
        var title = id("contest_title_input").value;
        
        if (title === "") return alert("Please enter a title");
        
        // check for description
        
        var description = tinyMCE.get("contest_description_textarea").getContent();;
        
        if (description === "") return alert("Please enter a description");
        
        // get registration deadline
        
        var
        
        date = dateconv_date_start_time(id("registration_deadline_tcal").date_ms),
        time = selectorValue("registration_deadline_time_selector"),
        registration_deadline = date + time * 60 * 60 * 1000;

        if (registration_deadline - new Date().getTime() < 1 * 60 * 60 * 1000) return alert("Registration deadline must be at least 1 hour from now");
        
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
            contest_type: contest_type,
            title: title,
            description: description,
            registration_deadline: registration_deadline,
            rake: rake,
            cost_per_entry: cost_per_entry
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
        
        var entries_per_user = selectorHTML(entries_per_user_selector);
        
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

            for (var i=1/*header is 0*/; i<rows.length; i++)
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
        
        if (typeof player_option_table === "undefined") return alert("Please price players");
        
        var 
        
        player_rows = player_option_table.rows,
        player_name_table = [],
        option_table = [];
        
        for (var i=1/*header is 0*/; i<player_rows.length; i++)
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
            
            option_table.push(
                {
                id: i,
                name: name,
                odds: odds,
                price: price
                });
            }
            
        var odds_source = id("odds_url_input").value.trim();
        if (odds_source === "") odds_source = "manual";
        
        // submit

        args.settlement_type = settlement_type;
        args.min_users = min_users;
        args.max_users = max_users;
        args.entries_per_user = entries_per_user;
        args.roster_size = roster_size;
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
        args.pay_table = null;
        args.salary_cap = null;
        args.odds_source = null;
        
        var 
        
        option_rows = pari_mutuel_table.rows,
        option_table = [];
        
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

    function in_play_contest_report()
        {
        var call = api({ 
            method: "ContestReport", 
            args: {
                category: "",
                sub_category: ""
            }  
        });
        
        var 
        
        contest_report = call.contest_report,
        table = new_table("in_play_contest_report_table"),
        row_count = 0;

        window.contest_type = [];
        window.contest_title = [];
        window.option_table = [];

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
                option_table = contest_item.option_table;
        
                window.contest_type[id] = contest_type;
                window.contest_title[id] = title;
                window.option_table[id] = JSON.parse(option_table);
        
                new_row(table, row_count++, [
                    id,
                    dateconv_ms_to_string(created),
                    created_by,
                    contest_type,
                    category,
                    sub_category,
                    settlement_type,
                    title,
                    "<button class=\"input_style\" style=\"width:auto\" onclick=\"settle_contest(" + id + ")\">Settle</button>"
                ]);
                }
            }
        }
        
    function settle_contest(contest_id)
        {
        window.contest_id_to_settle = contest_id;
        
        var 
        
        contest_type = window.contest_type[contest_id],
        option_table = window.option_table[contest_id];

        hide("in_play_contest_report");
        show("settle_contest");
        id("contest_type").innerHTML = contest_type;
        id("contest_id").innerHTML = contest_id;
        id("contest_title").innerHTML = window.contest_title[contest_id];
        
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
            hide("settle_pari_mutuel");
            show("settle_roster");
            }
        }
        
    function cancel_settle_contest()
        {
        hide("settle_contest");
        show("in_play_contest_report");
        }
        
    function settle_pari_mutuel_contest()
        {
        var winning_outcome = get_radio_selection("pari_mutuel_outcome_radio");
        
        if (winning_outcome === null) return alert("Please select winning outcome!");
        
        api({
            method: "SettlePariMutuelContest",
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