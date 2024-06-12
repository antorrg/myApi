import pkg from 'jsonwebtoken'
import env from '../../../envConfig.js'

export default {
 verifyToken : (req, res, next)=>{
 let token = req.headers['x-access-token'] || req.headers.authorization;

 if(!token){ return res.status(401).json({error: 'Acceso no autorizado. Token no proporcionado'})}
 if (token.startsWith('Bearer ')) {
    // Eliminar el prefijo 'Bearer ' del token
    token = token.slice(7, token.length);
   }

 pkg.verify(token, env.SecretKey, (err, decoded)=>{
    if(err){
        if(err.name === 'TokenExpiredError'){return res.status(401).json({error: 'Token expirado'})
        }return res.status(401).json({error: 'Token invalido'})
    }
    req.user = decoded;
    const userId = decoded._id;
    const userRole= decoded.role;
    req.userInfo = {userId, userRole}
    //console.log('userInfo: ', req.user.userId, )
    //console.log('soy role : ', req.user.role)
    next();
 })

},

generateToken : (user)=>{
    
    const token = pkg.sign({userId: user._id, email:user.email, role:user.role}, env.SecretKey, {expiresIn: '5h'});
    return token;

},
}