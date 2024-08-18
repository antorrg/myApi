
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