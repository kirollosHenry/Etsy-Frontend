export interface LoginResult {
    isAuthenticated: boolean;
    message: string;
    email:string;
    roles: string[];
    token: string
}
