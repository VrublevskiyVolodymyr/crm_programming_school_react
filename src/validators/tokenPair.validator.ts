import Joi from "joi";

export const authValidator = Joi.object({
    username:Joi.string().regex(/^[A-Za-z0-9+_.-]+@(.+)$/).messages({
        'string.pattern.base': 'Username must start with letter, and consists with letters, numbers or _. Lencharactersgth min 1 max 20 '
    }).required(),
    password:Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{5,20}.*$|^admin$/).messages({
        'string.pattern.base': 'Password must consists from 1 uppercase, 1 lowercase, 1 number, 1 non-alphanumeric. Length min 5 max 20 chs'
    })

})