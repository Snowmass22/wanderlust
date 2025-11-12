class ExpressError extends Error{
    constructor(StatusCode, message){
        super();
        this.StatusCode=StatusCode;
        this.message=message;
        console.log(this.message);
        }
    }
    module.exports=ExpressError;
    

