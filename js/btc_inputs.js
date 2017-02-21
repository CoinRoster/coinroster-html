    function bind_btc_input(element, callback)
        {
        function input_toBTC()
            {
            var btc_value = toBTC(this.value, true);
            if (+btc_value === 0) btc_value = "";
            this.value = btc_value;
            if (callback !== null) callback(this);
            }
        if (window.addEventListener) 
            {
            element.removeEventListener('change', input_toBTC);
            element.addEventListener('change', input_toBTC, false); 
            } 
        else if (window.attachEvent)  
            {
            element.detachEvent('onchange', input_toBTC);
            element.attachEvent('onchange', input_toBTC);
            }
        }
    
    (function()
        {
        var btc_inputs = get_inputs_with_attribute("btc-input");
        for (var i=0; i<btc_inputs.length; i++) bind_btc_input(btc_inputs[i], null);
        })();

    /* usage:
    
        bind_btc_input(element, function(input)
            {
            do_something_else_to(input);
            });
    
    */