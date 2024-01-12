export interface UserI {
  email: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface AuthLoginDto {
  email: string;
  password: string;
}
