export function isFilled(formID) {
    let status = true;

    document.getElementById(formID)
        .querySelectorAll("[required]")
        .forEach(input => {
            console.log(input.value == "");
            if (input.value == "") status = false;
        })

    return status;
}

export function isLink(url) {
    let testURL

    try {
        testURL = new URL(url);
    } catch (_) {
        return false;
    }

    return true;
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

export function isImageOptional(file) {
    if (!file.files[0]) return true;

    isImage(file);
}


export async function checkPass(curPass) {
    if (!curPass) return true;

    return true;
}