import z from "zod";

export const messageSchema = z.object({
    content: z
            .string()
            .min(5, "content must be atleast 5 characters")
            .max(300, "content cannot exceed 300 characters")
})