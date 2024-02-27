export enum CacheKeys {
  EmailLogin = 'email-login',
  EmailRegister = 'email-register',
  PhoneLogin = 'phone-login',
  PhoneRegister = 'phone-register',
  User = 'user',
  UserPermissions = 'user-permissions',
}

export class CacheUtil {
  static genCacheKey(action: CacheKeys, value: string) {
    return `${action}:${value}`;
  }

  static emailLogin(email: string) {
    return CacheUtil.genCacheKey(CacheKeys.EmailLogin, email);
  }

  static emailRegister(email: string) {
    return CacheUtil.genCacheKey(CacheKeys.EmailRegister, email);
  }

  static phoneLogin(email: string) {
    return CacheUtil.genCacheKey(CacheKeys.PhoneLogin, email);
  }

  static phoneRegister(email: string) {
    return CacheUtil.genCacheKey(CacheKeys.PhoneRegister, email);
  }

  static user(id: string) {
    return CacheUtil.genCacheKey(CacheKeys.User, id);
  }

  static userPermissions(id: string) {
    return CacheUtil.genCacheKey(CacheKeys.UserPermissions, id);
  }
}
