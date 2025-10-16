import axios from "axios";
import { REST_SERVER_URL } from "../constants";
import { AuthorBook, AuthorBookJSON, AuthorJSON,AuthorJson, AutorEditJSON, CreateAuthorJSON} from "../domain/AuthorJSON";

class AuthorService {
    async getAuthorData(): Promise<AuthorJSON[]> {
        const data = await axios.get(REST_SERVER_URL + "/allAuthors");
        return data.data.map((item: AuthorJSON) => AuthorJson.fromJson(item));
    }

    async getAuthor(id: number): Promise<AuthorJSON> {
        const data = await axios.get(REST_SERVER_URL + "/getAutor/" + id);
        return AuthorJson.fromJson(data.data);
    }

    async getIdiomas(): Promise<string[]> {
        const response = await axios.get(REST_SERVER_URL + "/lenguajes");
        return response.data[0].lenguajes; 
    }

    async deleteAuthor(author : number): Promise<void> {
        await axios.delete(REST_SERVER_URL + "/deleteAutor/" + author);
    }

    async editAuthor(author: AutorEditJSON): Promise<void> {
        await axios.put(REST_SERVER_URL + "/editAuthor" , author);
    }

    async createAuthor(author: CreateAuthorJSON): Promise<void> {
        await axios.post(REST_SERVER_URL + "/createAuthor", author);
    }

    async getAuthorDataForBooks(): Promise<AuthorBook[]> {
        const data = await axios.get(REST_SERVER_URL + "/allAuthorsForBooks");
        return data.data.map((item: AuthorBookJSON) => AuthorBookJSON.fromJson(item));
        
    }
    async findAuthor(filter: string): Promise<AuthorJSON[]> {
        const response = await axios.get(`${REST_SERVER_URL}/findAuthor`, { params: { filter } });
        const autors = response.data; 
        console.log(autors);
        return autors.map((item: any) => AuthorJson.fromJson(item));
    }

}

export const authorService = new AuthorService();