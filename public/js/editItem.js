import { checkImage, isLink, isNumber } from "../../static/js/validation.js"


var image = document.getElementById("wizard-picture");
var title = document.getElementById("title");
var URL = document.getElementById("URL");
var price = document.getElementById("Price");
var currency = document.getElementById("selectCurrency");

var btnSubmit = document.getElementById("btnSubmit");

var tempFile;
image.addEventListener("change", () => {
    tempFile = checkImage(image, tempFile);
})

URL.addEventListener("change", () => {
    let URLhref = document.getElementById("hrefURL");

    URLhref.href = URL.value
})

btnSubmit.addEventListener("click", async () => {
    var ParamsID = window.location.pathname.split("/").pop();


    let statusLink = await isLink(URL);
    let statusPrice = await isNumber(price.value);

    var formData = new FormData();
    formData.append("image", tempFile);
    formData.append("title", title.value);
    formData.append("url", URL.value);
    formData.append("currency", currency.value);
    formData.append("price", price.value);


    if (statusLink && statusPrice) {
        fetch(`/api/update/${ParamsID}`, {
            method: "POST",
            body: formData,
        })
            .then(res => {

                if (res.status == 200) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Data successfully updated!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setInterval(
                        () => { location.href = "/admin" }
                        , 2000
                    );
                }
            })
            .catch(ex => {
                Swal.fire({
                    icon: 'error',
                    title: 'Update data failed!',
                    text: 'Error while updating data, please kindly retry.',
                })
                console.log(ex)
            })
    }
})
