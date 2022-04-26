function submitUser() {
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");

    axios.post('/api/login', {
        email: inputEmail.value,
        password: inputPassword.value,
    }, { withCredentials: true })
        .then((response) => {
            if(response.data.redirect){
                window.location = "/admin";
            }
            return;
        })
        .catch((error) => {
            console.log("Wrong password!");
            console.log(error);
            return;
        })
}

const clearForm = () => {
    inputUsername.innerText = "";
    inputEmail.innerText = "";
    inputPassword.innerText = "";
}

const btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click", submitUser);
