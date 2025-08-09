import joi from "joi";

export const productValidation = (payload) => {
    const schema = joi.object({
        barcode: joi.string().trim().allow(null).allow(""),
        productName: joi.string().trim().required(),
        Image: joi.string().trim().allow(null).allow(""),
        url: joi.string().trim().allow(null).allow(""),
        qty: joi.number().required(),
        price: joi.number().required(),
        kategoryId: joi.number().required(),
        supplierId: joi.number().required(),
        file: joi.object().allow(null).allow(""),
    });
    return schema.validate(payload);
};