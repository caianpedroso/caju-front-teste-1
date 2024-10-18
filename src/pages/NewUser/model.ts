import { z } from "zod";
import { validation } from "./validation"

export type ResendFormData = z.infer<typeof validation>;