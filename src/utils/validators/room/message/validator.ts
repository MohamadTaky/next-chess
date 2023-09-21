import z from "zod";

export const postRequestValidator = z.object({
  message: z.string(),
  socketId: z.string(),
});
export type postRequestType = z.infer<typeof postRequestValidator>;
