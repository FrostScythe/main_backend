class APIError extends Error {
    constructor(statusCode, message= "Somthing went wrong", errors=[],statck="") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.sucess =false;
        this.errors = errors;
        this.stack = stack;

        //understand below code
        if(statck){
            this.stack= statck
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { APIError}