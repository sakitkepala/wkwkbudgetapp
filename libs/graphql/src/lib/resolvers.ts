import type { Resolvers } from './generated/resolvers-types';
import { hash, compare } from 'bcryptjs';

const resolvers: Resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (!context.currentUser) {
        throw new Error('Belum login');
      }
      const user = await context.prisma.user.findUnique({
        where: { id: context.currentUser.id },
      });
      return { ...user, id: user.id.toString() };
    },

    hello: () => 'hai',

    protected: (_, __, context) => {
      return context.currentUser ? 'boleh' : 'login dulu';
    },
  },

  Mutation: {
    signup: async (_, args, context) => {
      if (context.currentUser) {
        throw new Error('Sudah punya akun user');
      }

      const foundUsers = await context.prisma.user.findMany({
        where: {
          OR: [{ email: args.email }, { username: args.username }],
        },
      });
      if (foundUsers.find((user) => user.email === args.email)) {
        throw new Error('Email sudah terdaftar');
      }
      if (foundUsers.find((user) => user.username === args.username)) {
        throw new Error('Username sudah terdaftar');
      }

      const passwordWithHash = await hash(args.password, 10);
      const userCreated = await context.prisma.user.create({
        data: {
          email: args.email,
          username: args.username,
          password: passwordWithHash,
        },
      });
      return {
        id: userCreated.id.toString(),
        email: userCreated.email,
        username: userCreated.username,
      };
    },

    login: async (_, args, context) => {
      if (context.currentUser) {
        throw new Error('Sudah masuk');
      }

      const foundUser = await context.prisma.user.findUnique({
        where: { email: args.email },
      });
      if (!foundUser) {
        throw new Error('Email belum terdaftar');
      }

      const match = await compare(args.password, foundUser.password);
      if (!match) {
        throw new Error('Password tidak sesuai');
      }

      context.req.session.set('userId', foundUser.id);
      return {
        id: foundUser.id.toString(),
        email: foundUser.email,
        username: foundUser.username,
      };
    },

    logout: (_, __, context) => {
      if (!context.currentUser) {
        return 'Tidak tersedia untuk user publik';
      }
      context.req.session.delete();
      return 'Keluar';
    },
  },
};

export { resolvers };
