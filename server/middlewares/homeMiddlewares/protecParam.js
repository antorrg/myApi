const protectParam = (req, res, next) => {
    const {id} = req.params;
    const idIsNumber = !isNaN(id) && Number.isInteger(parseFloat(id));

    if (id && !idIsNumber) {
        return res.status(400).render('error', { message: 'Parámetros no permitidos', status: 400 });
    }
    next();
};
export default protectParam