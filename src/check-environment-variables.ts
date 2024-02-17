export function checkEnvironmentVariables(): void {
  if (!process.env.WEBHOOK_ID || !process.env.WEBHOOK_TOKEN) {
    throw new Error(
      'WEBHOOK_ID and WEBHOOK_TOKEN environment variables must be set'
    );
  }
}
