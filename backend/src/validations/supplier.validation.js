import e from "cors";
import joi from "joi";
import { add } from "winston";

export const supplierReturnValidation = (payload) => {
    const schema = joi.object({
        firstName: joi.string().trim().required().required(),
        lastName: joi.string().allow(null).alow(""),
        phone: joi.string().trim().required(),
        email: joi.string().trim().allow(null).allow(""),
        address: joi.string().trim().required(),
    });
    return schema.validate(payload);
};