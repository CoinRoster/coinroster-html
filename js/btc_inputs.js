    (function()
        {
        var btc_inputs = get_inputs_with_attribute("btc-input");

        function input_toBTC()
            {
            var btc_value = toBTC(this.value);
            if (+btc_value === 0) btc_value = "";
            this.value = btc_value;
            }

        for (var i=0; i<btc_inputs.length; i++)
            {
            if (window.addEventListener) 
                {
                btc_inputs[i].addEventListener('change', input_toBTC, false); 
                } 
            else if (window.attachEvent)  
                {
                btc_inputs[i].attachEvent('onchange', input_toBTC);
                }
            }
        })();