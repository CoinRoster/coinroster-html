    var 

    simple_modal_open_big = false,
    simple_modal_shade_big = id("simple_modal_shade_big"),
    simple_modal_centering_container_big = id("simple_modal_centering_container_big"),
    simple_modal_close_big = id("simple_modal_close_big"),
    simple_modal_callback_big = null;

    simple_modal_close_big.onclick = function() 
    {
        hide_simple_modal_big();
    };

    simple_modal_centering_container_big.onclick = function(e) 
    {
        if (e.target.id === "") hide_simple_modal_big();
    };

    function close_on_enter_big(e)
    {
        if (simple_modal_open_big && e.keyCode === 13)
        {
            hide_simple_modal_big();
            e.preventDefault();
        }
    }

    if (window.addEventListener) 
    {
        window.addEventListener('keydown', close_on_enter_big, false); 
    } 
    else if (window.attachEvent)  
    {
        window.attachEvent('onkeydown', close_on_enter_big);
    }

    function show_simple_modal_big(modal_text, good_bad, callback)
    {
        // id("simple_modal_text_big").innerHTML = modal_text;

        var border_color = "";
        if (good_bad === "good") border_color = cr_teal;
        else if (good_bad === "bad") border_color = "orange";
        id("simple_modal_window_big").style.borderColor = border_color;
            //id("simple_modal_centering_container").style.top = window.pageYOffset + "px";
            
            if (callback !== null)
            {
                simple_modal_callback_big = function()
                {
                    callback();
                };
            }

            show(simple_modal_shade_big);
            show(simple_modal_centering_container_big, "table");
            
            simple_modal_open_big = true;
        }

        function hide_simple_modal_big()
        {
            hide(simple_modal_shade_big);
            hide(simple_modal_centering_container_big);
            if (simple_modal_callback_big !== null)
            {
                simple_modal_callback_big();
                simple_modal_callback_big = null;
            }
            simple_modal_open_big = false;
        }