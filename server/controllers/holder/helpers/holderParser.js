
export default function holderParser (info, isObj) { 
    return isObj? parser(info) :  info.map((dt)=> parser(dt))
 };
 const parser = (data) => {
    const transformedRole= wordRole(data.role)
    return {
        id: data.id,
        email: data.email,
        nickname: data.nickname,
        givenName: data.given_name,
        image: data.picture,
        role: transformedRole,
        country: data.country,
        enable: data.enable,

    };
 }

 const wordRole = (role)=>{
    switch (role) {
      case 0:
        return 'admin';
      case 1:
        return 'user';
      case 2:
        return 'moderator';
      case 9:
        return 'super admin';
      default:
        return 'unknown role';
    }
  }

  const scope = (user)=>{
    switch(user.role){
      case 0:
      return "Administrador"
      case 2 : 
      return "Moderador"
      case 9 :
      return "Super Admin"
      case 1 :
      default :
      return "Usuario"
    }
}
export const revertScope = (user)=>{
    switch(user.role){
      case "Administrador":
      return 0;
      case "Moderador": 
      return 2;
      case "Super Admin":
      return 9
      case "Usuario":
      default :
      return 1
    }
}