import axios from "axios";
import { REST_SERVER_URL } from "../constants";
import { AuthorBook } from "../domain/AuthorJSON";
import { Book, bookJson, BookJSON, BookListDetail, BookList, BookListDetailJSON, BookCreateJSON } from "../domain/BookJSON";

class BookService {
    async getBooksShortData(): Promise<Book[]> {
        const books = await axios.get(REST_SERVER_URL + "/getBooksReact");
        // console.log(books)
        const books2 = books.data.map((item: BookJSON) => Book.prototype.fromJson(item))
        // console.log(books2)
        return books.data.map((item: BookJSON) => Book.prototype.fromJson(item));
    }

    async getBook(id: number): Promise<[BookListDetail, AuthorBook]> {
        const data = await axios.get(REST_SERVER_URL + "/getBookReact/" + id);
        return BookList.fromJson(data.data);
    }

    async deleteBook(id: number): Promise<void> {
        await axios.delete(REST_SERVER_URL + "/deleteBook/" + id);
    }

    async findBook(text: string): Promise<Book[]> {
        const response = await axios.get(`${REST_SERVER_URL}/bookSearch/filter`, {
            params: { filter: text }
        });

        console.log(response.data);
        return response.data.map((item: any) => bookJson.fromJson(item));
    }

    async editBook(bookJson: BookListDetailJSON): Promise<void> {
        await axios.put(`${REST_SERVER_URL}/editBook/${bookJson.id}`, bookJson);
    }    

    async createBook(bookJson: BookCreateJSON): Promise<void> {
        await axios.post(`${REST_SERVER_URL}/createBook`, bookJson);
    }   
    
}

export const bookService = new BookService();