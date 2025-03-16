class APiResponse {
    constructor(statusCode,data, message ="Success"){
        this.statusCode = statusCode
        this.message = message
        this.success = statusCode
    }
}