document.addEventListener("DOMContentLoaded", function ()
{
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const registerForm = document.getElementById("register-form");

    if (confirmPassword) { // Check if the element exists
        confirmPassword.addEventListener("change", function ()
        {
            if (password.value !== "" && password.value !== confirmPassword.value) {
                document.getElementById("error").style.display = "block";
            } else {
                document.getElementById("error").style.display = "none";
            }
        });
    }

    if (registerForm) { // Check if the element exists
        registerForm.addEventListener("submit", function (e)
        {

            if (password.value !== "" && password.value === confirmPassword.value) {
                alert("User Registered Successfully!!!");
            }
        });
    }

    const oldPassword = document.getElementById("oldPassword");
    const newPassword = document.getElementById("newPassword");
    const confirmNewPassword = document.getElementById("confirmNewPassword");
    const updatePassword = document.getElementById("updatePassword");

    if (updatePassword) { // Check if the element exists
        updatePassword.addEventListener("submit", function (e)
        {

            if (oldPassword.value !== "" && newPassword.value === confirmNewPassword.value) {
                alert("Password changed Successfully!!!");
            }
        });
    }
});


// sign in with google

