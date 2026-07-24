import z from "zod";

export const ButtonType = z.enum(["primary", "default", "text"]);
export type ButtonType = z.infer<typeof ButtonType>;
