import userModel from "@/resources/user/user.model";
import token from "@/utils/token";

class UserService {
    private user = userModel

    public async register(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({name, email, password,role});
            const accressToken = token.createToken(user)
            return accressToken
        } catch (error) {
            throw new Error('Unable to create user');
        }
    }

    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({email});
            if(!user) {
                throw new Error('Unable to find user that Email address');
            }
            if(await user.isValidPassword(password)) {
                return token.createToken(user)
            } else {
                throw new Error('Wrong credentials given')
            }
        } catch (error) {
            throw new Error('Unable to login user')
        }
    }
}

export default UserService