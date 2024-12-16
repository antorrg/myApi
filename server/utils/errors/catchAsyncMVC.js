const catchAsyncMVC = (controller) => {
    return (req, res, next) => {
        return controller(req, res, next).catch((err) => {
            // En caso de error, redirigir a una página de error
            res.status(err.status || 500);
            res.render('error', { message: err.message, status: err.status || 500 });
        });
    };
};

export default catchAsyncMVC;