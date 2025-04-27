import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  private get usersCollection() {
    return this.databaseService.getDb().collection('users');
  }

  async findByEmail(email: string) {
    return this.usersCollection.findOne({ email });
  }

  async createUser(email: string, password: string, role = 'user') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    };
    await this.usersCollection.insertOne(newUser);
    return newUser;
  }
}
