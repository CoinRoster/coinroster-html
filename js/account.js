    function get_btc_balance()
        {
        var call = api({ method: "GetAccountDetails", args: {} });
        if (call.status === "1") return call.btc_balance;
        else return "DATA ERROR";
        }
    
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
                "<input type=\"text\" class=\"input_style text_input\" style=\"width:500px;\">"
            ]);
        }
            
        var header = new_row(pari_mutuel_table, 0, [
            "Id",
            "Description"
        ]);
            
        for (var i=1; i<header.length; i++) header[i].className = "header_cell";
    } 
          
    function create_contest() {

        // check for title
        
        var title = id("contest_title_input").value;
        
        if (title === "") return alert("Please enter a title");
        
        // check for description
        
        var description = id("contest_description_textarea").value;
        
        if (description === "") return alert("Please enter a description");
        
        // check for number of options
        
        var number_of_options = +id("number_of_options").value;

        if(!(number_of_options > 0) || isNaN(number_of_options)) return alert("Please enter the number of options");

        if(window.session) {
            if (window.session.user_level === 0) return alert ("Please make a deposit first");
        }
        // get registration deadline
        
        var
        
        date = dateconv_date_start_time(id("registration_deadline_tcal").date_ms),
        time = selectorValue("registration_deadline_time_selector"),
        registration_deadline = date + time * 60 * 60 * 1000;

        if (registration_deadline - new Date().getTime() < 1 * 60 * 60 * 1000) return alert("Registration deadline must be at least 1 hour from now");

        var common_args = {
            category: 'USERGENERATED',  
            sub_category: "USERGENERATED",
            progressive: "",  
            contest_type: 'PARI-MUTUEL', 
            title: title,
            description: description,
            registration_deadline: registration_deadline,
            rake: 5.00, 
            cost_per_entry: 0.00000001 
        };

        create_pari_mutuel_contest(common_args);
    }

    
    // validate and create roster contest

    function create_pari_mutuel_contest(args)
        {
        var pari_mutuel_table = id('pari_mutuel_table_element')
        if (pari_mutuel_table === null) return alert('Please click apply');
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


    function get_user_contests() {

        var call = api({ method: "GetUserContests", args: {} });
        
        if (call.status === "1") {
            
            var
            
            pending_contest_array = call.pending_contests,
            number_of_contests = pending_contest_array.length,
            table = new_table("user_contest_table"),
            row_count = 0;
    
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
                        cost_per_entry/* ,
                        "<button onclick=\"approve_contest(" + contest_id + ")\">Approve Contest</button>" + 
                        "&nbsp;" +
                        "<button onclick=\"reject_contest(" + contest_id + ")\">Reject Contest</button>" */
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
            else id("pending_contest_table").innerHTML = "None";
        }
        else id("pending_contest_table").innerHTML = "Error getting transactions";        
    }
    