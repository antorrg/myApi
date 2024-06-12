
export default function holderParser (info, isObj) { 
    return isObj? parser(info) :  info.map((dt)=> parser(dt))
 };
 const parser = (data) => {
    return {
        id: data.id,
        email: data.email,
        nickname: data.nickname,
        givenName: data.given_name,
        image: data.picture,
        role: data.role,
        country: data.country,
        enable: data.enable,

    };
 }