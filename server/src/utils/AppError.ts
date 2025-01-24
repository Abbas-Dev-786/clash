class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;
  public errObj: any = {};

  constructor(message: string, statusCode: number, errObj: any = {}) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.errObj = errObj;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
