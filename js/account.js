    function get_btc_balance()
        {
        var call = api({ method: "GetAccountDetails", args: {} });
        if (call.status === "1") return call.btc_balance;
        else return "DATA ERROR";
        }

/*----------------------------------------------------------------------*/

    function get_ext_address(get_for_active_user)
        {
        var call = api({ 
            method: "GetExtAddress", 
            args: {
                get_for_active_user: get_for_active_user
            } 
        });
        if (call.status === "1") return call.ext_address;
        else return "DATA ERROR";
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
                request_source: ""
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
            
        // if (_id === "category_selector")
        //     {
        //     sub_category_selector.onchange = function()
        //         {
        //         populate_progressive_selector();
        //         };
        //     }
            
        $(sub_category_selector).trigger("chosen:updated");
        }
        
/*----------------------------------------------------------------------*/

    function create_pari_mutuel_table() {
        
        pari_mutuel_table = new_table("pari_mutuel_table");
        pari_mutuel_table.id = 'pari_mutuel_table_element';
        var
        
        row_count = 0,
        number_of_options = +id("number_of_options").value;

        if (isNaN(number_of_options) || number_of_options < 2) return alert("There must be 2 or more options");
        else if (number_of_options > 20) return alert("There can be up to 20 options");

        for (var i=0; i < number_of_options; i++) {
            var rank = i + 1;
            new_row(pari_mutuel_table, row_count++, [
                rank,
                "<input type=\"text\" class=\"input_style text_input\" style=\"width:500px;\" placeholder=\"Description\">"
            ]);
        }
            
        var header = new_row(pari_mutuel_table, 0, [
            "Id",
            "Description"
        ]);
            
        for (var i=1; i<header.length; i++) header[i].className = "header_cell";
    }

/*----------------------------------------------------------------------*/
          
    function create_contest() {
        
        var settlement_type = selectorValue('settlement_type_selector');    

        var category = selectorValue('category_selector');
        var sub_category = selectorValue('sub_category_selector');

        if(!(category !== '' && sub_category !== '')) return alert('Please select category');

        // check for title
        
        var title = id("contest_title_input").value;
        
        if (title === "") return alert("Please enter a title");
        
        // check for description
        
        var description = id("contest_description_textarea").value;
        
        if (description === "") return alert("Please enter a description");
        
        // check for number of options
        
        var number_of_options = +id("number_of_options").value;

        if(!(number_of_options > 0) || isNaN(number_of_options)) return alert("Please enter the number of options");

        if (window.session.user_level === 0) return alert ("Please make a deposit first");

        // get registration, settlement deadline

        if (isNaN(Date.parse(id("registration_deadline").value))) return alert("Please select a valid date");
        if (isNaN(Date.parse(id("settlement_deadline").value))) return alert("Please select a valid date");
        
        var
        
        registration_date = dateconv_date_start_time(Date.parse(id("registration_deadline").value)),
        registration_time = selectorValue("registration_deadline_time_selector"),
        registration_deadline = registration_date + registration_time * 60 * 60 * 1000;

        if (registration_deadline - new Date().getTime() < 1 * 60 * 60 * 1000) return alert("Registration deadline must be at least 1 hour from now");
        
        var
        
        settlement_date = dateconv_date_start_time(Date.parse(id("settlement_deadline").value)),
        settlement_time = selectorValue("settlement_deadline_time_selector"),
        settlement_deadline = settlement_date + settlement_time * 60 * 60 * 1000;

        if (settlement_deadline - registration_deadline < 1 * 60 * 60 * 1000) return alert("Settlement deadline must be at least 1 hour from registration deadline");

        var common_args = {
            category: category,  
            sub_category: sub_category,
            progressive: "",  
            contest_type: 'PARI-MUTUEL', 
            title: title,
            description: description,
            registration_deadline: registration_deadline,
            rake: 5.00, 
            cost_per_entry: 0.00000001,
            settlement_deadline: settlement_deadline,
            settlement_type: settlement_type
        };
        
        create_pari_mutuel_contest(common_args);
    }

    
    // validate and create roster contest

    function create_pari_mutuel_contest(args)
        {
        var pari_mutuel_table = id('pari_mutuel_table_element')
        if (pari_mutuel_table === null) return alert('Please click apply');
        // the following arguments only apply in a roster contest:

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

    window.contest_obj = [];
    function populate_user_contest() {
        var call = api({ method: "GetUserContests", args: {} });
        
        if (call.status === "1") {
            
            var
            
            pending_contest_array = call.pending_contests,
            number_of_contests = pending_contest_array.length,
            table = new_table("user_contest_table"),
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
                        "<button onclick=\"settle_contest(" + contest_id + ")\">Settle Contest</button>"
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

/*----------------------------------------------------------------------*/

    function settle_contest(contest_id) {

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

    function settle_pari_mutuel_contest() {

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