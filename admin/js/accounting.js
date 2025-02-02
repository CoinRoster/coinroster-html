
    // action on tab change
    
    function action_on_tab_change(selection)
        {
        switch(selection)
            {
            case 1: /* Transaction Report */
                transaction_report();
                break;
            case 3: /* Pending Referrals */
                referral_report();
                break;
            case 4: /* Cash Register */
                get_cash_register();
                break;
            case 6:
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
                break;
            case 7: /* Balance Sheet */
                // balance_sheet_init();
                break;
            }
        }

/*----------------------------------------------------------------------*/

    // User Report - setup
    
    var 
    
    number_of_users,
    user_report_array = [],

    user_report_sort_selector = id("user_report_sort_selector"),
    simple_user_report_checkbox = id("simple_user_report_checkbox"),
    exclude_internals_checkbox = id("exclude_internals_checkbox"); 
    
    user_report_sort_selector.onchange = function()
        {
        sort_user_report();
        };
                  
    simple_user_report_checkbox.onchange = function()
        {
        sort_user_report();
        };

    exclude_internals_checkbox.onchange = function()
        {
        sort_user_report();
        };
        
    // User Report - action
    
    user_report();
    sort_user_report();
    
    function user_report()
        {
        var call = api({ method: "UserReport", args: {} });
        
        var 
        
        user_report = call.user_report,
        btc_accumulator = 0,
        rc_accumulator = 0;

        number_of_users = user_report.length;

        for (var i=0; i<number_of_users; i++)
            {
            var user_item = user_report[i],
            created = user_item.created,
            last_login = user_item.last_login,
            user_id = user_item.user_id,
            username = user_item.username,
            user_level = user_item.user_level,
            btc_balance = user_item.btc_balance,
            rc_balance = user_item.rc_balance,
            email_address = user_item.email_address,
            email_ver_flag = user_item.email_ver_flag,
            newsletter_flag = user_item.newsletter_flag,
            referral_program = user_item.referral_program,
            referrer = user_item.referrer,
            free_play = user_item.free_play,
            last_active = user_item.last_active,
            currency = user_item.currency;
    
            btc_accumulator = add(btc_accumulator, btc_balance);
            rc_accumulator = add(rc_accumulator, rc_balance);
        
            if (email_address === "") 
                {
                email_address = "";
                email_ver_flag = "";
                newsletter_flag = "";
                }
                
            if (referrer === "") referral_program = "";
            
            user_report_array.push([
                created,
                user_id,
                username,
                user_level,
                btc_balance,
                rc_balance,
                email_address,
                email_ver_flag,
                newsletter_flag,
                referral_program,
                referrer,
                last_login,
                free_play,
                last_active,
                currency
            ]);
            }
        var red_alert = "rgb(230,0,0)";
        id("number_of_users").innerHTML = number_of_users + " users";
        id("ledger_balance_btc").innerHTML = btc_accumulator.toFixed(8) + " BTC";
        id("ledger_balance_rc").innerHTML = rc_accumulator.toFixed(8) + " RC";
        if (btc_accumulator !== 0) id("ledger_balance_btc").style.color = red_alert;
        if (rc_accumulator !== 0) id("ledger_balance_rc").style.color = red_alert;
        }

    function get_username_for_id(user_id)
        {
        for (var i=0; i<number_of_users; i++)
            {
            if (user_report_array[i][1] === user_id) return user_report_array[i][2];
            }
        }
        
    function sort_user_report()
        {
        var 

        simple_user_report = simple_user_report_checkbox.checked,
        exclude_internal_accounts = exclude_internals_checkbox.checked;

        var table = new_table("user_report_table"),
        row_count = 0,
        header;

        if (simple_user_report)
            {
            header = new_row(table, row_count++, [
                "Username",
                "Level",
                "BTC",
                "RC"
            ]);
            
            header[3].style.textAlign = "right";
            header[4].style.textAlign = "right";
            }
        else
            {
            header = new_row(table, row_count++, [
                "Username",
                "Last active",
                "Last login",
                "Joined",
                "BTC",
                "RC",
                "E-mail",
                "Verified",
                "Subscribed",
                "Referral PGM",
                "Referrer",
                "Currency",
                "Level"
            ]);

            header[5].style.textAlign = "right";
            header[6].style.textAlign = "right";
            header[10].style.textAlign = "right";
            }

        // style headers:
        
        for (var i=1; i<header.length; i++) header[i].className = "header_cell";
        
        // sort report:
        
        switch (user_report_sort_selector.selectedIndex)
            {
            case 0: // Last Active
                user_report_array.sort(function(a, b)
                    {
                    return b[13] - a[13];
                    });
                break;
            case 1: // Last Login
                user_report_array.sort(function(a, b)
                    {
                    return b[11] - a[11];
                    });
                break;
            case 2: // Created date
                user_report_array.sort(function(a, b)
                    {
                    return b[0] - a[0];
                    });
                break;
            case 3: // AlphaNumeric
                user_report_array.sort(function(a, b)
                    {
                    a = a[2].toLowerCase();
                    b = b[2].toLowerCase();
                    return (a === b ? 0 : (a < b ? -1 : 1));
                    });
                break;
            case 4: // BTC Balance High to Low
                user_report_array.sort(function(a, b)
                    {
                    return b[4] - a[4];
                    });
                break;
            case 5: // RC Balance High to Low
                user_report_array.sort(function(a, b)
                    {
                    return b[5] - a[5];
                    });
                break;
            }
        
        // create rows:
        
        for (var i=0; i<number_of_users; i++)
            {
            var show_row = true,
            
            user_item = user_report_array[i],
                    
            created = user_item[0],
            //user_id = user_item[1], * not used here
            username = user_item[2],
            user_level = user_item[3],
            btc_balance = toBTC(user_item[4], true, true),
            rc_balance = toBTC(user_item[5], true, true),
            email_address = user_item[6],
            email_ver_flag = user_item[7],
            newsletter_flag = user_item[8],
            referral_program = user_item[9],
            referrer = user_item[10],
            last_login = user_item[11],
            free_play = user_item[12],
            last_active = user_item[13],
            currency = user_item[14];
    
            if (referrer !== "") referrer = get_username_for_id(referrer);
    
            created = dateconv_ms_to_string(created);
            
            switch (user_level)
                {
                case 0:
                    user_level = "normal";
                    break;
                case 1:
                    user_level = "admin";
                    break;
                case 2:
                    if (exclude_internal_accounts) continue;
                    user_level = "internal";
                    break;
                case 3:
                    user_level = "unverified";
                    break;
                case 4:
                    user_level = "score_bot";
                    break;
                default:
                    user_level = "unknown level";
                }
    
            if (email_ver_flag === 1) email_ver_flag = "yes";
            else email_ver_flag = "";
            
            if (newsletter_flag === 1) newsletter_flag = "yes";
            else newsletter_flag = "";

            if (last_login === 0) last_login = "";
            else last_login = timeSince(last_login);
    
            if (last_active === 0) last_active = "";
            else last_active = timeSince(last_active);
            
            if (show_row) 
                {
                if (simple_user_report)
                    {
                    var row = new_row(table, row_count++, [
                        username,
                        user_level,
                        btc_balance,
                        rc_balance
                    ]);

                    row[3].style.textAlign = "right";
                    row[4].style.textAlign = "right";
                    }
                else
                    {
                    var row = new_row(table, row_count++, [
                        username,
                        last_active,
                        last_login,
                        created,
                        btc_balance,
                        rc_balance,
                        email_address,
                        email_ver_flag,
                        newsletter_flag,
                        referral_program,
                        referrer,
                        currency,
                        user_level
                    ]);

                    row[5].style.textAlign = "right";
                    row[6].style.textAlign = "right";
                    row[10].style.textAlign = "right";
                    }
                }
            }
        }
            
