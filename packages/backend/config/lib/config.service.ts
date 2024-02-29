import { configSchema, ConfigType, EnvEnum } from './config.interface';
import { Injectable } from '@nestjs/common';
import parse from 'parse-duration';
import { createJwtKeyPair } from './create-jwt-key-pair';

@Injectable()
export class BeeConfigService {
  private config: ConfigType;

  constructor(config?: ConfigType) {
    if (config && configSchema.partial().safeParse(config).success) {
      this.config = config;
    }

    this.loadEnv();
  }

  public get auth() {
    return this.config.auth;
  }

  public get db() {
    return this.config.db;
  }

  public get bee_env() {
    return this.config.bee_env;
  }

  public get server_id() {
    return this.config.server_id;
  }

  public get port() {
    return this.config.port;
  }

  public get redis() {
    return this.config.redis;
  }

  private loadEnv() {
    const { jwtPublicKey: JWT_PUBLIC_KEY, jwtPrivateKey: JWT_PRIVATE_KEY } =
      createJwtKeyPair(examplePrivateKey);

    const config = configSchema.parse({
      port: Number(process.env.PORT),
      server_id: this.config?.server_id ?? process.env.SERVER_ID,
      bee_env: this.config?.bee_env ?? (process.env.BEE_ENV as EnvEnum),
      db: {
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        port: Number(process.env.POSTGRES_PORT),
        database: process.env.POSTGRES_DATABASE,
        host: process.env.POSTGRES_HOST,
        ...this.config?.db,
      },
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        ...this.config?.redis,
      },
      auth: {
        accessTokenExpiresIn: tokenExpiresIn(
          process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
        ),
        refreshTokenExpiresIn: tokenExpiresIn(
          process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
        ),
        leeway: Number(process.env.JWT_LEEWAY),
        publicKey: process.env.JWT_PUBLIC_KEY || JWT_PUBLIC_KEY,
        privateKey: process.env.JWT_PRIVATE_KEY || JWT_PRIVATE_KEY,
        ...this.config?.auth,
      },
    });
    this.config = config;
  }
}

const tokenExpiresIn = (v: string) => parse(v) / 1000;
const examplePrivateKey =
  '-----BEGIN PRIVATE KEY-----\n' +
  'MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgSpFUI82zmYL8YX/z\n' +
  'fFYUJL/ZhkuRqywr9eeef4woqcahRANCAAS37SF+5FqNTd/aCXC+jPe6aZckfoq6\n' +
  'T7Gn+ibiNyXD9lHGlEgUZGLQmQmnqvQRNzBk9J/ekA1jIJbufg3Eo8LR\n' +
  '-----END PRIVATE KEY-----';
