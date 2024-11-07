// src/types/user.ts
export interface UserInput {
    email: string;
    username: string;
    password: string;
  }
  
  export interface UserCreate extends Omit<UserInput, 'password'> {
    hashedPassword: string;
  }
  
  export interface UserRecord extends UserCreate {
    userId: string;
    createdAt: string;
    lastLoginAt?: string;
  }
  
  export type UserProfile = Omit<UserRecord, 'hashedPassword'>;