/*----------------------------------------------------------------------*/

    // Transaction report - setup
    
    var 
    
    number_of_transactions,
    transaction_report_array = [],
    
    transaction_type_selector = id("transaction_type_selector"),
    contest_filter_selector = id("contest_filter_selector"),
    user_filter_selector = id("user_filter_selector"),
    
    now = new Date(),
    now_ms = now.getTime(),
    ms_per_day = (86400 * 1000),
            
    left_date = now_ms - ms_per_day * 7,
    right_date = now_ms,
    
    min_date = null,
    max_date = now_ms;
    
    initialize_linked_calendars
        (
        id("transaction_date_start_tcal"), 
        id("transaction_date_end_tcal"), 
        left_date, 
        right_date,
        min_date,
        max_date
        );

    transaction_type_selector.onchange = function()
        {
        populate_transaction_report_table();
        };
        
    user_filter_selector.onchange = function()
        {
        populate_transaction_report_table();
        };
        
    contest_filter_selector.onchange = function()
        {
        populate_transaction_report_table();
        };

    // Transaction report - action

    function transaction_report()
        {
        var 
        
        start_date_ms = id("transaction_date_start_tcal").date_ms, 
        end_date_ms = id("transaction_date_end_tcal").date_ms;

        start_date_ms = ((start_date_ms / ms_per_day) | 0) * ms_per_day;
        end_date_ms = ((end_date_ms / ms_per_day) | 0) * ms_per_day + ms_per_day;

        var hide_trans = id("transactions_hiderisk_reversals").checked;
            
        api({
            method: "TransactionReport",
            args: {
                start_date_ms: start_date_ms,
                end_date_ms: end_date_ms,
                request_source: "admin_panel",
                hide_trans: hide_trans
            }
        }, function(call)
            {
            if (call.status === "1") 
                {
                transaction_report_array = call.transaction_report;
                number_of_transactions = transaction_report_array.length;
                
                populate_transaction_report_table();
                }
            });
        }
        
    function populate_transaction_report_table()
        {
        var table = new_table("transaction_report_table"),
        row_count = 0,
        there_are_rows = false;

        if (number_of_transactions > 0)
            {
            var

            type_filtering_on = false,
            user_filtering_on = false,
            contest_filtering_on = false,

            trans_type_filter = selectorHTML(transaction_type_selector),
            user_filter = selectorValue(user_filter_selector),
            contest_filter = selectorValue(contest_filter_selector),
            
            unique_contests = [];

            if (trans_type_filter !== "") type_filtering_on = true;
            if (user_filter !== "") user_filtering_on = true;
            if (contest_filter !== "") contest_filtering_on = true;
            else contest_filter_selector.innerHTML = "<option></option>";

            // create rows:

            for (var i=number_of_transactions-1; i>=0; i--)
                {
                var show_row = true,

                transaction_item = transaction_report_array[i],

                transaction_id = transaction_item.transaction_id,
                created = transaction_item.created,
                created_by = transaction_item.created_by,
                trans_type = transaction_item.trans_type,
                from_account = transaction_item.from_account,
                to_account = transaction_item.to_account,
                amount = transaction_item.amount,
                from_currency = transaction_item.from_currency,
                to_currency = transaction_item.to_currency,
                memo = transaction_item.memo,
                pending_flag = transaction_item.pending_flag,
                contest_id = transaction_item.contest_id,
                cancelled_flag = transaction_item.cancelled_flag;

                var contest_string = "";
                
                if (contest_id === 0) contest_id = "";
                else contest_string = "<a href='/contest.html?id=" + contest_id + "'>" + contest_id + "</a?";
                
                if (type_filtering_on)
                    {
                    switch (trans_type_filter)
                        {
                        case "ALL-PROMOS" :
                            if (trans_type !== "BTC-PROMO-FREEPLAY" && trans_type !== "BTC-DEPOSIT-BONUS") show_row = false;
                            break;
                        case "ALL-DEPOSITS" :
                            if (trans_type !== "BTC-DEPOSIT" && trans_type !== "RC-DEPOSIT") show_row = false;
                            break;
                        case "ALL-WITHDRAWALS" :
                            if (trans_type !== "BTC-WITHDRAWAL" && trans_type !== "RC-WITHDRAWAL") show_row = false;
                            break;
                        case "ALL-CONTEST-ENTRIES" :
                            if (trans_type !== "BTC-CONTEST-ENTRY" && trans_type !== "RC-CONTEST-ENTRY") show_row = false;
                            break;
                        default :
                            if (trans_type !== trans_type_filter) show_row = false;
                            break;
                        }
                    }
                
                if (user_filtering_on && !(from_account === user_filter || to_account === user_filter)) show_row = false;
                
                if (contest_filtering_on && !(contest_id === +contest_filter)) show_row = false;
                else if (!unique_contests.contains(contest_id)) unique_contests.push(contest_id);
                
                if (show_row)
                    {
                    there_are_rows = true;
                    
                    var
                    
                    created_date = dateconv_ms_to_string(created),
                    created_time = dateconv_ms_to_time(created);
            
                    created_by = get_username_for_id(created_by);
                    from_account = get_username_for_id(from_account);
                    to_account = get_username_for_id(to_account);
                    
                    var 
                    
                    pending = pending_flag === "1" ? "YES" : "",
                    cancelled = cancelled_flag === 1 ? "YES" : "";

                    var row = new_row(table, row_count++, [
                        transaction_id,
                        created_date,
                        created_time,
                        created_by,
                        trans_type,
                        contest_string,
                        from_account,
                        to_account,
                        amount,
                        from_currency,
                        to_currency,
                        memo,
                        pending,
                        cancelled
                    ]);
                    
                    row[1].style.textAlign = "right";
                    row[6].style.textAlign = "right";
                    row[9].style.textAlign = "right";
                    }
                }
                
            unique_contests.sort(function(a, b)
                {
                return b - a;
                });
                
            for (var i=0, limit = unique_contests.length; i<limit; i++)
                {
                var 

                contest_id = unique_contests[i],
                option = document.createElement("option");
                option.value = contest_id;
                option.innerHTML = contest_id;
                contest_filter_selector.appendChild(option);
                } 

            $(contest_filter_selector).trigger("chosen:updated");
            }

        if (there_are_rows)
            {
            var header = new_row(table, 0, [
                "#",
                "Date",
                "Time",
                "Created By",
                "Type",
                "Contest",
                "From",
                "To",
                "Amount",
                "From Currency",
                "To Currency",
                "Memo",
                "Pending",
                "Cancelled"
            ]);
            // style headers:

            for (var i=1; i<header.length; i++) header[i].className = "header_cell";
            
            header[1].style.textAlign = "center";
            header[6].style.textAlign = "right";
            header[9].style.textAlign = "right";
            }
        else id("transaction_report_table").innerHTML = "No transactions match your criteria";
        }
        
