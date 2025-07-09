const AppError = require("../utils/appError") 

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}` //! hata mesajı oluştur
    return new AppError(message, 400) //! yeni bir AppError nesnesi döner
}

const handleDublicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0] //! hata mesajını al
    const message = `Duplicate field value: ${value}. Please use another value!` //! hata mesajı oluştur
    return new AppError(message, 400)
}

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message) //! hata mesajlarını al
    const message = `Invalid input data. ${errors.join(". ")}` //! hata mesajı oluştur
    return new AppError(message, 400) //! yeni bir AppError nesnesi döner
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    })
}

const sendErrorProd = (err, res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    }else{
        //! 1) Log error
        console.error("ERROR", err)

        //! 2) Send generic message
        res.status(500).json({
            status: "error",
            message: "Something went very wrong!",
        })
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500 //! hata kodu yoksa 500 döner
    err.status = err.status || "error" //! hata durumu yoksa error döner

    if(process.env.NODE_ENV === "development"){
        sendErrorDev(err, res)
    }else if (process.env.NODE_ENV === "production"){
        
        if (err.name === "CastError") {
            err = handleCastErrorDB(err)
        }
        if(err.code === 11000){ //! dublicate error
            err = handleDublicateFieldsDB(err)
        }
        if (err.name === "ValidationError") { //! validation error
            err = handleValidationErrorDB(err) //! yeni bir AppError nesnesi döner
        }
        
        sendErrorProd(err, res)
    }
    // next() //! hata middleware'inde next() kullanılmaz
}