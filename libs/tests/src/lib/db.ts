type UserModel = {
  id: number;
  email: string;
  password: string;
};

const users = [
  {
    id: 12,
    email: 'jahenipis@gmail.com',
    password: '87654321',
  },
];

const db = {
  async user({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<null | UserModel> {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      return null;
    }
    return { ...user };
  },
};

export { db };
