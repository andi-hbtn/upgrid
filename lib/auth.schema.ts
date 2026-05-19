import * as Z from "zod";
export const UserRegisterSchema = Z.object(
    {
        firstname: Z.string().nonempty("firstname should not be empty"),
        lastname: Z.string().nonempty("lastname should not be empty"),
        email: Z.email().nonempty("email should not be empty"),
        password: Z.string().nonempty().min(5, "Password must be at least 5 characters")
    })
