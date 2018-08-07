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

    window.contest_obj = [];
    function populate_user_contest() {
        var call = api({ method: "GetUserContests", args: {} });
        
        if (call.status === "1") {
            
            var
            
            pending_contest_array = call.pending_contests,
            number_of_contests = pending_contest_array.length,
            table = id("user_contest_table"),
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
                    description = contest_item.description;
                    
                    window.contest_obj[contest_id] = {
                        contest_id: contest_id,
                        created_date: created_date,
                        created_time: created_time,
                        created_by: created_by,
                        category: category,
                        title: title,
                        description: description,
                        option_table: contest_item.option_table,
                        contest_type: contest_item.contest_type
                    };

                    // var header = new_row(table, -1, [
                    //     "Contest",
                    //     "Created",
                    //     "Created By",
                    //     "Category",
                    //     "Title"
                    // ]);
            
                    // header[4].className = "right_nowrap";
                    // header[5].className = "right_nowrap";

                    var row = new_row(table, row_count++, [
                        contest_id,
                        created_date,
                        created_time,
                        created_by,
                        category,
                        title,
                        description,
                        "<button class=\"action_button\" style=\"display: inline-block; text-align: center;" + 
                            "\"onclick=\"settle_contest(" + contest_id + ")\">Settle Contest</button>"
                    ]);

                    row[1].style.textAlign = "right";
                    row[6].style.textAlign = "right";
                    
                    // highlight if older than 30 days:
                    
                    if (new Date().getTime()-30*1440*60*1000 > created) {
                        row[2].style.background = "rgb(255,231,166)";
                        row[2].style.class = "tooltip"
                    }
                }
                
                var header = new_row(table, 0, [
                    "#",
                    "Date",
                    "Time",
                    "Created By",
                    "Category",
                    "Title",
                    "Description",
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

        // id("contest_type").innerHTML = contest_type;
        // id("contest_id").innerHTML = contest_id;
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

        api({
            method: "UserSettleContest",
            args: {
                contest_id: window.contest_id_to_settle,
                winning_outcome: winning_outcome
            }
        }, function(call) {
            if (call.status === "1") {
                show_simple_modal("Contest has been settled! Reloading panel", "good", () => {
                    location.reload();
                });
            }
            else alert("Error: " + call.error);
        });
    }