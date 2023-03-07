import {publicProcedure, router} from "../trpc";
import {z} from "zod";

export const exampleRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({input}) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
});
