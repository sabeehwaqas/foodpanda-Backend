import joi from "joi";

export const ValidateSignup = (userData) => {
    const Schema = joi.object({
        fullname:joi.string().required(),
        email:joi.string().required().email(),
        password:joi.string().min(5),
        address:joi.array().items(joi.object({detail:joi.string(), for:joi.string()})),
        phoneNumber:joi.number().min(10).max(12)
    });

    return Schema.validateAsync(userData);
}

export const ValidateSignin = (useData) => {
    const Schema = joi.object({
        email:joi.string().required().email(),
        password:joi.string().required().min(5)
    });
    return Schema.validateAsync(useData);
}