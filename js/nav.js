    api({
        method: "GetSessionDetails", 
        args: {}
    }, function(call)
        {  
        if (call.status === "1") 
            {
            if (call.is_active === "1")
                {
                window.session = call;
                
                id("ssi_header_account").innerHTML = call.username;

                if (call.user_level === "1") 
                    {
                    show_cells("ssi_header_admin_wrapper");
                    show("ssi_mobile_admin_wrapper");
                    }
                
                show_cells("ssi_header_a_active");
                show("ssi_mobile_nav_active");
                }
            else 
                {
                show_cells("ssi_header_a_inactive");
                show("ssi_mobile_nav_inactive");
                }
            
            var pathname = window.location.pathname;
                
            if (pathname === "/") target = "lobby";
            else
                {
                var

                url = pathname.split("/"),
                target = url[url.length - 1],
                index_of_dot = target.indexOf(".");

                if (index_of_dot > -1) target = target.substring(0, index_of_dot);

                if (target === "") target = url[url.length - 2];
                }
                
            if (pathname.indexOf("/admin/") !== 0) 
                {
                tab_id = "ssi_header_" + target;
                if (id(tab_id) !== null) id(tab_id).className = "ssi_header_active_tab";
                }
            }
        init();
        });
    
    function show_cells(class_name)
        {
        var cells = document.querySelectorAll("." + class_name);
        for (var i=0; i<cells.length; i++) show(cells[i], "table-cell");
        }
    function hide_cells(class_name)
        {
        var cells = document.getElementsByClassName(class_name);
        for (var i=0; i<cells.length; i++) hide(cells[i]);
        }
        
    var 

    mobile_nav = document.getElementById("ssi_mobile_nav"),
    ssi_mobile_nav_button = document.getElementById("ssi_mobile_nav_button"),
    ssi_mobile_nav_placeholder = id("ssi_mobile_nav_placeholder"),
    ssi_mobile_shade = id("ssi_mobile_shade"),
    ssi_mobile_nav_placeholder_storage,
    mobile_nav_state = "hidden";

    function toggle_mobile_menu()
        {
        if (mobile_nav_state === "hidden")
            {
            show(ssi_mobile_shade);
            show(mobile_nav);
            mobile_nav.style.display = "block";
            ssi_mobile_nav_placeholder_storage = ssi_mobile_nav_placeholder.innerHTML;
            ssi_mobile_nav_placeholder.innerHTML = "Close Menu";
            mobile_nav_state = "visible";
            }
        else 
            {
            ssi_mobile_nav_placeholder.innerHTML = ssi_mobile_nav_placeholder_storage;
            hide(mobile_nav);
            hide(ssi_mobile_shade);
            mobile_nav_state = "hidden";
            }
        }
        
    ssi_mobile_nav_button.onclick = function()
        {
        toggle_mobile_menu();
        };
        
    ssi_mobile_shade.onclick = function()
        {
        toggle_mobile_menu();
        };
        
    if (typeof window.nav_text !== "undefined") ssi_mobile_nav_placeholder.innerHTML = window.nav_text;