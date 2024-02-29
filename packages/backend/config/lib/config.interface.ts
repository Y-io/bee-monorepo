import { z } from 'zod';

export enum EnvEnum {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
}

//
// interface IDatabaseConfig {
//   username: string;
//   password: string;
//   port: number;
//   database: string;
// }
//
// interface IRedisConfig {
//   host: string;
//   port: number;
// }
//
// interface IAuthConfig {
//   readonly accessTokenExpiresIn: number;
//   readonly refreshTokenExpiresIn: number;
//   readonly leeway: number;
//   readonly publicKey: string;
//   readonly privateKey: string;
// }
//
// export interface IConfig {
//   server_id: string;
//   db:
//     | IDatabaseConfig
//     | {
//         url: string;
//       };
//   redis:
//     | IRedisConfig
//     | {
//         url: string;
//       };
//   bee_env: EnvEnum;
//   auth: IAuthConfig;
// }

export const dbSchema = z.object({
  user: z.string(),
  password: z.string(),
  database: z.string(),
  port: z.number(),
  host: z.string(),
});

export const redisSchema = z.object({
  host: z.string(),
  port: z.number(),
});

export const authSchema = z.object({
  accessTokenExpiresIn: z.number(),
  refreshTokenExpiresIn: z.number(),
  leeway: z.number(),
  publicKey: z.string(),
  privateKey: z.string(),
});

export const configSchema = z.object({
  port: z
    .number()
    .default(3000)
    .transform((v) => Number(v)),
  server_id: z.string(),
  db: dbSchema,
  redis: redisSchema,
  bee_env: z.nativeEnum(EnvEnum),
  auth: authSchema,
});

export type ConfigType = z.infer<typeof configSchema>;
