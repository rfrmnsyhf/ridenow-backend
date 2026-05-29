const prisma = require('../prisma/prisma');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');

class AuthService {
  async register(data) {
    const { fullname, email, password } = data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      throw new Error('Email already used');
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }

  async login(email, password) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      throw new Error('Wrong password');
    }

    const token = generateToken(user);

    const userResponse = {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    };

    return {
      user: userResponse,
      token
    };
  }
}

module.exports = new AuthService();
