import {initTRPC, TRPCError} from "@trpc/server";
import {createContext} from "./context";

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<typeof createContext>().create();

const isAuthed = t.middleware(({next, ctx}) => {
  if (!ctx.session?.user?.email) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      // Infers the `session` as non-nullable
      session: ctx.session,
    },
  });
});

const loggerMiddleware = t.middleware(async ({path, type, next}) => {
  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;
  result.ok
    ? console.log("OK request timing:", {path, type, durationMs})
    : console.log("Non-OK request timing", {path, type, durationMs});
  return result;
});
export const middleware = t.middleware;

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
export const loggedProcedure = publicProcedure.use(loggerMiddleware);
export const protectedProcedure = t.procedure.use(isAuthed);
