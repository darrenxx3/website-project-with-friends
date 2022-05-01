export async function sendData(APIurl, method, data, redirect) {
    await fetch(
        APIurl, {
            method: method,
            body : data
        }
    )
    .then(res => {
        window.location = redirect
    })
    .catch(e => {
        console.log(e);
        swal("Failed to insert to data!");
    })

}