import {z} from 'zod'

export const registerSquema = z.object({
    username : z.string({
        required_error: 'username is required'
    }),
    email: z.string({
        required_error: 'Email is required'
    }).email ({
        message: 'invalid email'
    }),
    password: z.string({
        required_error: 'password is required'
    }).min(6, {
        message: 'password must be at least 6 characteres'
    })
});


export const loginSquema = z.object({
    email: z.string({
        required_error: 'Email is required'
    }).email ({
        message: 'invalid email'
    }),
    password: z.string({
        required_error: 'password is required'
    }).min(6, {
        message: 'password must be at least 6 characteres'
    })
}) 