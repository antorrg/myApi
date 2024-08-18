export const renderView = ( res, view, options = {}) => {
    return new Promise((resolve, reject) => {
      res.render(view, options, (err, html) => {
        if (err) return reject(err);
        resolve(html);
      });
    });
  }

let store = null

export const getStore =()=>{
    return store 
}
export const setStore = (info)=>{
   store = info
}
export const cleanStore = ()=>{
    store = null;
}