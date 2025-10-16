
export class AuthorJSON {
    public id: number;
    public name: string;
    public lastName: string;
    public nationality: string;
    public creator: boolean;
    // public lenguajes: string[];

    constructor() {
        this.id = 0;
        this.name = "";
        this.lastName = "";
        this.nationality = "";
        this.creator = true;
        // this.lenguajes = [];
    }

    fromJson(data: any): AuthorJSON {
        this.id = data.id;
        this.name = data.nombre;
        this.lastName = data.apellido;
        this.nationality = data.nacionalidad;
        this.creator = data.creadorLibros;
        // this.lenguajes = data.lenguaje;

        return Object.assign(new AuthorJSON(), {
            id: data.id,
            name: data.nombre,
            lastName: data.apellido,
            nationality: data.nacionalidad,
            creator: data.creadorLibros,
            // lenguajes : data.lenguaje
        });
    }
    toAuthor(data: AuthorJSON): AutorEditJSON {
        return Object.assign(new AutorEditJSON(data.id, data.name, data.lastName, data.nationality), {
            id: data.id,
            nombre: data.name,
            apellido: data.lastName,
            nacionalidad: data.nationality
        });
    }
    toCreateAuthor(data: AuthorJSON): CreateAuthorJSON {
        return new CreateAuthorJSON(data.name, data.lastName, data.nationality)
    }

}

export class AutorEditJSON {
    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public nacionalidad: string
    ) {
    }
}

export class CreateAuthorJSON {
    public nombre: string;
    public apellido: string;
    public nacionalidad: string;

    constructor(name: string = "", lastName: string = "", nationality: string = "") {
        this.nombre = name;
        this.apellido = lastName;
        this.nacionalidad = nationality;
    }

}


export const AuthorJson = new AuthorJSON()
export const CreateAuthorJson = new CreateAuthorJSON()

/////////////////////////////////////// implementacion para libros

export type AuthorBookJSON = {
    id: number;
    nombre: string;
    apellido: string;
    nacionalidad: string;
}

export class AuthorBook {

    constructor(        
        public id : number = 0,
        public nombre : string = "",
        public apellido : string = "",
        public nacionalidad: string = ""){}
        
    
fromJson(data: AuthorBookJSON): AuthorBook {
        return Object.assign(new AuthorBook(), data);
    }
}

export const AuthorBookJSON = new AuthorBook()