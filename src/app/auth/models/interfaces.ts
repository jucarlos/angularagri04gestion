export interface RESTUser {
    ok:      boolean;
    usuario?: Usuario;
    token?:   string;
    menu?:    Menu[];
    err?: Err;

}

export interface Err {
    message: string;
}


export interface Menu {
    id:     number;
    titulo: string;
    url:    string;
}

export interface Usuario {
    role?:   string;
    estado?: boolean;
    nombre: string;
    email:  string;

}
