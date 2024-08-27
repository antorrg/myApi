// Función para obtener los datos protegidos
export async function fetchProtectedData() {

    try {
        const response = await fetch('/logout', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }
        });
 
    } catch (error) {
        // window.location.href = '/error';
        // window.location.reload()
      throw error;
    }
}

// Llama a esta función cuando necesites obtener datos protegidos
//await fetchProtectedData();

