const prisma = require('../prisma/prisma');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');

class AuthService {
  async register(data) {
    const {
      fullname,
      email,
      password,
      role
    } = data;

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

        role:
          role || "customer",
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

  async getProfile(userId) {

  return await prisma.user.findUnique({

    where: {
      id: userId,
    },

    select: {
      id: true,
      fullname: true,
      email: true,
      role: true,
      createdAt: true,
    },

  });
}

async updateProfile(userId, data) {

  return await prisma.user.update({

    where: {
      id: userId,
    },

    data: {
      fullname: data.fullname,
      email: data.email,
    },

    select: {
      id: true,
      fullname: true,
      email: true,
      role: true,
      createdAt: true,
    },

  });
}
}

module.exports = new AuthService();
