/* eslint-disable @typescript-eslint/no-unused-vars */
namespace Express {
  interface Request {
    user?: { id: number };
    parsed: { body: unknown; params: unknown; query: unknown };
  }
}
