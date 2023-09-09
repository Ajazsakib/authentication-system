const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword")
const registerForm = document.getElementById("register-form")

confirmPassword.addEventListener("change", function ()
{
    if (password.value != "" && password.value != confirmPassword.value) {
        document.getElementById("error").style.display = "block"
    }
    else {
        document.getElementById("error").style.display = "none"
    }
})

registerForm.addEventListener("submit", function (e)
{

    e.preventDefault9
    if (password.value != "" && password.value === confirmPassword.value) {
        alert("User Registered Successfully!!!")
    }
})