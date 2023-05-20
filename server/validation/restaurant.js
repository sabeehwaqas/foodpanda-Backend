import joi from "joi";

export const ValidateRestaurantCity = (resObject) => {
    const Schema = joi.object({
        city:joi.string().required()
    });

    return Schema.validateAsync(resObject);
}

export const ValidateRestaurantSearchString = (resObject) => {
    const Schema = joi.object({
       searchString:joi.string().required()
    });
    return Schema.validateAsync(resObject);
}