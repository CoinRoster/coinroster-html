    var 

    simple_modal_open = false,
    simple_modal_shade = id("simple_modal_shade"),
    simple_modal_centering_container = id("simple_modal_centering_container"),
    simple_modal_close = id("simple_modal_close"),
    simple_modal_callback = null;

    simple_modal_close.onclick = function() 
    {
        hide_simple_modal();
    };

    simple_modal_centering_container.onclick = function(e) 
    {
        if (e.target.id === "") hide_simple_modal();
    };

    function close_on_enter(e)
    {
        if (simple_modal_open && e.keyCode === 13)
        {
            hide_simple_modal();
            e.preventDefault();
        }
    }

    if (window.addEventListener) 
    {
        window.addEventListener('keydown', close_on_enter, false); 
    } 
    else if (window.attachEvent)  
    {
        window.attachEvent('onkeydown', close_on_enter);
    }

    function show_simple_modal(modal_text, good_bad, callback)
    {
        id("simple_modal_text").innerHTML = modal_text;
        
        var border_color = "";
        if (good_bad === "good") border_color = cr_teal;
        else if (good_bad === "bad") border_color = "orange";
        id("simple_modal_window").style.borderColor = border_color;
        //id("simple_modal_centering_container").style.top = window.pageYOffset + "px";
        
        if (callback !== null)
        {
            simple_modal_callback = function()
            {
                callback();
            };
        }

        show(simple_modal_shade);
        show(simple_modal_centering_container, "table");
        
        simple_modal_open = true;
    }

    function hide_simple_modal()
    {
        hide(simple_modal_shade);
        hide(simple_modal_centering_container);
        if (simple_modal_callback !== null)
        {
            simple_modal_callback();
            simple_modal_callback = null;
        }
        simple_modal_open = false;
    }

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