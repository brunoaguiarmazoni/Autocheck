import { PrismaClient, User } from '@prisma/client';

export class UserRepository {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: { name: string; email: string; password: string }): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: data.password,
      },
    });
  }
}

export const userRepository = new UserRepository();
