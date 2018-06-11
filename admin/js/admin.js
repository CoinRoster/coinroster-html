
    function init()
        {
        var 

        nav = id("nav"),
        tabs = [],
        nav_nodes = [],
        nav_selection = -1,
        panes = document.getElementsByClassName("pane");
        id("internal_promo").innerHTML = window.session.internal_promo_balance;
        for (var i=0; i<panes.length; i++) 
            {
            var nav_node = document.createElement("a");
            nav_node.className = "link";
            nav_node.innerHTML = panes[i].getAttribute("tab_text");
            nav_node.onclick = (function(i)
                {
                return function()
                    {
                    change_nav_selection(i);
                    };
                })(i);
            nav.appendChild(nav_node);
            nav_nodes[i] = nav_node;
            }
            
        window.onhashchange = function()
            {
            change_nav_selection(+location.hash.slice(1));
            };
            
        if (location.hash !== "") change_nav_selection(+location.hash.slice(1));
        else change_nav_selection(0);

        function change_nav_selection(selection)
            {
            if (selection !== nav_selection)
                {
                window.nav_selection = selection;
                nav_nodes[selection].className = "link selected";
                if (nav_selection !== -1)
                    {
                    nav_nodes[nav_selection].className = "link";
                    id("pane_" + nav_selection).style.display = "none";
                    }
                id("pane_" + selection).style.display = "block";
                $('#pane_' + selection).find('.chosen-select').chosen({
                    disable_search_threshold: 10,
                    allow_single_deselect: false
                });
                $('#pane_' + selection).find('.chosen-select_allow-deselect').chosen({
                    disable_search_threshold: 10,
                    allow_single_deselect: true
                });
                nav_selection = selection;
                location.hash = selection;

                action_on_tab_change(selection);
                }
            }
        }
        
    /*----------------------------------------------------------------------*/
         
    function pop_up_simple_table(_id)
        {
        var newWindow = window.open('simple_table.html');
        newWindow.table_html = id(_id).innerHTML;
        }

    /*----------------------------------------------------------------------*/
         
    function get_category_report()
        {
        var call = api({
            method: "CategoryReport",
            args: {
                request_source: "admin_panel"
            }
        });
        
        if (call.status === "1") return call.category_report;
        else return null;
        }
    