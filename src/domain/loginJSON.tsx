export type LoginRequest = {
    username: string
    password: string
}
export type CreateAccountRequest = {
    email   : string
    username: string
    password: string
    name    : string
}
export type LoginResponse = {
    userID : number
}

export class User {
    constructor(
        private email   : string = "",
        private username: string,
        private password: string,
        private name   : string = ""
    ){}
    
    buildLoginRequest(): LoginRequest {
        return {
            username: this.username,
            password: this.password
        }
    }

    buildCreateAccountRequest(): CreateAccountRequest {
        return {
            email   : this.email,
            username: this.username,
            password: this.password,
            name    : this.name
        }
    }
}
