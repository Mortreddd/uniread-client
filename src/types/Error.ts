export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  errors?: Record<string, string>[];
  fieldErrors?: Record<string, string>[];
  globalErrors?: Record<string, string>[];
}
