import { isFilled } from '../../static/js/validation.js'

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const answer = document.getElementById("answer");
const btnSubmit = document.getElementById("btnSubmit");

btnSubmit.addEventListener("click", async () => {
    var ParamsID = window.location.pathname.split("/").pop();

    let statusFill = isFilled("formConfirm")
    
    if(statusFill){
        if( confirmPassword.value == password.value){
            await fetch(`/api/changePass/${ParamsID}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify({
                    "answer" : answer.value,
                    "password" : confirmPassword.value
                })
            })
            .then(res => {
                if(res.status == 403){
                    Swal.fire({
                        icon: 'error',
                        title: 'Wrong Answer!',
                        text: 'Please check your answer again.',
                    })
                    return;
                }

                if(res.status == 200){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Password Succesfully Updated!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setInterval(
                        () => { location.href = "/login" }
                        , 2000
                    );
                }
            })

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Password not match!',
                text: 'Please re-confirm your new password.',
            })
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Form cannot be empty!',
            text: 'Please Fill all data!',
        })
    }
})
