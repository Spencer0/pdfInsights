import { userDal } from '../dal/userTable';
import { passwordUtils } from '../utils/passwordUtils';
import { UserInput, UserProfile } from '../types/user';

class UserService {
  async createUser({ email, username, password }: UserInput): Promise<UserProfile> {
    const hashedPassword = await passwordUtils.hashPassword(password);
    
    return userDal.createUser({
      email,
      username,
      hashedPassword
    });
  }

  async authenticateUser(email: string, password: string): Promise<UserProfile | null> {
    const user = await userDal.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await passwordUtils.comparePasswords(
      password, 
      user.hashedPassword
    );

    if (!isPasswordValid) {
      return null;
    }

    await userDal.updateLastLogin(email);
    
    const { hashedPassword, ...userProfile } = user;
    return userProfile;
  }

  async getUserProfile(email: string): Promise<UserProfile | null> {
    console.log("trying to get ser profile");
    const user = await userDal.getUserByEmail(email);
    if (!user) {
      return null;
    }
    
    const { hashedPassword, ...userProfile } = user;
    return userProfile;
  }

  //For debugging users endpoint TODO
  async getTestUserProfile(): Promise<UserProfile | null> {

    const testUserProfile = {
        hashedPassword:"fee",
        email : "s@s.com",
        created : " fefef",
        createdAt: " gegwg",
        username:"test",
        userId :"1"

    }
    return testUserProfile;
  }
}

export const userService = new UserService();