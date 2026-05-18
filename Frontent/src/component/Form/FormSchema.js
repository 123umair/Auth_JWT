import {z} from 'zod'


export const formSchema = z.object({
    username:z.string().min(1,'name is required.'),
    email:z.string().email().min(1,'email is required'),
     password: z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  age: z
  .number({
    required_error: "Age is required",
    invalid_type_error: "Age must be a number"
  })
  .min(18, "Age must be at least 18")
  .max(100, "Age must be less than 100")
})
