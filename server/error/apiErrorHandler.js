const ApiError = require("./ApiError")

// All errors from controllers will be forwarded to this function which will
// in turn send an appropriate error code and message to the user. Also handles
// cases when user sends path + method combination that is not handled by the API.
const apiErrorHandler = (err, req, res, next) => {
    if(err instanceof ApiError){
        return res.status(err.code).json({msg: err.message})
    } else {
        return res.status(404).json({msg: "Resource not found"})
    }
}

module.exports = apiErrorHandler
