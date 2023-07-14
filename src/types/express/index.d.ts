/* eslint-disable @typescript-eslint/no-unused-vars */
namespace Express {
  interface Request {
    user?: { id: string };
    parsed: { body: unknown; params: unknown; query: unknown };
  }
}
