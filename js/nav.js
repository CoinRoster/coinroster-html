    if (session.is_active === "1")
        {
        id("ssi_header_username").innerHTML = session.username;
        
        if (session.user_level === "1") show_cells("ssi_header_admin_wrapper");
        show_cells("ssi_header_a_active");
        
        var 
        
        url = window.location.pathname.split("/"),
        target = url[url.length - 1],
        index_of_dot = target.indexOf(".");

        if (index_of_dot > -1) target = target.substring(0, index_of_dot);

        if (target === "") target = url[url.length - 2];
        
        tab_id = "ssi_header_" + target;
        
        if (id(tab_id) !== null) 
            {
            id(tab_id).className = "ssi_header_active_tab";
            id(tab_id).onclick = "";
            }
        }
    else show_cells("ssi_header_a_inactive");
        
    function show_cells(class_name)
        {
        var cells = document.getElementsByClassName(class_name);
        for (var i=0; i<cells.length; i++) cells[i].style.display = "table-cell";
        }