import z from "zod";

export const postRequestValidator = z.object({
  fromRow: z.number(),
  fromCol: z.number(),
  toRow: z.number(),
  toCol: z.number(),
  socketId: z.string(),
});
export type postRequestType = z.infer<typeof postRequestValidator>;