/*----------------------------------------------------------------------*/

    // New Transaction
    
    user_report_array.sort(function(a, b)
        {
        a = a[2].toLowerCase();
        b = b[2].toLowerCase();
        return (a === b ? 0 : (a < b ? -1 : 1));
        });

    var 
    
    user_selectors = document.getElementsByClassName("user_selector"),
            
    new_trans_selector = id("new_trans_selector"),
    new_transaction_type = 0;
    
    new_trans_selector.onchange = function()
        {
        var view_id = new_trans_selector.selectedIndex;
        show_new_trans_view(view_id);
        };
    
    for (var s=0; s<user_selectors.length; s++)
        {
        var selector = user_selectors[s];
        
        for (var i=0; i<number_of_users; i++)
            {
            var 

            user_item = user_report_array[i],

            user_id = user_item[1],
            username = user_item[2],
            user_level = user_item[3];

            // we allow filtering on internal accounts in transaction report:
            //if (user_level === 2 && selector.className.indexOf("include_internal_accounts") === -1) continue;
  
            var option = document.createElement("option");
            option.value = user_id;
            option.innerHTML = username;
            selector.appendChild(option);
            }
        $(selector).trigger("chosen:updated");
        }

    function show_new_trans_view(view_id)
        {
        if (view_id !== new_transaction_type)
            {
            id("new_trans_view_" + view_id).style.visibility = "visible";
            id("new_trans_view_" + new_transaction_type).style.visibility = "hidden";
            new_transaction_type = view_id;
            }
        }
        
    function new_trans_user_balance(selector_element, currency)
        {
        var 
        
        user_id = selectorValue(selector_element),
        currency_index = currency === "BTC" ? 4 : 5,
        balance = "";

        for (var i=0; i<number_of_users; i++)
            {
            if (user_report_array[i][1] === user_id)
                {
                balance = user_report_array[i][currency_index];
                break;
                }
            }
        selector_element.parentElement.nextElementSibling.innerHTML = balance;
        }
        
    function submit_new_trans()
        {
        var 
        
        transaction_view = id("new_trans_view_" + new_transaction_type),
        transaction_type = transaction_view.getElementsByClassName("new_transaction_type")[0].innerHTML,
        display_as_adjustment = selectorHTML("display_as_adjustment_selector"),
        user_account = selectorValue(transaction_view.getElementsByClassName("user_selector")[0]),
        transaction_user_balance = transaction_view.getElementsByClassName("transaction_user_balance")[0].innerHTML,
        transaction_amount = transaction_view.getElementsByClassName("transaction_amount")[0].value,
        transaction_memo = transaction_view.getElementsByClassName("transaction_memo")[0].value;

        if (user_account === "") return alert("No user selected");
        
        if (transaction_amount === "") return alert("Please enter an amount");
        transaction_amount = Number(transaction_amount);
        if (isNaN(transaction_amount)) return alert("Amount is not a number");
        if (transaction_amount <= 0) return alert("Amount cannot be less than or equal to 0");

        // for withdrawals, amounnt cannot be greater than balance:
        
        if (transaction_type === "BTC-WITHDRAWAL" || transaction_type === "RC-WITHDRAWAL")
            {
            if (transaction_amount > Number(transaction_user_balance)) return alert("User has insufficient funds");
            }
            
        if (display_as_adjustment === "Yes") display_as_adjustment = true;
        else display_as_adjustment = false;

        var call = api({
            method: "CreateTransaction",
            args: {
                transaction_type: transaction_type,
                display_as_adjustment: display_as_adjustment,
                user_account: user_account,
                amount: transaction_amount,
                memo: transaction_memo
            }
        });
        
        if (call.status === "1") 
            {
            alert("Transaction created! Reloading panel.");
            location.reload();
            }
        else alert("Error: " + call.error);
        }
        

    function transfer_funds()
        {
        var 
        transaction_view = id("new_trans_view_" + new_transaction_type),
        transaction_type = transaction_view.getElementsByClassName("new_transaction_type")[0].innerHTML,
        display_as_adjustment = selectorHTML("display_as_adjustment_selector"),
        sender_account = selectorValue(transaction_view.getElementsByClassName("user_selector")[0]),
        sender_balance = transaction_view.getElementsByClassName("transaction_user_balance")[0].innerHTML,
        receiver_account = selectorValue(transaction_view.getElementsByClassName("user_selector")[1]),
        receiver_balance = transaction_view.getElementsByClassName("transaction_user_balance")[1].innerHTML,
        transaction_amount = transaction_view.getElementsByClassName("transaction_amount")[0].value,
        transaction_memo = transaction_view.getElementsByClassName("transaction_memo")[0].value;
            
        if (sender_account === "") return alert("No sender account selected");
        if (receiver_account === "") return alert("No receiver account selected");
        if (transaction_amount === "") return alert("Please enter an amount");
        transaction_amount = Number(transaction_amount);
        if (isNaN(transaction_amount)) return alert("Amount is not a number");
        if (transaction_amount <= 0) return alert("Amount cannot be less than or equal to 0");
        if(sender_account === receiver_account) return alert("Cannot transfer to/from the same account");
        if (transaction_amount > Number(sender_balance)) return alert("Sender has insufficient funds");
                    
        if (transaction_type === "BTC-USER-TRANSFER") btc_rc = "BTC"
        else btc_rc = "RC"
    
        var call = api({
            method: "TransferFunds_Admin",
            args: {
                sender: sender_account,
                receiver: receiver_account,
                amount: transaction_amount,
                memo: transaction_memo,
                btc_rc: btc_rc
            }
        });
        
        if (call.status === "1") 
            {
            alert("Transaction created! Reloading panel.");
            location.reload();
            }
        else alert("Error: " + call.error);
        }

