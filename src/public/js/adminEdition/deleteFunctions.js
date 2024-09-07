
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
          handleDeletePage(id).then(response => {
            if (response.status===200) {
            swalWithBootstrapButtons.fire({
              title: "Hecho!",
            text: "El proyecto ha sido eliminado.",
            icon: "success"
            });
       
          } else {
            // Manejar otros estados si es necesario
            swalWithBootstrapButtons.fire({
              title: "Error",
              text: "Hubo un problema al eliminar el proyecto.",
              icon: "error"
            });
           }
        }).catch(error => {
          // Manejar errores en la solicitud
          swalWithBootstrapButtons.fire({
            title: "Error",
            text: "No se pudo eliminar el proyecto.",
            icon: "error"
          });
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
        handleDeleteItem(id).then(response => {
            if (response.status===200) {
              swalWithBootstrapButtons.fire({
                title: "Hecho!",
              text: "El item ha sido eliminado.",
              icon: "success"
              });
         
            } else {
              // Manejar otros estados si es necesario
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: "Hubo un problema al eliminar el item.",
                icon: "error"
              });
             }
          }).catch(error => {
            // Manejar errores en la solicitud
            swalWithBootstrapButtons.fire({
              title: "Error",
              text: "No se pudo eliminar el item.",
              icon: "error"
            });
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
           handleDeleteUser(id).then(response => {
            if (response.status===200) {
              swalWithBootstrapButtons.fire({
                title: "Hecho!",
              text: "El usuario ha sido eliminado.",
              icon: "success"
              });
         
            } else {
              // Manejar otros estados si es necesario
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: "Hubo un problema al eliminar el usuario.",
                icon: "error"
              });
             }
          }).catch(error => {
            // Manejar errores en la solicitud
            swalWithBootstrapButtons.fire({
              title: "Error",
              text: "No se pudo eliminar el usuario.",
              icon: "error"
            });
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
//*%%%%%%%%%%%%%%%%% Endpoints de borrado %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const handleDeletePage = async(id)=>{
    const token = localStorage.getItem('token'); 
    try {
      //const pageId = document.getElementById('id').value;
      const response = await fetch(`/api/v3/page/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado
        },
      });
  
      if (response.ok) {
        // Recargar la página después de 2 segundos
        setTimeout(() => {
           window.location.href = `/admin`;
        }, 2000);
        return response;
      }else{

          setTimeout(() => {
            window.location.reload();
         }, 2000);
         return response
      }
    } catch (error) {
     console.error(error)
    }
  }

  const handleDeleteItem = async(id)=>{
    const token = localStorage.getItem('token'); 
    try {
      console.log(id)
      //const pageId = document.getElementById('id').value;
      const response = await fetch(`/api/v3/page/item/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado
        },
      });
  
      if (response.ok) {
        // Recargar la página después de 2 segundos
        setTimeout(() => {
           window.location.href = `/admin`;
        }, 2000);
        return response
      }else{

          setTimeout(() => {
            window.location.reload();
         }, 2000);
         return response
      }
    } catch (error) {
     console.error(error)
    }
  }

  const handleDeleteUser = async(id)=>{
    const token = localStorage.getItem('token'); 
    try {
      //const pageId = document.getElementById('id').value;
      const response = await fetch(`/api/v3/hold/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado
        },
      });
  
      if (response.ok) {
        // Recargar la página después de 2 segundos
        setTimeout(() => {
           window.location.href = `/admin`;
        }, 2000);
        return response
      }else{
          setTimeout(() => {
            window.location.reload();
         }, 2000);
         return response
      }
    } catch (error) {
     console.error(error)
    }
  }