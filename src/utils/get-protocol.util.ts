export function getProtocol(): string {
  return shouldUseHttps() ? 'https' : 'http';
}

export function shouldUseHttps(): boolean {
  return process.env.SHOULD_USE_HTTPS === 'true';
}
