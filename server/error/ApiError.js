// ApiError class is to simplify error handling by putting the most important
// information about an error unto a single object.
class ApiError {
    
    constructor(code, message){
        this.code = code
        this.message = message
    }

    static badRequest = (message)=>{
        return new ApiError(400, message)
    }

    static internalError = (message = "Server has encountered an internal error. Please contact administrator at jamesardian01@gmail.com and inform them.")=>{
        return new ApiError(500, message)
    }

    static resourceNotFound = (message)=>{
        return new ApiError(404, message)
    }

    static conflict = (message)=>{
        return new ApiError(409, message)
    }
}

module.exports = ApiError