import { UserDto } from "./UserDto";

export interface LoginResult {
    isAuthenticated: boolean;
    message: string;
    email:string;
    customer:UserDto;
    roles: string[];
    token: string
}
