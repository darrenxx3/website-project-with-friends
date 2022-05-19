
const btnSubmit = document.getElementById("btnSubmit");
const email = document.getElementById("email");

btnSubmit.addEventListener("click", async () => {

    var emailVal = email.value
    if (emailVal) {

        await fetch('/api/forgotPass', {
            method: "POST",
            headers: {'Content-Type': 'application/JSON'},
            body: JSON.stringify({
                email: emailVal
            })
        })
            .then(async (res) => {
                if (res.status==404){
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Email!',
                        text: 'Please fill with valid email address!',
                    })
                    return;
                }

                if(res.status==200){
                    const data = await res.json();
                    location.href = `/change/${data.email}`
                }
            })
            .catch(err => {
                console.log(err);

                Swal.fire({
                    icon: 'error',
                    title: 'Database ERROR!',
                    text: 'Please try again later!',
                })
            })


    } else {
        Swal.fire({
            icon: 'error',
            title: 'Input cannot be empty!',
            text: 'Please fill input with valid email address!',
        })
    }
})