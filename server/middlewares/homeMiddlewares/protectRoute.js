
const protectRoute = (req, res, next) => {
    const unexpectedParams = Object.keys(req.body).length > 0;
    // Verifica que 'id' en la query sea un número si está presente
    const id = req.query.id;
    const idIsNumber = !isNaN(id) && Number.isInteger(parseFloat(id));

    if (unexpectedParams || (id && !idIsNumber)) {
        return res.status(400).render('error', { message: 'Parámetros no permitidos', status: 400 });
    }
    next();
};


export default protectRoute;
