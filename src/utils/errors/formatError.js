// const throwError = (message, status)=>{
//     const error = {
//                     message : message,
//                     status: status
//                   }
//     throw error;
//   }
  const throwError = (message, status, code = null, log = false) =>{
  const error = new Error(message);
  error.status = status;
  if (code) error.code = code;
  if (log) console.error(error); // Ejemplo de logging simple
  throw error;
}
export default throwError  

