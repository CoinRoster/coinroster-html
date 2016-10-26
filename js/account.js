    function get_btc_balance()
        {
        var account_data = api({ method: "GetAccountDetails", args: {} });
        if (account_data.status === "1") return account_data.btc_balance;
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