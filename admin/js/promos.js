
    function action_on_tab_change(selection)
        {
        switch(selection)
            {
            case 0: /* Affiliate Report */
                break;
            case 1: /* Affiliate Revenue */
                populate_default_offer();
                break;
            case 2: /* Deposit Match */
                populate_deposit_bonus();
                break;
            case 3: /* Code Requests */
                promo_request_report();
                break;
            case 4: /* Create Promo Code */
                initialize_promo_expiry();
                initialize_referrer_selector();
                break;
            case 5: /* Active Promos */
                promo_report("active");
                break;
            case 6: /* Cancelled Promos */
                promo_report("cancelled");
                break;
            }
        }      
        
/*----------------------------------------------------------------------*/

    // Default referral offer

    function populate_default_offer()
        {
        api({
            method: "GetDefaultOffer",
            args: {}
        }, function(call)
            {
            if (call.status === "1")
                {
                var default_referral_offer = call.default_referral_offer;
                id("default_offer_input").value = default_referral_offer;
                }
            else alert(call.error);
            });
        }
        
    function update_default_offer()
        {
        var default_offer = id("default_offer_input").value;
        if (default_offer === "") return alert("Please enter a value");
        if (isNaN(default_offer)) return alert("Default offer must be a number");
        if (default_offer > 1) return alert("The default offer cannot be greater than 1");
        if (default_offer < 0) return alert("The default offer cannot be less than 1");
        api({
            method: "UpdateDefaultOffer",
            args: {
                default_referral_offer: default_offer
            }
        }, function(call)
            {
            if (call.status === "1")
                {
                alert("The default offer has been updated! Reloading panel.");
                location.reload();
                }
            else alert(call.error);
            });
        }   
                        
/*----------------------------------------------------------------------*/

    // Deposit match defaults

    function populate_deposit_bonus()
        {
        api({
            method: "GetDefaultDepositBonus",
            args: {}
        }, function(call)
            {
            if (call.status === "1")
                {
                var 
                
                deposit_bonus_cap = call.deposit_bonus_cap,
                deposit_bonus_rollover_multiple = call.deposit_bonus_rollover_multiple;
        
                id("deposit_bonus_cap_input").value = deposit_bonus_cap;
                id("deposit_bonus_rollover_input").value = deposit_bonus_rollover_multiple;
                }
            else alert(call.error);
            });
        }
        
    function update_deposit_bonus()
        {
        var 
        
        deposit_bonus_cap = id("deposit_bonus_cap_input").value,
        deposit_bonus_rollover_multiple = id("deposit_bonus_rollover_input").value;

        if (deposit_bonus_cap === "") return alert("Please enter a value for Deposit match cap");
        
        if (deposit_bonus_rollover_multiple === "") return alert("Please enter a value for Rollover");
        if (!isInt(deposit_bonus_rollover_multiple)) return alert("Rollover must be an integer");
        if (deposit_bonus_rollover_multiple <= 0) return alert("Rollover be 0 or less");
        
        api({
            method: "UpdateDefaultDepositBonus",
            args: {
                deposit_bonus_cap: deposit_bonus_cap,
                deposit_bonus_rollover_multiple: deposit_bonus_rollover_multiple
            }
        }, function(call)
            {
            if (call.status === "1")
                {
                alert("The Deposit Match has been updated! Reloading panel.");
                location.reload();
                }
            else alert(call.error);
            });
        }   
                
/*----------------------------------------------------------------------*/

    // Promo code requests
    
    function promo_request_report()
        {
        var call = api({ 
            method: "PromoRequestReport", 
            args: {}  
        });
    
        var 
        
        promo_request_report = call.promo_request_report,
        number_of_requests = promo_request_report.length,
        table = new_table("promo_request_report"),
        row_count = 0;

        for (var i=0; i<number_of_requests; i++)
            {
            var promo_request_item = promo_request_report[i],
                    
            request_id = promo_request_item.id,
            created = promo_request_item.created,
            created_date = dateconv_ms_to_string(created),
            created_time = dateconv_ms_to_time(created),
            created_string = created_date + " at " + created_time,
            user_id = promo_request_item.created_by,
            username = promo_request_item.created_by_username,
            requested_code = promo_request_item.requested_code;
            var row = new_row(table, row_count++, [
                request_id,
                created_string,
                username,
                requested_code,
                "<button onclick=\"approve_promo_request('" + btoa(requested_code) + "','" + user_id + "')\">Approve</button>",
                "<input id='promo_request_denial_reason_" + request_id + "' placeholder='Reason for denial - WILL BE EMAILED TO USER' type='text' class='input_style text_input' maxlength='200' style='width:500px'>&nbsp;" + 
                "<button onclick=\"deny_promo_request(" + request_id + ")\">Deny</button>"
            ]);
            }
            
        var header = new_row(table, 0, [
            "Id",
            "Created",
            "User",
            "Code request",
            "Approve",
            "Deny"
        ]);
        // style headers:

        for (var i=1; i<header.length; i++) header[i].className = "header_cell";
        }
        
    function approve_promo_request(requested_code, user_id)
        {
        requested_code = atob(requested_code);
        
        id("create_promo__code_input").value = requested_code;
        
        window.location.hash = "2";
        
        var interval = setInterval(function()
            { 
            var referrer_selector = id("create_promo__referrer_selector");
            
            if (referrer_selector.innerHTML.length > 100)
                {
                clearInterval(interval);
                selectByValue(referrer_selector, user_id);
                $(referrer_selector).trigger("chosen:updated");
                }
            }, 10);
        }
        
    function deny_promo_request(request_id)
        {
        var reason = id("promo_request_denial_reason_" + request_id).value;
        if (reason === "") return alert("You must supply a reason\n\nNOTE: THE REASON WILL BE EMAILED TO THE REQUESTING USER");
        api({
            method: "DenyPromoRequest",
            args: {
                request_id: request_id,
                reason: reason
            }
        }, function(call)
            {
            if (call.status === "1") 
                {
                alert("Promo request has been denied! Reloading panel.");
                location.reload();
                }
            else return alert(call.error);
            });
        }
        
