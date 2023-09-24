import z from "zod";

export const postRequestValidator = z.object({
  socketId: z.string(),
});
export type postRequestType = z.infer<typeof postRequestValidator>;
