
    function action_on_tab_change(selection)
        {
        switch(selection)
            {
            case 0: /* Affiliate Report */
                break;
            case 1: /* Default Referral Offer */
                populate_default_offer();
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
