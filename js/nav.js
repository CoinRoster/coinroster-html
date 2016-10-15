    if (session.is_active === "1")
        {
        id("ssi_header_username").innerHTML = session.username;
        
        if (session.user_level === "1") show_cells("ssi_header_admin_wrapper");
        show_cells("ssi_header_a_active");
        
        var url = window.location.pathname.split("/");
        
        for (var i=url.length-1; i>=0; i--)
            {
            var 

            tab_id = "ssi_header_" + url[i],
            index_of_dot = tab_id.indexOf(".");

            if (index_of_dot > -1) tab_id = tab_id.substring(0, index_of_dot);

            if (id(tab_id) !== null) 
                {
                id(tab_id).className = "ssi_header_active_tab";
                id(tab_id).onclick = "";
                break;
                }
            }
        }
    else show_cells("ssi_header_a_inactive");
        
    function show_cells(class_name)
        {
        var cells = document.getElementsByClassName(class_name);
        for (var i=0; i<cells.length; i++) cells[i].style.display = "table-cell";
        }