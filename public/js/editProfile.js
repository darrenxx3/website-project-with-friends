import { checkImage } from "./validation.js";

const btnSubmit = document.getElementById("btnProfile");
var picture = document.getElementById("wizard-picture");
var insta = document.getElementById("instagram");
var tiktok = document.getElementById("tiktok");
var newPass = document.getElementById("curPass");
var confirmPass = document.getElementById("newPass");
var description = document.getElementById("description");


var tempFile
picture.addEventListener("change", (e) => {
    tempFile = checkImage(picture, tempFile);
    console.log(tempFile);
})

btnSubmit.addEventListener("click", async (e) => {
    e.preventDefault();

    if (newPass.value != confirmPass.value) {
        Swal.fire({
            icon: 'error',
            title: 'Password not match',
            text: 'Make sure your password is the same!',
        })

        newPass.focus;
        return;
    }

    const { value: password } = await Swal.fire({
        title: 'Enter your password',
        input: 'password',
        inputLabel: 'Password',
        inputPlaceholder: 'Enter your password',
        showCancelButton: false,
        inputAttributes: {
            autocapitalize: 'off',
            autocorrect: 'off'
        }
    })

    var formData = new FormData();
    formData.append("image", picture.files[0]);
    formData.append("instagram", insta.value);
    formData.append("tiktok", tiktok.value);
    formData.append("newPassword", confirmPass.value);
    formData.append("curPassword", password);
    formData.append("description", description.value);

    // sendData('/api/update', 'PATCH', formData,'/admin');
    await fetch("/api/profile", {
        method: "POST",
        body: formData
    })
        .then(res => {
            if (res.status == 402) {
                Swal.fire({
                    icon: 'error',
                    title: 'Wrong Password',
                    text: 'You input the wrong password, please re-submit',
                })
            }

            if (res.status == 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Data successfully updated!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setInterval(
                    () => { location.reload() }
                    , 3000
                );
            }
        })
        .catch(err => {
            console.log(err);
        })
})

var btnDel = document.getElementById("btnDel");

btnDel.addEventListener("click", async () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {

            await fetch("/api/deleteUser", { method: 'POST' })
                .then(res => {
                    if (res.status == 200) {
                        Swal.fire(
                            'Deleted!',
                            'Your Account has been deleted.',
                            'success'
                        )
                        setTimeout(() => { location.href = "/login" }), 2000
                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Error Occured! Please try again later',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                })

        }
    })
})