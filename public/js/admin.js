async function delData(id) {
    Swal.fire({
        title: 'Delete item?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await fetch(`/api/delete/${id}`, { method: "POST" })

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Data successfully Deleted!',
                showConfirmButton: false,
                timer: 1500
            })
            setInterval(
                () => { location.reload() }
                , 2000
            );
        }
    })
}

function copyClipboard(){

    let link = document.getElementById("basic-url");
    navigator.clipboard.writeText(link.value);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Copied to clipboard'
      })
}