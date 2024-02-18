export function checkEnvironmentVariables(): void {
  if (process.env.PORT) checkPort();
}

function checkPort(): void {
  if (isNaN(Number(process.env.PORT))) {
    throw new Error('PORT environment variable must be a number');
  }
}
