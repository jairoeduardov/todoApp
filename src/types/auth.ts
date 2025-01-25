export interface User {
    uuid: string;
    username: string;
    email: string;
    name: string; 
    firstName: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    user: GoogleUser | null;
    login: (token: string, user: GoogleUser) => void;
    logout: () => void;
}


export interface GoogleUser {   
    sub: string; // ID único del usuario
    name: string; // Nombre completo
    username:string;
    given_name: string; // Primer nombre
    family_name: string; // Apellido
    email: string; // Correo electrónico
    picture: string;
  }