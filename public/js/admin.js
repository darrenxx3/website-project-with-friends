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

