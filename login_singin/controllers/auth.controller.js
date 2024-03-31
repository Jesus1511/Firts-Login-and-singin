import User from '../squemas/user.squema.js'
import bcrypt from 'bcrypt'
import {createAccesToken} from '../libs/jwt.js'

export const register = async (req, res) => {
    const {email, password, username} = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const userFound = await User.find({email: email})

        if (userFound.length > 0) {
            return res.status(500).json({message: 'email is already used'})
        }

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        const userSaved = await newUser.save()

        const token = await createAccesToken({id: userSaved._id})
        res.cookie('token', token)
        res.json(userSaved)
    }

    catch (err) {
        res.status(505).json({message: err})
        console.log(err)
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const userFound = await User.findOne({ email: email })

        if(!userFound){
            return res.status(400).json({message: "usuario no encontrado"})
        }

        const isMatch = await bcrypt.compare(password, userFound.password)


        if (!isMatch){
            return res.status(400).json({message: 'la contraseña o el usuario es incorrecto'})
        }

        const token = await createAccesToken({id: userFound._id})
        res.cookie('token', token)
        res.json(userFound)
    }

    catch (err) {
        res.status(505).json({message: err})
        console.log(err)
    }
}

export const logout = async (req, res) => {
    res.cookie('token',"",{expires: new Date(0)})
    res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if(!userFound) {
        return res.status(400).json({message: 'user not found'})
    }

    res.send(userFound.username + " profile")
}