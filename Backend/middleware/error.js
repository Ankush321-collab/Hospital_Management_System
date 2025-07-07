class ErrorHandler extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode=statuscode
    }
}

//error middleware
export const errormiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statuscode = err.statuscode || 500;

    // Handle MongoDB duplicate key error (code 11000)
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }
    if(err.name==="JsonWebTokenError"){
        const message="json web token is invalid try again"
        err=new ErrorHandler(message,400)
    }

    if(err.name==="TokenExpiredError"){
        const message="json web token is Expired try again"
        err=new ErrorHandler(message,400)
    }
    const errormessage=err.errors?Object.values(err.errors).map((error)=>{
        return error.message
    }).join(" && "):err.message

    res.status(err.statuscode).json({
        success: false,
        message: errormessage,
    });
};

