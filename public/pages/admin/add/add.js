import { isLink, isImage, isFilled } from '../../static/js/validation.js';
import { sendData } from '../../static/js/crud.js';

const button = document.getElementById("btnSub");
button.addEventListener("click", async (e) => {
    var Title = document.getElementById("title");
    var URL = document.getElementById("url");
    var Currency = document.getElementById("currency");
    var Price = document.getElementById("price");
    var Image = document.getElementById("image");
    

    if(!isFilled("formAdd")) { 
        swal("Please fill all the data"); 
        return; 
    };

    if(!isLink(URL.value)) { 
        swal("Please fill with valid URL"); 
        URL.focus();
        return; 
    };
    
    if(!isImage(Image)) { 
        swal("Please fill with valid image file"); 
        return; 
    };

    if(isNaN(Price.value)){
        swal("Please fill price with valid value");
        return;
    }

    const formData = new FormData();
    formData.append('title', Title.value);
    formData.append('url', URL.value);
    formData.append('currency', Currency.value);
    formData.append('price', Price.value);
    formData.append('image', Image.files[0]);

    sendData(
        '/api/upload',
        'POST',
        formData,
        '/admin');
    
});

