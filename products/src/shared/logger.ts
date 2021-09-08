export class Logger {
  static logEvent(event: unknown) {
    console.info("EVENT\n" + JSON.stringify(event, null, 2))
  }
}