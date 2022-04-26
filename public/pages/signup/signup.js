function submitUser() {
    const inputUsername = document.getElementById("username");
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");

    console.log(inputUsername.value);
    axios.post('/api/signup', {
        username: inputUsername.value,
        email: inputEmail.value,
        password: inputPassword.value
    }, {withCredentials: true})
        .then((response) => {
            if(response.data.redirect){
                window.location = "/admin"
            }
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
