export class LoginUser {
    constructor(
        public usuario: string,
        public clave: string,
        public idpersona?: string
    ) {}
}
