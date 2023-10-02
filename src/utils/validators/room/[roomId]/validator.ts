import z from "zod";

export const putRequestValidator = z.object({
  storeString: z.string(),
  socketId: z.string(),
});
export type putRequestType = z.infer<typeof putRequestValidator>;