/*----------------------------------------------------------------------*/

    // Create promo

    function initialize_promo_expiry()
        {
        var element = id("create_promo__deadline_tcal"),
        
        date_now = new Date().getTime(),
        min_date = date_now,
        max_date = null;

        initialize_calendar
            (
            element,
            date_now,
            min_date,
            max_date
            );
    
        element.value = "Select date";
        }

    function initialize_referrer_selector()
        {
        var create_promo__referrer_selector = id("create_promo__referrer_selector");
        api({
            method: "UserReport", 
            args: {}
        }, function(call)
            {
            if (call.status === "1") 
                {
                var user_report = call.user_report;

                for (var i=0, number_of_users = user_report.length; i<number_of_users; i++)
                    {
                    var user_item = user_report[i],
                    user_id = user_item.user_id,
                    username = user_item.username,
                    user_level = user_item.user_level;

                    if (user_level === 2) continue;

                    var option = document.createElement("option");
                    option.value = user_id;
                    option.innerHTML = username;
                    create_promo__referrer_selector.appendChild(option);
                    }

                $(create_promo__referrer_selector).trigger("chosen:updated");
                }
            });
        }
        
    function check_promo_code()
        {
        var promo_code = id("create_promo__code_input").value.trim();
        
        if (promo_code === "") return alert("Please enter a promo code");
        else 
            {
            api({
                method: "CheckPromoCode",
                args: {
                    promo_code: promo_code
                }
            }, function(call)
                {
                if (call.status === "1") return alert("Promo code [" + promo_code + "] is available");
                else 
                    {
                    id("create_promo__code_input").value = "";
                    return alert(call.error);
                    }
                });
            }
        }
        
    function create_promo()
        {
        var 
        
        promo_code = id("create_promo__code_input").value.trim(),
        description = id("create_promo__description_input").value,
        referrer = selectorValue("create_promo__referrer_selector"),
        free_play_amount = id("create_promo__freeplay_amount_input").value,
        rollover_multiple = id("create_promo__rollover_input").value,
        expires_input_value = id("create_promo__deadline_tcal").value,
        expires_date = dateconv_date_start_time(id("create_promo__deadline_tcal").date_ms),
        expires_time = selectorValue("create_promo__time_selector"),
        expires = expires_date + expires_time * 60 * 60 * 1000;

        if (promo_code === "") return alert("Please enter a promo code");
        if (description === "") return alert("Please enter a description");
        
        if (free_play_amount !== "") 
            {
            if (isNaN(free_play_amount)) return alert("Free play must be a number");
            if (free_play_amount < 0) return alert("Free play must be a positive number");
            }
        else free_play_amount = 0;
        
        if (free_play_amount === 0) return alert("Please enter a free play amount");
        
        if (rollover_multiple !== "") 
            {
            if (!isInt(rollover_multiple)) return alert("Rollover multiple must be an integer");
            if (rollover_multiple < 0) return alert("Rollover multiple must be a positive number");
            }
        else rollover_multiple = 0;

        if (rollover_multiple === 0) return alert("Please provide a rollover multiple");
        
        if (expires_input_value === "Select date") expires = 0;

        api({
            method: "CreatePromo",
            args: {
                promo_code: promo_code,
                description: description,
                referrer: referrer,
                free_play_amount: free_play_amount,
                rollover_multiple: rollover_multiple,
                expires: expires
            }
        }, function(call)
            {
            if (call.status === "1") 
                {
                alert("Promo has been created! Reloading panel.");
                location.reload();
                }
            else return alert(call.error);
            });
        }
                
