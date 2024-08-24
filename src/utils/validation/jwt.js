import pkg from 'jsonwebtoken'
import env from '../envConfig.js'

export default {
 verifyToken : (req, res, next)=>{
 let token = req.headers['x-access-token'] || req.headers.authorization;

    if(!token){ return res.status(401).json({error: 'Acceso no autorizado. Token no proporcionado'})}
    if (token.startsWith('Bearer')) {
        // Eliminar el prefijo 'Bearer ' del token
        token = token.slice(7, token.length);
    }

    pkg.verify(token, env.SecretKey, (err, decoded)=>{
        if(err){
            if(err.name === 'TokenExpiredError'){return res.status(401).json({error: 'Token expirado'})
            }return res.status(401).json({error: 'Token invalido'})
        }
        req.user = decoded;
        const userId = decoded.userId;
        const userRole= decoded.role;
        req.userInfo = {userId, userRole}
        //console.log('userInfo: ', req.user.userId, )
        //console.log('soy role : ', req.user.role)
        next();
    })

},

generateToken : (user)=>{
    
    const token = pkg.sign({userId: user.id, email:user.email, role:user.role}, env.SecretKey, {expiresIn: '1h'});
    return token;

},
checkRole : (allowedRoles) => {
    return (req, res, next) => {
      const {userRole}= req.userInfo;
      //const userRole = req.user.role; // asumiendo que el rol está en req.user después de la autenticación
  
      if (allowedRoles.includes(userRole)) {
        // El usuario tiene el rol necesario, permitir el acceso
        next();
      } else {
        // El usuario no tiene el rol necesario, rechazar la solicitud
        res.status(403).json({ error: 'Unauthorized access' });
      }
    };
  },
}

//Este es un modelo de como recibe el parámetro checkRole:
  //todo   app.get('/ruta-protegida', checkRole(['admin']), (req, res) => {