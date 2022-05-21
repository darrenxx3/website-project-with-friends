function copyClipboard(link){

    navigator.clipboard.writeText(link);

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

function logOut(){
    Swal.fire({
        title: 'Log Out?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
            fetch("/api/logout")
                .then(res => {
                    if(res.status == 200) location.href = "/login";
                })
        } 
      })
}