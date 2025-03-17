export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginResponse {
  iss: string;
  exp: number;
  iat: number;
  accessToken: string;
}

export interface InvalidAccessToken {
  message: string;
  details: string;
}

export interface LoginErrorResponse {
  date: string;
  code: number;
  message: string;
  description: string;
}
