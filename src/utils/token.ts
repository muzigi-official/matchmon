interface TokenPayload {
  exp: number;
}

function base64UrlDecode(base64Url: string) {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join(''),
  );
  return JSON.parse(jsonPayload);
}

export function isTokenExpired(token: string): boolean {
  try {
    const base64Url = token.split('.')[1];
    const decoded: TokenPayload = base64UrlDecode(base64Url);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return true;
  }
}
