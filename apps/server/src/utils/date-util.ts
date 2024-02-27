import parse from 'parse-duration';

export class DateUtil {
  static getUtcTimestamp() {
    return Math.floor(new Date().getTime() / 1000);
  }

  static getExpiresIn(value: string) {
    return parse(value) / 1000;
  }
}
