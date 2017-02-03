    function set_auth_message(_id, message, color)
        {
        id(_id).innerHTML = message;
        id(_id).style.color = color;
        }
        
    function login()
        {
        var
        
        username = id("username").value,
        password = id("password").value;

        if (username === "" || password === "") return false;

        api({
            method: "Login",
            args: {
                username: username,
                password: password
            }
        }, function(call)
            {
            if (call.status === "1") 
                {
                var hash = location.hash.slice(1);
                if (hash.indexOf("redirect") !== -1)
                    {
                    var target = hash.split("=")[1];
                    if (typeof target !== "undefined") return window.location = decodeURIComponent(target);
                    }
                // fail over to:
                window.location = "/";
                }
            else
                {
                set_auth_message("username_label", "Invalid credentials", "orange");
                set_auth_message("password_label", "Invalid credentials", "orange");
                id("username").value = "";
                id("password").value = "";
                }
            });
        return false;
        }
        
    function check_username()
        {
        var username = id("username").value;
        if (username === "") return;
        if (username.length < 4)
            {
            set_auth_message("username_label", "Username - 4 chars or longer", "orange");
            id("username").value = "";
            set_focus("username");
            return;
            }
            
        api({
            method: "CheckUsername",
            args: {
                username: username
            }
        }, function(call)
            {
            if (call.status === "1") set_auth_message("username_label", "Username is available", cr_teal);
            else
                {
                set_auth_message("username_label", call.error, "orange");
                id("username").value = "";
                set_focus("username");
                }
            });
        }
        
    function check_email()
        {
        if (validate_email(id("email_address").value)) set_auth_message("email_label", "Email address", cr_teal);
        else set_auth_message("email_label", "Invalid email address", "orange");
        }

    function check_password()
        {
        var 
        
        password = id("password").value,
        auth_message = "";

        if (password === "") auth_message = "Enter a password";
        else if (password !== "" && password.length < 8) auth_message = "Password - 8 chars or longer";
        
        if (auth_message !== "")
            {
            set_auth_message("password_label", auth_message, "orange");
            id("password").value = "";
            //id("confirm_password").value = "";
            set_focus("password");
            return;
            }
        else set_auth_message("password_label", "Password", cr_teal);
        }
        
    function create_account()
        {
        var 
        
        referral_key = window.referral_key,
        email_address,
        username = id("username").value,
        password = id("password").value;
        //confirm_password = id("confirm_password").value

        if (username === "")
            {
            set_auth_message("username_label", "Enter a username", "orange");
            set_focus("username");
            return false;
            }
            
        if (referral_key === "")
            {
            email_address = id("email_address").value;
            if (email_address === "")
                {
                set_auth_message("email_label", "Enter an email address", "orange");
                set_focus("email_address");
                return false;
                }
            }

        if (password === "")
            {
            set_auth_message("password_label", "Enter a password", "orange");
            set_focus("password");
            return false;
            }
        /*if (confirm_password === "")
            {
            set_auth_message("Confirm password", "orange");
            set_focus("confirm_password");
            return false;
            }
        if (password !== confirm_password)
            {
            set_auth_message("Passwords do not match", "orange");
            id("password").value = "";
            id("confirm_password").value = "";
            set_focus("password");
            return false;
            }*/
            
        api({
            method: "CreateUser",
            args: {
                email_address: email_address,
                username: username,
                password: password,
                referral_key: window.referral_key
            }
        }, function(call)
            {
            if (call.status === "1") location = "/";
            else
                {
                show_simple_modal(call.error_message, "bad", function()
                    {
                    location.reload();
                    });
                }
            });
       
        return false;
        }
        
    function send_password_reset()
        {
        var email_address = id("email_address").value;

        if (email_address === "") return false;
        
        if (validate_email(email_address) === false)
            {
            id("auth_message").innerHTML = "Invalid email address";
            return false;
            }
            
        api({
            method: "SendPasswordReset",
            args: {
                email_address: email_address
            }
        }, function(call)
            {
            if (call.status === "1")
                {
                hide("initial_container");
                show("submitted_container");
                }
            });
        
        return false;
        }
        
    function update_password()
        {
        var
        
        password = id("password").value,
        confirm_password = id("confirm_password").value;

        if (window.reset_key.length !== 40)
            {
            set_auth_message("auth_message", "Invalid reset code", "orange");
            return false;
            }
        if (password === "")
            {
            set_auth_message("auth_message", "Enter a password", "orange");
            set_focus("password");
            return false;
            }
        if (confirm_password === "")
            {
            set_auth_message("auth_message", "Confirm password", "orange");
            set_focus("confirm_password");
            return false;
            }
        if (password !== confirm_password)
            {
            set_auth_message("auth_message", "Passwords do not match", "orange");
            id("password").value = "";
            id("confirm_password").value = "";
            set_focus("password");
            return false;
            }
            
        api({
            method: "UpdatePassword",
            args: {
                password: password,
                reset_key: window.reset_key
            }
        }, function(call)
            {
            if (call.status === "1") location.reload();
            else
                {
                set_auth_message("auth_message", call.error, "orange");
                id("password").value = "";
                id("confirm_password").value = "";
                }
            });
        
        return false;
        }

    function resend_verification(new_location)
        {
        api({
            method: "SendEmailVerification",
            args: {}
        }, function(call)
            {
            if (call.status === "1")
                {
                var action = null;
                if (new_location !== "") action = function()
                    {
                    window.location = new_location;
                    };
                show_simple_modal("Verification has been sent!", "good", action);
                }
            });
        }