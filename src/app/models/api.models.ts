// ----------------------
// Common Responses
// ----------------------
export interface MessageResponse {
    message: string;
  }
  
  export interface ErrorResponse {
    statusCode: number;
    message: string;
    details?: string;
  }
  
  export interface Pagination {
    page: number;
    limit: number;
    total: number;
  }
  
  // ----------------------
  // Auth Models
  // ----------------------
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export type UserRole = 'admin' | 'user'; // using union type for roles
  
  export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }
  