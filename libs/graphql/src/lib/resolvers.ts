import type { Resolvers } from './generated/resolvers-types';

const resolvers: Resolvers = {
  Query: {
    hello: () => 'hai',
  },

  Mutation: {
    signup: async (_, args, context) => {
      const user = await context.prisma.user.findUnique({
        where: { email: args.email },
      });

      if (user) {
        throw new Error('Email sudah terdaftar');
      }

      // TODO: enkrip password sebelum disimpan

      const userCreated = await context.prisma.user.create({
        data: {
          email: args.email,
          username: args.username,
          password: args.password,
        },
      });

      return {
        token: userCreated.password,
        user: {
          id: userCreated.id.toString(),
          email: userCreated.email,
          username: userCreated.username,
        },
      };
    },

    login: async (_, args, context) => {
      const foundUser = await context.prisma.user.findUnique({
        where: { email: args.email },
      });

      if (!foundUser) {
        throw new Error('Email belum terdaftar');
      }

      if (args.password !== foundUser.password) {
        throw new Error('Password tidak sesuai');
      }

      // TODO: simpan info auth ke session & database session

      return {
        token: foundUser.password,
        user: {
          id: foundUser.id.toString(),
          email: foundUser.email,
          username: foundUser.username,
        },
      };
    },
  },
};

export { resolvers };
