import { Schema, HookNextFunction, Document } from "mongoose";
import * as bcrypt from "bcryptjs"
import * as jwt from 'jsonwebtoken';

export const UserSchema = new Schema({
    username: String,
    password: String
    },{
    timestamps: true
})

export interface User extends Document{
    _id: string,
    username: string,
    password: string,
    comparePassword: (string) => string
    toResponseObject: (boolean?) => any
}

UserSchema.pre('save', async function(next: HookNextFunction){
    try{
        this['password'] = await bcrypt.hash(this['password'], 10)
        return next()
    }
    catch(err){
        return next(err)
    }
})
UserSchema.methods.toResponseObject = async function(showToken: boolean){
    const { _id, username } = this
    const token =  jwt.sign(
        {
          _id,
          username,
        },
        "thisIsSecretKey",
        { expiresIn: '7d' },
      );
    const responseObject = {
        _id,
        username
    }
    if(showToken){
        responseObject['token'] = token
    }
    return responseObject
}

UserSchema.methods.comparePassword = async function(attempt: string): Promise<boolean>{
    return await bcrypt.compare(attempt, this['password'])
}

// UserSchema.methods.generateToken = async function(){
//     const { id, username } = this;
//     return jwt.sign(
//       {
//         id,
//         username,
//       },
//       "thisIsSecretKey",
//       { expiresIn: '7d' },
//     );
// }