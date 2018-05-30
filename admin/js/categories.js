
    var 
    
    sub_category__category_override = "",
    
    image_override = false,
    image_base64 = "",
    image_extension = "";
        
    function action_on_tab_change(selection)
        {
        switch(selection)
            {
            case 0: /* Manage Categories */
                populate_category_report();
                break;
            case 1: /* Create Category */
                // nothing to do
                break;
            case 2: /* Create Sub-Category */
                populate_category_selector("create_sub_category__category_selector", sub_category__category_override);
                break;
            }
        }
                  
/*----------------------------------------------------------------------*/

    // Category report

    function populate_category_report()
        {
        var 
        
        categories = get_category_report(),
        category_report = id("category_report");

        category_report.innerHTML = "";
        
        for (var i=0; i<categories.length; i++)
            {
            var category = categories[i],
                    
            category_code = category.code,
            description = category.description,
            position = category.position,
            sub_categories = category.sub_categories,
            number_of_sub_categories = sub_categories.length;
        
            var heading = document.createElement("h2");
            heading.innerHTML = "[" + category_code + "] " + description;
            category_report.appendChild(heading);
            
            if (number_of_sub_categories > 0)
                {
                var table = document.createElement("table");
                table.className = "report_table";
                
                for (var j=0; j<number_of_sub_categories; j++)
                    {
                    var sub_category = sub_categories[j],
                    
                    sub_category_id = sub_category.id,
                    sub_category_code = sub_category.code,
                    sub_category_description = sub_category.description,
                    created = sub_category.created,
                    active_flag = sub_category.active_flag,
                    open_contests = sub_category.open_contests,
                    in_play_contests = sub_category.in_play_contests,
                    
                    image_name = sub_category.image_name;
            
                    active_flag = active_flag ? "active" : "inactive";
            
                    new_row(table, j, [
                        category_code,
                        sub_category_code,
                        sub_category_description,
                        active_flag,
                        "open: " + open_contests,
                        "in play: " + in_play_contests,
                        "<div class='sub_category_tile' style=\"background-image:url('/img/lobby_tiles/" + image_name + "')\"></div>",
                        "<button type=\"button\" class=\"input_style\" onclick=\"edit_sub_category(this);\">Edit</button>"
                    ]);
                    }
                
                category_report.appendChild(table);
                }
            else category_report.appendChild(document.createTextNode("No sub-categories"));
            }
        }

    function edit_sub_category(button)
        {
        var 
        
        cells = button.parentNode.parentNode.cells,
        category = cells[0].innerHTML,
        code = cells[1].innerHTML,
        description = cells[2].innerHTML,
        active_flag = cells[3].innerHTML === "active" ? "Yes" : "No",
        background_image = cells[6].firstChild.style.backgroundImage;

        // the following will cause the category dropdown to be locked to a single category:
        
        sub_category__category_override = category;
        
        // set sub_category code and lock field:
        
        id("create_sub_category_code_input").value = code;
        id("create_sub_category_code_input").readOnly = true;
        
        // set sub_category description, both input and tile preview (editable):
        
        id("create_sub_category_description_input").value = description;
        document.getElementsByClassName("sub_category_description")[0].innerHTML = description;
        
        // set active_flag dropdown (editable):
        
        var create_sub_category_active_flag_selector = id("create_sub_category_active_flag_selector");
        selectByHTML(create_sub_category_active_flag_selector, active_flag);
        $(create_sub_category_active_flag_selector).trigger("chosen:updated");
        
        // set preview image:
        
        set_css("#create_sub_category_image_preview { background-image:" + background_image + "; }");
        
        // change prompt for "Browse" button and set override:
        
        id("image_prompt").innerHTML = "Change image";
        image_override = true;

        // change text in submit button:

        id("create_sub_category_button").innerHTML = "Save Changes";
        
        // show "Cancel edit" button (reloads the page, thus wiping out everything done above):
        
        show("cancel_edit_sub_category_button", "inline");
        
        // trigger tab change:
        
        location = "/admin/categories.html#2";
        }
        
    function populate_category_selector(selector_id, option_override)
        {
        var 
        
        selector = id(selector_id),
        categories = get_category_report();

        if (option_override === "") selector.innerHTML = "<option></option>";
        else selector.innerHTML = "";
        
        for (var i=0; i<categories.length; i++)
            {
            var 

            category = categories[i],

            code = category.code,
            description = category.description;

            if (option_override !== "" && option_override !== code) continue;
            
            var option = document.createElement("option");
            option.value = code;
            option.innerHTML = "[" + code + "] " + description;
                        
            selector.appendChild(option);
            }
            
        $(selector).trigger("chosen:updated");
        }
          
