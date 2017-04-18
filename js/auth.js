    function set_auth_message(_id, message, color)
        {
        id(_id).innerHTML = message;
        id(_id).style.color = color;
        }
        
    function login(target_2)
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
                else if (target_2) return window.location = target_2;
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

    function check_password(all_ok_text)
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
            return false;
            }
        else 
            {
            set_auth_message("password_label", all_ok_text, cr_teal);
            return true;
            }
        }
        
    function check_confirm_password(all_ok_text)
        {
        var password_ok = check_password("New Password");
        
        if (!password_ok) return;
        
        var 
        
        password = id("password").value,
        confirm_password = id("confirm_password").value;

        if (password !== confirm_password)
            {
            set_auth_message("confirm_password_label", "Passwords do not match", "orange");
            id("confirm_password").value = "";
            set_focus("confirm_password");
            return false;
            }
        
        set_auth_message("confirm_password_label", all_ok_text, cr_teal);
        }
        
    function create_account()
        {
        var 
        
        referral_key = window.referral_key,
        email_address = "",
        username = id("username").value,
        password = id("password").value,
        promo_code = "";

        if (username === "")
            {
            set_auth_message("username_label", "Enter a username", "orange");
            set_focus("username");
            return false;
            }
            
        if (referral_key === "")
            {
            email_address = id("email_address").value;
            promo_code = id("promo_code").value;
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
            
        api({
            method: "CreateUser",
            args: {
                email_address: email_address,
                username: username,
                password: password,
                referral_key: window.referral_key,
                promo_code: promo_code
            }
        }, function(call)
            {
            if (call.status === "1") location = "/";
            else 
                {
                if (call.error === "Invalid promo code") set_auth_message("promo_code_label", "Invalid promo code", "orange");
                else if (call.error === "Promo code has expired") set_auth_message("promo_code_label", "Promo code has expired", "orange");
                else if (call.error === "Email is in use") set_auth_message("email_label", "Email is in use", "orange");
                else show_simple_modal(call.error, "bad", null);
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
            if (call.status === "1")
                {
                show_simple_modal("Your password has been changed!", "good", function()
                    {
                    window.location = "/account";
                    });
                }
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
        
    // CHANGE PASSWORD

    function change_password_error(message, color)
        {
        show("change_password_message");
        id("change_password_message").innerHTML = message;
        id("change_password_message").style.color = color;
        id("new_password").value = "";
        id("confirm_password").value = "";
        }

    function change_password()
        {
        var old_password = id("old_password").value,
        new_password = id("new_password").value,
        confirm_password = id("confirm_password").value;

        if (old_password === "")
            {
            change_password_error("Enter your old password", "orange");
            set_focus("old_password");
            return false;
            }

        if (new_password === "")
            {
            change_password_error("Enter new password", "orange");
            set_focus("new_password");
            return false;
            }

        if (new_password.length < 8) 
            {
            change_password_error("New password must be 8 characters or longer", "orange");
            set_focus("new_password");
            return false;
            }

        if (new_password !== confirm_password)
            {
            change_password_error("The passwords you typed<br/>do not match", "orange");
            set_focus("new_password");
            return false;
            }

        api({
            method: "ChangePassword",
            args: {
                old_password: old_password,
                new_password: new_password
            }
        }, function(call)
            {
            if (call !== null)
                {
                id("old_password").value = "";
                if (call.status === "1")
                    {
                    show_simple_modal("Your password has been changed!", "good", function()
                        {
                        window.location = "/account";
                        });
                    }
                else change_password_error("Invalid credentials", "orange");
                }
            });
        return false;
        }
