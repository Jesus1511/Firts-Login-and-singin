import {secretKey} from '../config.js'
import jwt from 'jsonwebtoken'

export function authenticateToken (req, res, next) {
    const {token} = req.cookies
    
    if (!token) {
        return res.status(401).json({ message: "no token, authorization"})
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(401).json({message: 'ivalid token'})
        }

        req.user = user
    })
    next()
}