/*----------------------------------------------------------------------*/

    // Create category
    
    id("create_category_code_input").onblur = function()
        {
        this.value = toCode(this.value);
        };
    
    function create_category()
        {
        var 
        
        code = id("create_category_code_input").value,
        description = id("create_category_description_input").value;
    
        if (code === "") return alert("Enter a code");
        if (description === "") return alert("Enter a description");

        api({
            method: "UpsertCategory",
            args: {
                code: code,
                description: description
            }
        }, function(call)
            {
            if (call.status === "1")
                {
                alert("Category created! Reloading panel.");
                location.reload();
                }
            else alert(call.error);
            });
        }
     
    id("create_sub_category_code_input").onblur = function()
        {
        this.value = toCode(this.value);
        };
        
    id("create_sub_category_description_input").onblur = function()
        {
        var description = id("create_sub_category_description_input").value;
        if (description === "") description = "--";
        document.getElementsByClassName("sub_category_description")[0].innerHTML = description;
        };
        
    id("create_sub_category_tile_image").addEventListener('change', function()
        {
        upload_file(this, "new_portfolio_item_image_preview", "image preview");
        }, false);
    
    function create_sub_category()
        {
        var
        
        category = selectorValue("create_sub_category__category_selector"),
        code = id("create_sub_category_code_input").value,
        description = id("create_sub_category_description_input").value,
        active_flag = +selectorValue("create_sub_category_active_flag_selector");
        
        if (category === "") return alert("Please select a category");
        if (code === "") return alert("Please enter a code");
        if (description === "") return alert("Please enter a description");
        if (!image_override && image_base64 === "") return alert("Please choose a tile image");
        
        api({
            method: "UpsertSubCategory",
            args: {
                category: category,
                code: code,
                description: description,
                active_flag: active_flag,
                image_base64: image_base64,
                image_extension: image_extension
            }
        }, function(call)
            {
            if (call.status === "1")
                {
                alert("Sub-category created! Reloading panel.");
                location.reload();
                }
            else alert(call.error);
            });
        }
        
    function upload_file(input)
        {
        var reader = new FileReader();
        reader.onloadend = function(e)
            {
            var
            
            file_name = e.target.file_name,
            file_data = this.result,
            byte_size = file_data.byteLength,
            file_data_base64 = arraybuffer_to_base64(file_data, byte_size);
    
            image_base64 = file_data_base64;
            image_extension = file_name.substring(file_name.lastIndexOf(".") + 1, file_name.length).toLowerCase();
                            
            set_css("#create_sub_category_image_preview { background-image: url('data:image/png;base64," + file_data_base64 + "'); }");
            };
        reader.file_name = input.files[0].name;
        reader.readAsArrayBuffer(input.files[0]);
        }
        
    function arraybuffer_to_base64(buffer, byte_size) 
        {
        var 
        
        binary = '',
        bytes = new Uint8Array(buffer);

        for (var i=0; i<byte_size; i++) binary += String.fromCharCode(bytes[i]);
        
        return window.btoa(binary);
        }
        
    function set_css(css)
        {
        var
        
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

        style.type = 'text/css';

        if (style.styleSheet) style.styleSheet.cssText = css;
        else style.appendChild(document.createTextNode(css));

        head.appendChild(style);
        }