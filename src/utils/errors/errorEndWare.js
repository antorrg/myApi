export default function errorEndWare (err, req, res, next){
    const status = err.status || 500;
    const message = err.message || 'Server error';
    //console.error(message)
    res.status(status).json(message)
}