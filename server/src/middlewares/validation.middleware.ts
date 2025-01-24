import { Request, Response, NextFunction, RequestHandler } from "express";
import { z, ZodObject, ZodEffects } from "zod";

export default function validateRequestBody<
  T extends ZodObject<any> | ZodEffects<ZodObject<any>>
>(schemaFn: T): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schemaFn.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}
