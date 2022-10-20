import { Generic } from '../../../helpers/interfaces/interfaces';
import { Usuario } from '../../../auth/models/interfaces';

export interface RESTColegios   {
    ok:       boolean;
    total:    number;
    colegios: Colegio[];
    desde:    number;
}

export interface Colegio extends Generic{
    
    estado:     string;
    _id:        string;
    nombre:     string;
    img:        string;
    usuario:    Usuario;
    __v:        number;
    cloud?:     string;
    clouds?:    string;
    email?:     string;
    localidad?: string;
    direccion?: string;
}

