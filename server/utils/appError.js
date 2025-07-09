class AppError extends Error{
    constructor(message, statusCode) {
        super(message) //! hata mesajını alır

        this.statusCode = statusCode //! hata kodunu alır
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error" //! hata durumu 4xx ise fail, 5xx ise error döner
        this.isOperational = true //! hata durumu operasyona ait mi

        Error.captureStackTrace(this, this.constructor) //! hata yığın izini alır
    }
}

module.exports = AppError //! hata sınıfını dışa aktarır