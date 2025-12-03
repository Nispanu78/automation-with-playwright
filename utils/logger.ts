// File: utils/logger.ts
export class Logger {
  private static getTimestamp(): string {
    return new Date().toISOString();
  }

  static info(message: string, data?: any) {
    console.log(`[${this.getTimestamp()}] [INFO] ${message}`, data || '');
  }

  static error(message: string, error?: any) {
    console.error(`[${this.getTimestamp()}] [ERROR] ${message}`, error || '');
  }

  static debug(message: string, data?: any) {
    console.debug(`[${this.getTimestamp()}] [DEBUG] ${message}`, data || '');
  }

  static step(message: string) {
    console.log(`\n[${this.getTimestamp()}] [STEP] ▶ ${message}\n`);
  }

  static success(message: string) {
    console.log(`[${this.getTimestamp()}] [SUCCESS] ✓ ${message}`);
  }
}