/*----------------------------------------------------------------------*/

    // Pending Referrals
    
    var referral_report_array = null;
    
    function referral_report()
        {
        if (referral_report_array !== null) return;
          
        var call = api({
            method: "ReferralReport",
            args: {}
        });
        
        referral_report_array = call.referral_report;
        
        var number_of_referrals = referral_report_array.length,
        table = new_table("referral_report_table"),
        row_count = 0;

        if (number_of_referrals > 0)
            {
            // create rows:
            
            referral_report_array.sort(function(a, b)
                {
                return a.created - b.created;
                });

            for (var i=number_of_referrals-1; i>=0; i--)
                {
                var referral_item = referral_report_array[i],
                    
                created = referral_item.created,
                created_date = dateconv_ms_to_string(created),
                created_time = dateconv_ms_to_time(created),
                referral_key = referral_item.referral_key,
                referrer_username = referral_item.referrer_username,
                email_address = referral_item.email_address,
                referral_pgm = referral_item.referral_program,
                promo_code = referral_item.promo_code;
        
                if (typeof promo_code === "undefined") promo_code = "";

                var row = new_row(table, row_count++, [
                    created_date,
                    created_time,
                    referrer_username,
                    email_address,
                    referral_pgm,
                    promo_code,
                    referral_key
                ]);
                
                row[5].style.textAlign = "right";
                }
                
            var header = new_row(table, 0, [
                "Date",
                "Time",
                "Referrer",
                "To",
                "Refferal PGM",
                "Promo code",
                "Key"
            ]);
            // style headers:

            for (var i=1; i<header.length; i++) header[i].className = "header_cell";
            }
        else 
            {
            id("referral_report_table").innerHTML = "No pending referrals";
            referral_report_array = "not null";
            }
        }
        
