export default async (): Promise<unknown> => {
  const appConfig = {
    mysql: {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.DB_PASSWORD,
      database: 'site_bomb',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    },
    mail: {
      user: 'serban.munteanu1211@gmail.com',
      pass: 'fysw6gf3k',
      from: 'serban.munteanu1211@gmail.com',
      queue: {
        host: 'localhost',
        port: '6379',
      },
    },
  };
  return appConfig;
};
