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
  };
  return appConfig;
};
