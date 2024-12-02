const UserService = require('./userService');
const { comparePassword } = require('../utils/password');
const { generateJWT } = require('../utils/jwt');
const userModel = require('../models/userModel');
const LogService = require('./logService');

class Auth {
    static async login(body){
        const { email, password } = body;

        let user = await UserService.validateUserEmail(email, false);
        if(!user){
            throw new Error('User not found');
        }

        const isMatch = await comparePassword(password, user.password);
        if(!isMatch){
            throw new Error('Invalid password');
        }

        user.token = generateJWT(user);

        await user.save();

        await LogService.recordLog(user._id, 'new login', { email});
        
        return {token: user.token, _id: user._id };;
    }

    static async logout(userId){
       let user = await userModel.findOneAndUpdate({ _id: userId}, { token: null}, { new: true});
       if(!user){
        throw new Error('user not found');
       }

        return true;
    }
}

module.exports = Auth;