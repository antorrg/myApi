
const deletePage = async(id)=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Seguro quiere eliminar el proyecto?",
        text: "Esta acción no podrá deshacerse!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "Cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          handleDeletePage(id)
          swalWithBootstrapButtons.fire({
            title: "Hecho!",
            text: "El Proyecto ha sido eliminado.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "La acción se revirtió",
            icon: "error"
          });
        }
      });
}

const deleteItem = async(id)=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Seguro quiere eliminar el item?",
        text: "Esta acción no podrá deshacerse!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "Cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
        //handleDeleteItem(id)
        console.log('item borrado: ', id)
          swalWithBootstrapButtons.fire({
            title: "Hecho!",
            text: "El item ha sido eliminado.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "La acción se revirtió",
            icon: "error"
          });
        }
      });
}
const deleteUser = async(id)=>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Seguro quiere eliminar el usuario?",
        text: "Esta acción no podrá deshacerse!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "Cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
           //handleDeleteUser(id)
           console.log('usuario borrado')
          swalWithBootstrapButtons.fire({
            title: "Hecho!",
            text: "El usuario ha sido eliminado.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "La acción se revirtió",
            icon: "error"
          });
        }
      });
}

const handleDeletePage = async(id)=>{
    const token = localStorage.getItem('token'); 
    try {
      //const pageId = document.getElementById('id').value;
      const response = await fetch(`/api/v3/page/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado
        },
      });
  
      if (response.ok) {
        // Recargar la página después de 2 segundos
        setTimeout(() => {
           window.location.href = `/admin`;
        }, 1500);
      }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal!",
          });
          setTimeout(() => {
            window.location.reload();
         }, 1500);
      }
    } catch (error) {
     console.error(error)
    }
  }

  const handleDeleteItem = async(id)=>{
    const token = localStorage.getItem('token'); 
    try {
      //const pageId = document.getElementById('id').value;
      const response = await fetch(`/api/v3/page/item/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado
        },
      });
  
      if (response.ok) {
        // Recargar la página después de 2 segundos
        setTimeout(() => {
           window.location.href = `/admin`;
        }, 1500);
      }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal!",
          });
          setTimeout(() => {
            window.location.reload();
         }, 1500);
      }
    } catch (error) {
     console.error(error)
    }
  }

  const handleDeleteUser = async(id)=>{
    const token = localStorage.getItem('token'); 
    try {
      //const pageId = document.getElementById('id').value;
      const response = await fetch(`/api/v3/page/item/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado
        },
      });
  
      if (response.ok) {
        // Recargar la página después de 2 segundos
        setTimeout(() => {
           window.location.href = `/admin`;
        }, 1500);
      }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal!",
          });
          setTimeout(() => {
            window.location.reload();
         }, 1500);
      }
    } catch (error) {
     console.error(error)
    }
  }