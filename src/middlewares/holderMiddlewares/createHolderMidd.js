import throwError from "../../utils/errors/formatError.js";

const createHolderMidd = async (req, res, next)=>{
    const{email, password}= req.body;
    // Validar si existe el email y su formato usando una expresión regular
    if(!email){return res.status(400).json({error: "Falta el email"})};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {return res.status(400).json({error: "¡Formato de email invalido!"})}

    if(!password){return res.status(400).json({error:"¡Falta el password!"})};
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // Al menos 8 caracteres y una letra mayúscula
    if (!passwordRegex.test(password)) {
        return res.status(400).json({error:"Formato invalido. ¡La contraseña debe tener al menos 8 caracteres y una mayuscula!"})}
    

    next();
}

export default createHolderMidd;