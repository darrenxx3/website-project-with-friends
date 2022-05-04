export function isFilled(formID) {
    let status = true;

    document.getElementById(formID)
        .querySelectorAll("[required]")
        .forEach(input => {
            if (!input.value) {
                status = false;
            }
        })

    if (!status) {
        console.log("MASUK");
        Swal.fire({
            icon: 'error',
            title: 'Input not complete!',
            text: 'Please fill all the empty box!',
        })
    };

    return status;
}

export function isLink(urlDOM) {
    let url = urlDOM.value
    let testURL

    if (url) {
        try {
            testURL = new URL(url);
        } catch (_) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid URL!',
                text: 'Please input only valid URL!',
            })
            return false;
        }
        return true;
    }

}

export function isNumber(price) {
    if (isNaN(price)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Price!',
            text: 'Please input only valid Price!',
        })
        return false;
    } else {
        return true;
    }
}

export function isImage(file) {
    let allowExt = ['PNG', 'JPEG', 'JPG'];

    let fileName = file.files[0].name;
    let ext = fileName.split('.').pop();

    if (allowExt.includes(ext.toUpperCase())) {
        return true;
    }

    return false;
}

export function checkImage(inputFile, tempFile) {

    if (!isImage(inputFile)) {
        inputFile.value = "";
        Swal.fire({
            icon: 'error',
            title: 'Wrong Format!',
            text: 'Please input only image!',
        })
        return tempFile;
    };

    var reader = new FileReader();
    var picPreview = document.getElementById("wizardPicturePreview");

    reader.onload = (e) => {
        picPreview.src = e.target.result;
    };

    reader.readAsDataURL(inputFile.files[0]);
    return inputFile.files[0];
}

export function isEmail(email){
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(regexEmail)) {
        return true;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email!',
            text: 'Please input only valid email address!',
        })
        return false;
    };
}