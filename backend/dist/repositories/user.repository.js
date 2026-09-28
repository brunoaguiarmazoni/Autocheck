"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
class UserRepository {
    prisma;
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });
    }
    async findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email.toLowerCase(),
                password: data.password,
            },
        });
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
