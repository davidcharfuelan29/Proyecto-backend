const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
};

module.exports = errorHandler;