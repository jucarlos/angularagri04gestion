import { Generic } from '../../../helpers/interfaces/interfaces';

export interface RESTClientes {
    ok:       boolean;
    total:    number;
    clientes: Cliente[];
}

export interface Cliente extends Generic{
    _id:           string;
    identificador: string;
    nombre:        string;
    email:         string;
    clouds:       string;
}
