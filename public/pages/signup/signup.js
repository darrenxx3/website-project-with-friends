function submitUser() {
    const inputUsername = document.getElementById("username");
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");

    axios.post('/api/user', {
        username: inputUsername.value,
        email: inputEmail.value,
        password: inputPassword.value
    })
        .then((response) => {
            clearForm();
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
