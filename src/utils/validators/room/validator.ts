import z from "zod";

export const postRequestValidator = z.object({
  storeString: z.string(),
});
export type postRequestType = z.infer<typeof postRequestValidator>;
