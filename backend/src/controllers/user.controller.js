const Joi = await import("joi");
import { encript } from "../utils/bcrypt.js";
import prisma from "../utils/client.js";
import { logger } from "../utils/winston.js";
import { userUpdateValidation, userValidation } from "../validations/user.validation.js";
import { compare } from "bcrypt";
import { generateAccessToken } from "../utils/jwt.js";

export const createUser = async (req, res) => {
    const { error, value } = userValidation(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            result: null
        });
    }
    try {
        const result = await prisma.user.create({
            data: {
                name: value.name,
                userName: value.userName,
                password: encript(value.password),
                role: value.role,
            }
        })
        result.password = "xxxxxxxxxxx";
        return res.status(200).json({
            message: "success",
            result,
        })
    } catch (error) {
        logger.error(
            "controllers/user.controller.js:createUser - " + error.message
        )
        return res.status(500).json({
            message: error.message,
            result: null
        });
    }
};

export const userUpdate = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: Number(req.params.id) },
    });
    if (!user) {
        return res.status(404).json({
            message: "User not found",
            result: null
        });
    }

    const { error, value } = userUpdateValidation(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            result: null
        })
    }
    let pass = user.password;
    if (value.password && value.password.length > 0) {
        pass = encript(value.password);
    }
    try {
        const result = await prisma.user.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                name: value.name,
                userName: value.userName,
                password: pass,
                role: value.role,
            }
        });
        result.password = "xxxxxxxxxxx";
        return res.status(200).json({
            message: "success",
            result,
        });
    } catch (error) {
        logger.error(
            "controllers/user.controller.js:userUpdate - " + error.message
        )
        return res.status(500).json({
            message: error.message,
            result: null
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const result = await prisma.user.findFirst({
            where: {
                userName: req.body.userName,
            }
        });
        if (result) {
            if (compare(req.body.password, result.password)) {
                // generate token
                result.password = "xxxxxxxxxxx";
                const accessToken = generateAccessToken(result);
                const refreshToken = generateAccessToken(result);
                return res.status(200).json({
                    message: "success",
                    result,
                    accessToken,
                    refreshToken
                })
            } else {
                return res.status(500).json({
                    message: "password not match",
                    result: null
                })
            }
        } else {
            return res.status(500).json({
                message: "user not found",
                result: null
            });
        }
    } catch (error) {
        logger.error(
            "controllers/user.controller.js:loginUser - " + error.message
        )
        return res.status(500).json({
            message: error.message,
            result: null
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const result = await prisma.user.delete({
            where: {
                id: Number(req.params.id),
            }
        });
        result.password = "xxxxxxxxxxx";
        return res.status(200).json({
            message: "success",
            result,
        });
    } catch (error) {
        logger.error(
            "controllers/user.controller.js:deleteUser -" + error.message
        );
        return res.status(500).json({
            message: error.message,
            result: null,
        })
    }
};
