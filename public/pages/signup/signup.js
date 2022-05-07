import { isEmail, isFilled } from "../static/js/validation.js"

var inputUsername = document.getElementById("username");
var inputEmail = document.getElementById("email");
var inputPassword = document.getElementById("password");
var inputQuestion = document.getElementById("question");
var inputAnswer = document.getElementById("answer");
var btnSubmit = document.getElementById("btnSubmit");

btnSubmit.addEventListener("click", async () => {

    let statusFill = await isFilled("formSignUp")
    let statusEmail = await isEmail(inputEmail.value);

    console.log(inputQuestion.value);

    if (statusFill && statusEmail) {
        const bodyUser = JSON.stringify({
            username: inputUsername.value,
            email: inputEmail.value,
            password: inputPassword.value,
            question: inputQuestion.value,
            answer: inputAnswer.value
        })

        await fetch('/api/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: bodyUser
        })
            .then(res => {
                if (res.status == 409) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Username or Email Already Exist!',
                        text: 'Please change your username or email!',
                    })
                }
                else if (res.status == 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sign Up Failure!',
                        text: 'Fail to register user, please kindly try again!',
                    })
                }
                else if (res.status == 200) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'User Successfully Registered!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setInterval(
                        () => { location.href = "/admin" }
                        , 2000
                    );
                }
            })
    }
})