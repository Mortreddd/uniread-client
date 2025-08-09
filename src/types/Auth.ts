export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginResponse {
  iss: string;
  iat: number;
  accessToken: string;
  refreshToken: string;
}

export interface UserRegistration {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  password: string;
  confirmPassword: string;
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
