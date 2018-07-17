export class ClientUser {
    constructor(
        public idpersona: number | string,
        public tipo?: string,
        public nombre?: string,
        public nrodoc?: string,
        public domlegal?: string,
        public roles?: string
    ) {}
}
