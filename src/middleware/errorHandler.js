
const EmptyFieldError = require("../exceptions/EmptyFieldError");
const UserNotFoundError = require("../exceptions/UserNotFoundError");

const errorHandler = (err, req, res, next) => {

    if(err instanceof UserNotFoundError){
        console.log('Yes Error is instance of UserNotFoundError', err.message);
        return res.status(err.statusCode).send(err.message);
    }
    if(err instanceof EmptyFieldError){
        console.log('Yes Error is instance of EmptyFieldError', err.message);
        return res.status(err.statusCode).send(err.message);
    }

    console.log('Error Handler From Middleware : ',err);
    return res.status(400).send(err);
}

module.exports = errorHandler;
