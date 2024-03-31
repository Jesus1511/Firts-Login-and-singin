import jwt from 'jsonwebtoken'
import { secretKey } from '../config.js'

export async function createAccesToken (user) {
    try {
        const token = await jwt.sign(user, secretKey, {expiresIn: '1d'})
        return token
    } catch (err) {
        return err
    }

}