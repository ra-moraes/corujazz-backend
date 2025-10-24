import 'dotenv/config';
import { DataSourceOptions, DataSource } from 'typeorm';

const validatedEnv = process.env;

const isDevEnvironment =
  validatedEnv.NODE_ENV === 'test' || validatedEnv.NODE_ENV === 'development';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: validatedEnv.DB_URL,
  logging: isDevEnvironment,
  ssl: validatedEnv.DB_SSL === 'true',
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  extra: {
    max: validatedEnv.DB_POOL_MAX,
    min: validatedEnv.DB_POOL_MIN,
    connectionTimeoutMillis: validatedEnv.DB_POOL_CONN_TIMEOUT,
    idleTimeoutMillis: validatedEnv.DB_POOL_IDLE_TIMEOUT,
  },
};

const connection = new DataSource(dataSourceOptions);

export const databaseProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    return connection.initialize();
  },
};

export default connection;
