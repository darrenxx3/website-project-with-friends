function submitUser() {
    const inputUsername = document.getElementById("username");
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");

    axios.post('/api/login', {
        username: inputUsername.value,
        email: inputEmail.value,
        password: inputPassword.value
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log("Error:", error)
        })
}

const clearForm = () => {
    inputUsername.innerText = "";
    inputEmail.innerText = "";
    inputPassword.innerText = "";
}
