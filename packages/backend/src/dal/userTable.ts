import { DynamoDB } from 'aws-sdk';
import { UserCreate, UserRecord, UserProfile } from '../types/user';

class UserDal {
  private dynamoDB: DynamoDB.DocumentClient;
  private tableName: string;

  constructor() {
    this.dynamoDB = new DynamoDB.DocumentClient({
      region: process.env.AWS_REGION || 'us-east-1'
    });
    this.tableName = process.env.USERS_TABLE_NAME || 'Users';
  }

  async createUser(userData: UserCreate): Promise<UserProfile> {
    console.log("create user")
    const userRecord: UserRecord = {
      userId: userData.email,
      email: userData.email,
      username: userData.username,
      hashedPassword: userData.hashedPassword,
      createdAt: new Date().toISOString()
    };

    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: userRecord,
      ConditionExpression: 'attribute_not_exists(userId)'
    };

    try {
      await this.dynamoDB.put(params).promise();
      const { hashedPassword, ...userProfile } = userRecord;
      return userProfile;
    } catch (error) {
      if (error instanceof Error && error.name === 'ConditionalCheckFailedException') {
        throw new Error('USER_EXISTS');
      }
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<UserRecord | null> {
    console.log("getUserByEmail")
    console.log("getUserByEmail")
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName:  "spend-sage-users-table",
      Key: {
        userId: email
      }
    };

    const result = await this.dynamoDB.get(params).promise();
    console.log(result)
    return (result.Item as UserRecord) || null;
  }

  async updateLastLogin(email: string): Promise<void> {
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: {
        userId: email
      },
      UpdateExpression: 'set lastLoginAt = :lastLogin',
      ExpressionAttributeValues: {
        ':lastLogin': new Date().toISOString()
      }
    };

    await this.dynamoDB.update(params).promise();
  }
}

export const userDal = new UserDal();