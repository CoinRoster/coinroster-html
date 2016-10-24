    function set_auth_message(message, color)
        {
        id("auth_message").innerHTML = message;
        id("auth_message").style.color = color;
        }
        
    function login()
        {
        var
        
        username = id("username").value,
        password = id("password").value;

        if (username === "" || password === "") return false;

        setTimeout(function()
            {
            var call = api({
                method: "Login",
                args: {
                    username: username,
                    password: password
                }
            });
            if (call.status === "1") 
                {
                location = "/account";
                }
            else
                {
                id("auth_message").innerHTML = "Invalid Credentials!";
                id("auth_message").style.color = "red";
                id("username").value = "";
                id("password").value = "";
                }
            },100);
        return false;
        }
        
    function check_username()
        {
        var username = id("username").value;
        if (username === "") return;
        if (username.length < 4)
            {
            set_auth_message("Username must be<br/>4 characters or longer", "red");
            id("username").value = "";
            set_focus("username");
            return;
            }
            
        setTimeout(function()
            {
            var call = api({
                method: "CheckUsername",
                args: {
                    username: username
                }
            });

            if (call.status === "1") set_auth_message("Username is available", "rgb(0,255,106)");
            else
                {
                set_auth_message(call.error, "red");
                id("username").value = "";
                set_focus("username");
                }   
            },10);
        }

    function check_password()
        {
        var 
        
        password = id("password").value,
        auth_message = "";

        if (password === "") auth_message = "Enter a password";
        else if (password !== "" && password.length < 8) auth_message = "Password must be<br/>8 characters or longer";
        
        if (auth_message !== "")
            {
            set_auth_message(auth_message, "red");
            id("password").value = "";
            id("confirm_password").value = "";
            set_focus("password");
            return;
            }
        }
        
    function create_account()
        {
        var username = id("username").value,
        password = id("password").value,
        confirm_password = id("confirm_password").value;

        /*if (window.referral_key.length !== 40)
            {
            set_auth_message("Invalid referral code", "red");
            return false;
            }*/
        if (username === "")
            {
            set_auth_message("Enter a username", "red");
            set_focus("username");
            return false;
            }
        if (password === "")
            {
            set_auth_message("Enter a password", "red");
            set_focus("password");
            return false;
            }
        if (confirm_password === "")
            {
            set_auth_message("Confirm password", "red");
            set_focus("confirm_password");
            return false;
            }
        if (password !== confirm_password)
            {
            set_auth_message("Passwords do not match", "red");
            id("password").value = "";
            id("confirm_password").value = "";
            set_focus("password");
            return false;
            }

        setTimeout(function()
            {
            var call = api({
                method: "CreateUser",
                args: {
                    username: username,
                    password: password,
                    referral_key: window.referral_key
                }
            });

            if (call !== null)
                {
                if (call.user_was_created === "1") document.location = "../account/?first_login=true";
                else
                    {
                    if (call.invalid_credentials === "1") set_auth_message("Invalid credentials", "red");
                    else if (call.username_exists === "1") set_auth_message(username + " is taken", "red");
                    else if (call.invalid_referrer === "1") set_auth_message("Invalid referral code", "red");
                    else set_auth_message("Problem with account creation", "red");
                    id("username").value = "";
                    id("password").value = "";
                    id("confirm_password").value = "";
                    set_focus("username");
                    }
                }
            },100);
            
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

        setTimeout(function()
            {
            var call = api({
                method: "SendPasswordReset",
                args: {
                    email_address: email_address
                }
            });
            if (call.status === "1")
                {
                hide("initial_container");
                show("submitted_container");
                }
            },100);
            
        return false;
        }
        
    function update_password()
        {
        var
        
        password = id("password").value,
        confirm_password = id("confirm_password").value;

        if (window.reset_key.length !== 40)
            {
            set_auth_message("Invalid reset code", "red");
            return false;
            }
        if (password === "")
            {
            set_auth_message("Enter a password", "red");
            set_focus("password");
            return false;
            }
        if (confirm_password === "")
            {
            set_auth_message("Confirm password", "red");
            set_focus("confirm_password");
            return false;
            }
        if (password !== confirm_password)
            {
            set_auth_message("Passwords do not match", "red");
            id("password").value = "";
            id("confirm_password").value = "";
            set_focus("password");
            return false;
            }

        setTimeout(function()
            {
            var call = api({
                method: "UpdatePassword",
                args: {
                    password: password,
                    reset_key: window.reset_key
                }
            });

            if (call.status === "1") document.location = "../account/";
            else
                {
                set_auth_message(call.error, "red");
                id("password").value = "";
                id("confirm_password").value = "";
                }
            },100);
            
        return false;
        }

