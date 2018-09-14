import { SystemLegalDoc } from './SystemLegal.class';
import { SystemGiros } from './SystemGiros.class';
export class SystemCustomer {
    constructor(
        public idpersona: string | number,
        public tipoper: string,
        public nrodocc: string,
        public tipo?: string,
        public nombrecompleto?: string,
        public domlegal?: string,
        public roles?: string,
        public ape_pat?: string,
        public ape_mat?: string,
        public nombre?: string,
        public tipodocid?: SystemLegalDoc,
        public nrodoc?: string | number,
        public telefono?: string | number,
        public sexo?: string,
        public estadocivil?: string,
        public usuario?: string,
        public clave?: string,
        public email?: string,
        public nacimiento?: string,
        public idgiro?: SystemGiros,
        public direccion?: string,
        public contacto?: string,
        public observacion?: string,
        public razonsocial?: string
    ) {}
}
