import { sendData } from "../crud.js";
import { isImage, checkPass } from "../validation.js";

const btn = document.getElementById("btnProfile");
var picture = document.getElementById("wizard-picture");
var insta = document.getElementById("instagram");
var tiktok = document.getElementById("tiktok");
var newPass = document.getElementById("curPass");
var confirmPass = document.getElementById("newPass");

var tempPic;
picture.addEventListener("change", (e) => {
    console.log(tempPic);

    if (!isImage(picture)) {
        picture.value = "";
        swal("Please input only image");
        return;
    };

    tempPic = picture.files[0];

    var reader = new FileReader();
    var picPreview = document.getElementById("wizardPicturePreview");

    reader.onload = (e) => {
        picPreview.src = e.target.result;
    };

    reader.readAsDataURL(picture.files[0]);


})

btn.addEventListener("click", async (e) => {
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

    // sendData('/api/update', 'PATCH', formData,'/admin');
    await fetch("/api/profile", {
        method: "POST",
        body: formData
    })
        .then(res => {
            console.log(res.status);
            if(res.status == 402){
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
                location.reload();
            }
        })
        .catch(err => {
            console.log(err);
        })
})