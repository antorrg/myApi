

document.addEventListener('DOMContentLoaded', function () {
    const initialInput = {
        email: '',
        subject: '',
        message: ''
    };
    
    let input = { ...initialInput };
    let error = { ...initialInput };
    let isSubmit = false;

    const validateEmail = (input) => {
        const errors = { email: '', subject: '', message: '' };
        if (!input.email) errors.email = 'Email es requerido';
        else if (!/\S+@\S+\.\S+/.test(input.email)) errors.email = 'Email es invalido';
        if (!input.subject) errors.subject = 'Asunto es requerido';
        if (!input.message) errors.message = 'Mensaje es requerido';
        return errors;
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        input[name] = value;
        error = validateEmail(input);
        document.getElementById(`error${capitalizeFirstLetter(name)}`).textContent = error[name];
        allow();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        error = validateEmail(input);
        setErrors();
        if (Object.values(error).every(err => err === '') && isSubmit) {
            isSubmit = true;
        }

        const confirmed = confirm("¿Desea enviarnos un email? Confirme su accion");
        if (confirmed) {
            try {
                console.log("enviando post", input);
                // Simulación del envío del correo electrónico (aquí deberías implementar la lógica real)
                setTimeout(() => {
                    // Limpia los campos del formulario
                    input = { ...initialInput };
                    document.getElementById('email').value = '';
                    document.getElementById('subject').value = '';
                    document.getElementById('message').value = '';
    
                    // Muestra la alerta de éxito (puedes usar otra forma de alerta en lugar de alert())
                    showAlert("Mensaje enviado exitosamente", "success");
    
                    // Redirige a la página principal después de 2 segundos
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                }, 1000); 
            } catch (error) {
                console.error(error);
                showAlert("Acontecio un error, mensaje no enviado", "error");
            }
        }
    };

    const setErrors = () => {
        Object.keys(error).forEach(key => {
            document.getElementById(`error${capitalizeFirstLetter(key)}`).textContent = error[key];
        });
    };

    const showAlert = (message, type) => {
        alert(message);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const allow = () => {
        const permit =
            !input.email.trim() ||
            !input.subject.trim() ||
            !input.message.trim() ||
            error.email ||
            error.subject ||
            error.message;
        document.getElementById('submitButton').disabled = permit;
    };

    document.getElementById('contactForm').addEventListener('submit', handleSubmit);

    document.getElementById('email').addEventListener('input', handleOnChange);
    document.getElementById('subject').addEventListener('input', handleOnChange);
    document.getElementById('message').addEventListener('input', handleOnChange);
    document.getElementById('cancelButton').addEventListener('click', function () {
        window.location.href = '/';
    });
});
