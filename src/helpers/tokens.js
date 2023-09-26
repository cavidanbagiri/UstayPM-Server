const JWT = require('jsonwebtoken');


const generateToken = (data) => {
    return JWT.sign({ data }, process.env.GENERATE_TOKEN_KEY, { expiresIn: "14h" })
}

const refreshToken = (data) => {
    return JWT.sign({ data }, process.env.REFRESH_TOKEN_KEY)
}


module.exports = {
    generateToken,
    refreshToken
}