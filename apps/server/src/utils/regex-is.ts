export const regexMap = {
  username: /^[\w-]{4,16}$/,
} as const;

export class RegexIs {
  static isUsername(v: string) {
    return regexMap['username'].test(v);
  }
}
