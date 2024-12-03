const userModel = require('../models/userModel');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateJWT } = require('../utils/jwt');
const { ObjectId } = require('../utils/mongooseConnection');

class UserService {

    static async validateUserId(userId, throwError){
        console.log("userId",userId)
        let user = await userModel.findOne({_id: new ObjectId(userId)});
        console.log("user",user)
        if(!user && throwError){
            throw new Error('User not found');
        }
        return user;
    }

    static async validateUserEmail(email, throwError){
        let user = await userModel.findOne({ email, deletedAt: null });
        
        if(user && throwError){
            throw new Error('User already exists');
        }
        return user;
    }

    static async register(body){
        const { name, email, password } = body;

        await this.validateUserEmail(email, true);
        
        const hased = await hashPassword(password);        
        
        let user = new userModel({ name, email, password: hased });
        user.token = generateJWT();
        await user.save();

        return user;
    }

    static async getUser(userId){
        let user = await this.validateUserId(userId, true);
        return { name: user.name, email: user.email, role: user.role };
    }
}

module.exports = UserService;