/*----------------------------------------------------------------------*/

    // Cash Register
    
    function get_cash_register()
        {
        get_cash_register_address();
        get_pending_withdrawals();
        get_pending_deposits();
        get_quickbt_deposits();
        }
    
    function get_cash_register_address()
        {
        var call = api({
            method: "GetExtAddress",
            args: {
                get_for_active_user: false
            }
        });
        
        if (call.status === "1") 
            {
            if (call.has_ext_address === "1") id("cash_register_address").value = call.ext_address;
            }
        else
            {
            alert("Error: could not look up cash register address");
            }
        }
        
    function update_cash_register_address()
        {
        var cash_register_address = id("cash_register_address").value;
        
        var do_update = true;
        
        if (cash_register_address === "")
            {
            do_update = confirm("Are you sure you want to have NO cash register address?");
            }
        
        if (do_update) 
            {
            var call = api({
                method: "UpdateExtAddress",
                args: {
                    ext_address: cash_register_address,
                    update_for_active_user: false
                }
            });
            
            if (call.status === "1")
                {
                alert("Cash register address has been updated!");
                }
            else alert("Problem while updating cash register");
            }
        }
    
    function update_cold_storage_balance()
        {
        var amount = id("cold_storage_balance").value;
        api(
            {
                method: "UpdateColdStorageBalance",
                args: {
                    amount: Number(amount)
                }
            }, function (call) {
                if (call.status === "1")
                    {
                    window.location.reload();
                    return alert ("Cold storage balance updated");
                    }
                else alert("Problem while updating balance");
            });
        }

    function get_pending_withdrawals()
        {
        var call = api({ method: "GetPendingWithdrawals", args: {} });
        
        if (call.status === "1")
            {
            var
            
            pending_withdrawal_array = call.pending_withdrawals,
            number_of_transactions = pending_withdrawal_array.length,
            table = new_table("pending_withdrawal_table"),
            row_count = 0;
    
            if (number_of_transactions > 0)
                {
                for (var i=0; i<number_of_transactions; i++)
                    {
                    var transaction_item = pending_withdrawal_array[i],

                    transaction_id = transaction_item.transaction_id,
                    created = transaction_item.created,
                    created_date = dateconv_ms_to_string(created),
                    created_time = dateconv_ms_to_time(created),
                    trans_type = transaction_item.trans_type,
                    from_account = transaction_item.from_account,
                    amount = transaction_item.amount,
                    from_currency = transaction_item.from_currency,
                    ext_address = transaction_item.ext_address;

                    from_account = get_username_for_id(from_account);
                    
                    amount = toBTC(amount, true);
                    
                    if (typeof ext_address === "undefined") ext_address = "n/a";

                    var row = new_row(table, row_count++, [
                        transaction_id,
                        created_date,
                        created_time,
                        trans_type,
                        from_account,
                        amount,
                        from_currency,
                        ext_address
                        /*"<button onclick=\"finalize_pending_withdrawal(" + transaction_id + "," + amount + ",'" + ext_address + "')\">Bitcoins have been sent</button>"*/
                    ]);

                    row[1].style.textAlign = "right";
                    row[6].style.textAlign = "right";
                    }
                
                var header = new_row(table, 0, [
                    "#",
                    "Date",
                    "Time",
                    "Type",
                    "User",
                    "Amount",
                    "Currency",
                    "Withdrawal wallet"
                ]);
                // style headers:

                for (var i=1; i<header.length; i++) header[i].className = "header_cell";
       
                header[1].style.textAlign = "center";
                header[6].style.textAlign = "right";
                }
            else id("pending_withdrawal_table").innerHTML = "None";
            }
        else id("pending_withdrawal_table").innerHTML = "Error getting transactions";
        }
    
    function get_pending_deposits()
        {
        var call = api({ method: "GetPendingDeposits", args: {} });
        
        if (call.status === "1")
            {
            var
            
            pending_deposit_array = call.pending_deposits,
            number_of_transactions = pending_deposit_array.length,
            table = new_table("pending_deposit_table"),
            row_count = 0;
    
            if (number_of_transactions > 0)
                {
                for (var i=0; i<number_of_transactions; i++)
                    {
                    var transaction_item = pending_deposit_array[i],

                    transaction_id = transaction_item.transaction_id,
                    created = transaction_item.created,
                    created_date = dateconv_ms_to_string(created),
                    created_time = dateconv_ms_to_time(created),
                    trans_type = transaction_item.trans_type,
                    to_account = transaction_item.to_account,
                    amount = transaction_item.amount,
                    to_currency = transaction_item.to_currency,
                    ext_address = transaction_item.ext_address,
                    
                    user_id = to_account;

                    to_account = get_username_for_id(to_account);
                    
                    amount = toBTC(amount, true);
                    
                    if (typeof ext_address === "undefined") ext_address = "n/a";

                    var row = new_row(table, row_count++, [
                        transaction_id,
                        created_date,
                        created_time,
                        trans_type,
                        to_account,
                        amount,
                        to_currency,
                        ext_address,
                        "<button onclick=\"populate_pending_deposit(" + transaction_id + "," + amount + ",'" + user_id + "')\">Complete deposit</button>" + 
                        "&nbsp;" +
                        "<button onclick=\"cancel_pending_deposit(" + transaction_id + ")\">Cancel transaction</button>"
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
                    "Type",
                    "User",
                    "Amount",
                    "Currency",
                    "Funds from",
                    "Action"
                ]);
                // style headers:

                for (var i=1; i<header.length; i++) header[i].className = "header_cell";
       
                header[1].style.textAlign = "center";
                header[6].style.textAlign = "right";
                }
            else id("pending_deposit_table").innerHTML = "None";
            }
        else id("pending_deposit_table").innerHTML = "Error getting transactions";        
        }
    
    function get_quickbt_deposits()
        {
        var call = api({ method: "GetQuickbtDeposits", args: {} });
        
        if (call.status === "1")
            {
            var
            
            quickbt_deposit_array = call.quickbt_deposits,
            number_of_transactions = quickbt_deposit_array.length,
            table = new_table("quickbt_deposit_table"),
            row_count = 0;
    
            if (number_of_transactions > 0)
                {
                for (var i=0; i<number_of_transactions; i++)
                    {
                    var transaction_item = quickbt_deposit_array[i],

                    quickbt_record_id = transaction_item.transaction_id,
                    user_id = transaction_item.user_id,
                    username = get_username_for_id(user_id),
                    passed_id = transaction_item.passed_id,
                    created = transaction_item.created,
                    created_date = dateconv_ms_to_string(created),
                    created_time = dateconv_ms_to_time(created),
                    completed = transaction_item.completed,
                    completed_date = dateconv_ms_to_string(completed),
                    completed_time = dateconv_ms_to_time(completed),
                    amount = "TBD";

                    var row = new_row(table, row_count++, [
                        quickbt_record_id,
                        created_date + " " + created_time,
                        completed_date + " " + completed_time,
                        username,
                        passed_id,
                        amount,
                        "<button onclick=\"populate_quickbt_deposit(" + quickbt_record_id + ",'" + user_id + "')\">Complete deposit</button>" + 
                        "&nbsp;" +
                        "<button onclick=\"cancel_quickbt_deposit(" + quickbt_record_id + ")\">Cancel transaction</button>"
                    ]);

                    // highlight if older than 30 days:
                    
                    if (new Date().getTime()-30*1440*60*1000 > created) row[2].style.background = "rgb(255,231,166)";
                    }
                
                var header = new_row(table, 0, [
                    "#",
                    "Created",
                    "Returned from QuickBT",
                    "User",
                    "QuickBT ID",
                    "Amount",
                    "Action"
                ]);

                for (var i=1; i<header.length; i++) header[i].className = "header_cell";
                }
            else id("quickbt_deposit_table").innerHTML = "None";
            }
        else id("quickbt_deposit_table").innerHTML = "Error getting transactions";        
        }
        
    function finalize_pending_withdrawal(transaction_id, amount, ext_address)
        {
        var funds_sent = confirm("Are you sure you have sent\n\n" + toBTC(amount, true) + "\n\nto\n\n" + ext_address + "\n\n?");
        if (funds_sent)
            {
            var call = api({ 
                method: "FinalizePendingWithdrawal", 
                args: {
                    transaction_id: transaction_id
                } 
            });

            if (call.status === "1")
                {
                alert("Transaction created! Reloading panel.");
                location.reload();
                }
            else alert("Error: " + call.error);
            }
        }
        
    function populate_pending_deposit(transaction_id, amount, user_id)
        {
        id("pending_deposit_transaction_id").innerHTML = transaction_id;
        id("pending_deposit_username").innerHTML = get_username_for_id(user_id);
        id("pending_deposit_user_id").innerHTML = user_id;
        id("pending_deposit_intended_amount").innerHTML = toBTC(amount, true);
        id("pending_deposit_memo").innerHTML = "Completed pending deposit (Trans #" + transaction_id + ")";
        show("pending_deposit_window");
        }
                
    function populate_quickbt_deposit(transaction_id, user_id)
        {
        id("quickbt_deposit_record_id").innerHTML = transaction_id;
        id("quickbt_deposit_username").innerHTML = get_username_for_id(user_id);
        id("quickbt_deposit_user_id").innerHTML = user_id;
        id("quickbt_deposit_memo").innerHTML = "Received from QuickBT (ID: " + transaction_id + ")";
        show("quickbt_deposit_window");
        }
        
    function finalize_pending_deposit()
        {
        var 
        
        user_account_id = id("pending_deposit_user_id").innerHTML,
        transaction_amount = id("pending_deposit_received_amount").value,
        transaction_memo = id("pending_deposit_memo").innerHTML;

        if (user_account_id === "") return alert("No user selected");
        
        if (transaction_amount === "") return alert("Please enter an amount");
        transaction_amount = Number(transaction_amount);
        if (isNaN(transaction_amount)) return alert("Amount is not a number");
        if (transaction_amount <= 0) return alert("Amount cannot be less than or equal to 0");

        var call = api({ 
            method: "FinalizePendingDeposit", 
            args: {
                user_account_id: user_account_id,
                transaction_id: id("pending_deposit_transaction_id").innerHTML,
                received_amount: transaction_amount,
                memo: transaction_memo
            } 
        });
        
        if (call.status === "1") 
            {
            alert("Transaction created! Reloading panel.");
            location.reload();
            }
        else alert("Error: " + call.error);
        }
        
    function finalize_quickbt_deposit()
        {
        var 
        
        user_account_id = id("quickbt_deposit_user_id").innerHTML,
        transaction_amount = id("quickbt_deposit_received_amount").value,
        transaction_memo = id("quickbt_deposit_memo").innerHTML;

        if (transaction_amount === "") return alert("Please enter an amount");
        transaction_amount = Number(transaction_amount);
        if (isNaN(transaction_amount)) return alert("Amount is not a number");
        if (transaction_amount <= 0) return alert("Amount cannot be less than or equal to 0");

        var call = api({ 
            method: "FinalizeQuickbtDeposit", 
            args: {
                user_account_id: user_account_id,
                quickbt_record_id: id("quickbt_deposit_record_id").innerHTML,
                received_amount: transaction_amount,
                memo: transaction_memo
            } 
        });
        
        if (call.status === "1") 
            {
            alert("Transaction created! Reloading panel.");
            location.reload();
            }
        else alert("Error: " + call.error);
        }
        
    function cancel_pending_deposit(transaction_id)
        {
        var do_cancel = confirm("Are you sure you want to cancel pending deposit #" + transaction_id + "?");
        if (do_cancel)
            {
            api({ 
                method: "CancelPendingDeposit", 
                args: {
                    transaction_id: transaction_id
                } 
            }, function(call)
                {
                if (call.status === "1") 
                    {
                    alert("Transaction cancelled! Reloading panel.");
                    location.reload();
                    }
                else alert(call.error);
                });
            }
        }
        
    function cancel_quickbt_deposit(quickbt_record_id)
        {
        var do_cancel = confirm("Are you sure you want to cancel QuickBT deposit #" + quickbt_record_id + "?");
        if (do_cancel)
            {
            api({ 
                method: "CancelQuickbtDeposit", 
                args: {
                    quickbt_record_id: quickbt_record_id
                } 
            }, function(call)
                {
                if (call.status === "1") 
                    {
                    alert("Transaction cancelled! Reloading panel.");
                    location.reload();
                    }
                else alert(call.error);
                });
            }
        }
        
/*----------------------------------------------------------------------*/

    // Passwords
    
    id("password_key").value = "";
    
    function show_passwords()
        {
        var key = id("password_key").value;

        var call = api({
            method: "ShowPasswords",
            args: {
                key: key
            }
        });
        
        if (call.status === "1") id("password_textarea").value = call.password_blob;
        else
            {
            clear_fields();
            alert("Wrong key");
            }
        }
    
    function update_passwords()
        {
        var 
        
        key = id("password_key").value,
        blob = id("password_textarea").value;

        if (blob === "") return alert("Text area is blank!");
        
        var do_it = confirm('Are you sure you want to update passwords?');
        
        if (do_it)
            {
            var call = api({
                method: "UpdatePasswords",
                args: {
                    key: key,
                    blob: blob
                }
            });

            if (call.status === "1")
                {
                clear_fields();
                alert("Encrypted password blob has been updated!");
                }
            else
                {
                id("password_key").value = "";
                alert(call.error);
                }
            }
        }
    
    function change_key()
        {
        var 
        
        key = id("password_key").value,
        new_key = id("new_password_key").value,
        confirm_key = id("confirm_password_key").value;

        if (key === "") return alert("Please enter current key");
        if (new_key === "") return alert("Please enter new key");
        if (confirm_key === "") return alert("Please confirm new key");
        if (new_key !== confirm_key) return alert("Keys do not match");
        
        var call = api({
            method: "ChangePasswordKey",
            args: {
                key: key,
                new_key: new_key
            }
        });

        clear_fields();
        
        if (call.status === "1") alert("Encryption key has been updated!");
        else alert(call.error);
        }
    
    function clear_fields()
        {
        id("password_key").value = "";
        id("new_password_key").value = "";
        id("confirm_password_key").value = "";
        id("password_textarea").value = "";
        }

/*----------------------------------------------------------------------*/

    // Notify user
    
    function notify_user()
        {
        var 
        
        user_id = selectorValue("notify_user_selector"),
        subject = id("notify_user_subject").value.trim(),
        message = tinyMCE.get("notify_user_textarea").getContent();

        if (user_id === "") return alert("Please select a user");

        api({ 
            method: "NotifyUser", 
            args: {
                user_id: user_id,
                subject: subject,
                message: message
            } 
        }, function(call)
            {
            if (call.status === "1") 
                {
                alert("User has been notified! Reloading panel.");
                location.reload();
                }
            else alert(call.error);
            });
        }   
