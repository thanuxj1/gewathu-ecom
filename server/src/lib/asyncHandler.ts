import type { NextFunction, ParamsDictionary, Request, RequestHandler, Response } from "express-serve-static-core";

// Express 4 does not catch rejected promises from async route handlers — an
// unhandled rejection (e.g. a transient DB error) crashes the whole process.
// Wrapping every handler routes the error to Express's error middleware instead.
// Generic over Params so route placeholders (e.g. `:id`) keep their `string`
// type instead of widening to ParamsDictionary's `string | string[]`.
export function asyncHandler<Params = ParamsDictionary>(
  fn: (req: Request<Params>, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandler<Params> {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
