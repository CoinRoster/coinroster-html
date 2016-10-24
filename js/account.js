    function get_btc_balance()
        {
        var account_data = api({ method: "GetAccountDetails", args: {} });
        if (account_data.status === "1") return account_data.btc_balance;
        else return "DATA ERROR";
        }
    
    function get_ext_address()
        {
        var account_data = api({ method: "GetAccountDetails", args: {} });
        if (account_data.status === "1") return account_data.ext_address;
        else return "DATA ERROR";
        }