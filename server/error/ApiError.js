// ApiError class is to simplify error handling by putting the most important
// information about an error unto a single object.
class ApiError {
    
    // Parameters: - code (int): HTTP error code
    //             - message (string) : Error message
    constructor(code, message){
        this.code = code
        this.message = message
    }

    // Parameters: - message (string) : Error message
    //      
    // Return: ApiError object that captures the important information about badRequest errors    
    static badRequest = (message)=>{
        return new ApiError(400, message)
    }

    // Parameters: - message (string) : Error message
    //      
    // Return: ApiError object that captures the important information about internal errors   
    static internalError = (message = "Server has encountered an internal error. Please contact administrator at jamesardian01@gmail.com and inform them.")=>{
        return new ApiError(500, message)
    }

    
    // Parameters: - message (string) : Error message
    //      
    // Return: ApiError object that captures the important information about resource not found errors    
    static resourceNotFound = (message)=>{
        return new ApiError(404, message)
    }

    // Parameters: - message (string) : Error message
    //      
    // Return: ApiError object that captures the important information about resource conflict errors
    static conflict = (message)=>{
        return new ApiError(409, message)
    }
}

module.exports = ApiError