/*----------------------------------------------------------------------*/

    function promo_report(active_cancelled)
        {
        var call = api({ 
            method: "PromoReport", 
            args: {
                active_cancelled: active_cancelled
            }  
        });
    
        var 
        
        promo_report = call.promo_report,
        number_of_promos = promo_report.length,
        table,
        header_data,
        row_count = 0,
        right_align_array;

        if (active_cancelled === "active") 
            {
            table = new_table("active_promo_report");
            header_data = [
                "Id",
                "Created",
                "Expires",
                "Approved by",
                "Promo code",
                "Description",
                "Affiliate",
                "Free-play amount",
                "Rollover multiple"
            ];
            right_align_array = [8,9];
            }
        else if (active_cancelled === "cancelled") 
            {
            table = new_table("cancelled_promo_report");
            header_data = [
                "Id",
                "Promo code",
                "Description",
                "Affiliate",
                "Free-play amount",
                "Rollover multiple",
                "Cancelled",
                "Cancelled by",
                "Reason"
            ];
            right_align_array = [5,6];
            }

        for (var i=0; i<number_of_promos; i++)
            {
            var promo_item = promo_report[i],
                    
            promo_id = promo_item.id,
            created = promo_item.created,
            expires = promo_item.expires,
            cancelled = promo_item.cancelled,
            approved_by = promo_item.approved_by,
            cancelled_by = promo_item.cancelled_by,
            promo_code = promo_item.promo_code,
            description = promo_item.description,
            referrer = promo_item.referrer,
            free_play_amount = promo_item.free_play_amount,
            rollover_multiple = promo_item.rollover_multiple,
            cancelled_reason = promo_item.cancelled_reason,
    
            created_date = dateconv_ms_to_string(created),
            created_time = dateconv_ms_to_time(created),
            created_string = created_date + " at " + created_time,
            
            expires_date = dateconv_ms_to_string(expires),
            expires_time = dateconv_ms_to_time(expires),
            expires_string = expires_date + " at " + expires_time,
            
            cancelled_date = dateconv_ms_to_string(cancelled),
            cancelled_time = dateconv_ms_to_time(cancelled),
            cancelled_string = cancelled_date + " at " + cancelled_time;
    
            if (created === 0) created_string = "";
            if (expires === 0) expires_string = "";
            if (cancelled === 0) cancelled_string = "";
            
            if (active_cancelled === "active")
                {
                var row = new_row(table, row_count++, [
                    promo_id,
                    created_string,
                    expires_string,
                    approved_by,
                    promo_code,
                    description,
                    referrer,
                    free_play_amount + " BTC",
                    rollover_multiple + "x",
                    "<button onclick=\"populate_cancel_promo(" + promo_id + ",'" + promo_code + "','" + description + "','"+ referrer + "')\">Cancel promo</button>"
                ]);
                }
            else if (active_cancelled === "cancelled")
                {
                var row = new_row(table, row_count++, [
                    promo_id,
                    promo_code,
                    description,
                    referrer,
                    free_play_amount,
                    rollover_multiple,
                    cancelled_string,
                    cancelled_by,
                    cancelled_reason
                ]);
                }

            right_align(row, right_align_array);
            }
            
        var header = new_row(table, 0, header_data);
        // style headers:

        for (var i=1; i<header.length; i++) header[i].className = "header_cell";
        
        right_align(header, right_align_array);
        }
        
    function populate_cancel_promo(promo_id, promo_code, description, referrer)
        {
        hide("active_promo_report");
        show("cancel_promo");
        
        id("cancel_promo_var__promo_code").value = promo_code;
        
        id("cancel_promo__promo_code").innerHTML = "Cancelling promo #" + promo_id + ": " + promo_code + " - " + description;
        
        if (referrer)
            {
            id("cancel_promo__affiliate").innerHTML = referrer;
            show("cancel_promo__affiliate_container");
            }
        }
        
    function unpopulate_cancel_promo()
        {
        hide("cancel_promo");
        hide("cancel_promo__affiliate_container");
        show("active_promo_report");
        id("cancel_promo_var__promo_code").value = "";
        id("cancel_promo__promo_code").innerHTML = "";
        id("cancel_promo__reason_input").value = "";
        id("cancel_promo__affiliate").innerHTML = "";
        }
        
    function cancel_promo()
        {
        var 
        
        promo_code = id("cancel_promo_var__promo_code").value,
        reason = id("cancel_promo__reason_input").value;

        if (reason === "") return alert("Please supply a reason");
        
        api({
            method: "CancelPromo",
            args: {
                promo_code: promo_code,
                reason: reason
            }
        }, function(call)
            {
            if (call.status === "1") 
                {
                alert("Promo has been cancelled! Reloading panel.");
                location.reload();
                }
            else return alert(call.error);
            });
        }
