

const createHolderMidd = async (req, res, next)=>{
    const{email, password}= req.body;
    // Validar si existe el email y su formato usando una expresión regular
    if(!email){return res.status(400).json({error: "missing email"})};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {return res.status(400).json({ error: "invalid email format" });}

    if(!password){return res.status(400).json({error: "missing password"})};
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/; // Al menos 8 caracteres y una letra mayúscula
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: "invalid password format. Pass musk contain at least 8 char and 1 cap.letter"});
    }
    

    next();
}

export default createHolderMidd;