export interface User {
    uuid: string;
    username: string;
    email: string;
    name: string; 
    firstName: string;
}

export interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}


export interface GoogleUser {
    email: string;
    name: string;
    picture: string;
    sub: string; // ID único de Google
  }