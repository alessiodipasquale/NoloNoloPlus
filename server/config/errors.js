Error.prototype.is = function (err) {
    return err.message === this.message;
};

const BadRequestError = new Error('BAD_REQUEST');
const AlreadyExistsError = new Error('ALREADY_EXISTS');
const UnauthorizedError = new Error('UNAUTHORIZED');
const NotFoundError = new Error('NOT_FOUND');

const errorHandler = () => (req, res, next) => {
    res.handle = function (err) {
        if (global.config.log)
            console.error(err);
        if (err.is(BadRequestError))
            res.status(400).send();
        else if (err.is(UnauthorizedError))
            res.status(401).send();
        else if (err.is(NotFoundError))
            res.status(404).send();
        else if (err.is(AlreadyExistsError))
            res.status(403).send();
        else
            res.status(500).send();
    };
    next();
};

module.exports = {
    BadRequestError,
    UnauthorizedError,
    NotFoundError,
    AlreadyExistsError,
    errorHandler
};