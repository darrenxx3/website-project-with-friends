import { isEmail, isFilled } from "../static/js/validation.js"

var inputEmail = document.getElementById("email");
var inputPassword = document.getElementById("password");
var btnSubmit = document.getElementById("btnSubmit");

btnSubmit.addEventListener("click", async () => {

    let statusFill = await isFilled("formLogin")
    let statusEmail = await isEmail(inputEmail.value);

    if (statusFill && statusEmail) {
        await fetch('/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({
                email: inputEmail.value,
                password: inputPassword.value
            })
        })
            .then(res => {
                if(res.status == 400){
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Fail!',
                        text: "Invalid email or password, please try again!",
                    })
                }
                else if(res.status == 200){
                   location.href = "/admin";
                }
            })
    }
})