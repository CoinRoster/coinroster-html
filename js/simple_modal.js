    var 

    simple_modal_shade = id("simple_modal_shade"),
    simple_modal_centering_container = id("simple_modal_centering_container"),
    simple_modal_close = id("simple_modal_close"),
    simple_modal_callback = null;

    simple_modal_close.onclick = function() 
        {
        hide_simple_modal();
        };

    simple_modal_centering_container.onclick = function() 
        {
        hide_simple_modal();
        };

    function show_simple_modal(modal_text, good_bad, callback)
        {
        id("simple_modal_text").innerHTML = modal_text;
        
        var border_color = "";
        if (good_bad === "good") border_color = "rgb(139,215,255)";
        else if (good_bad === "bad") border_color = "orange";
        id("simple_modal_window").style.borderColor = border_color;
        
        if (callback !== null)
            {
            simple_modal_callback = function()
                {
                callback();
                };
            }
            
        show(simple_modal_shade);
        show(simple_modal_centering_container, "table");
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
        }