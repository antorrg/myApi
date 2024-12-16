
  const throwError = (message, status, code = null, log = false) =>{
  const error = new Error(message);
  error.status = status;
  if (code) error.code = code;
  if (log) console.error(error); // Ejemplo de logging simple
  throw error;
}
export default throwError  

