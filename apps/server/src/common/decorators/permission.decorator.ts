export const PERMISSION_DEF = '__permission_def__';

export type PermissionAction = 'create' | 'delete' | 'update' | 'find';

export enum PermissionType {
  Manage = 'manage',
  Client = 'client',
  Web = 'web',
  App = 'app',
  Public = 'public',
}

type PermissionIdentify = `${string}:${PermissionAction}:${string}`;

export function Permission(options: {
  name: string;
  identify: PermissionIdentify;
}) {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(PERMISSION_DEF, options, target, propertyKey);
  };
}
