function submitUser() {
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");

    axios.post('/api/login', {
        email: inputEmail.value,
        password: inputPassword.value
    })
        .then((response) => {
            console.log(response);
            if(response.data.redirect){
                window.location = "/admin";
            }
        })
        .catch((error) => {
            console.log("Wrong password!");
            console.log(error);
        })
}

const clearForm = () => {
    inputUsername.innerText = "";
    inputEmail.innerText = "";
    inputPassword.innerText = "";
}
