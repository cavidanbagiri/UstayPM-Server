
// const UserNotFoundError = require("../exceptions/UserError");

const errorHandler = (err, req, res, next) => {

    // if(err instanceof UserNotFoundError){
    //     return res.status(err.statusCode).send(err.message);
    // }

    console.log('Error Handler From Middleware : ',err);
    return res.status(400).send(err);
}

module.exports = errorHandler;
