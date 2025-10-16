import { Box, Button, OutlinedInput } from "@mui/material"
import ManageSearchSharpIcon from '@mui/icons-material/ManageSearchSharp';
import { useEffect, useState } from "react";
import { bookService } from "../../../service/bookService";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import { Book } from "../../../domain/BookJSON";
import { authorService } from "../../../service/authorService";
import { useNavigate } from "react-router-dom";

export const Search = ({Book, filter}:{Book : boolean | null, filter :(items: AuthorJSON[] | Book[]) => void}) => {
    const [isBook, setIsBook] = useState<boolean | null>(Book);
    const [text, setText] = useState<string>("");
    const [authors, setAuthors] = useState<AuthorJSON[]>([]);
    const [books, setBooks] = useState<Book[]>([]);

    const textSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setText(text);
    }

    const searchObject = async () => {
        console.log(text);
        if (isBook) {
            const filterbooks = await bookService.findBook(text);
            setBooks(filterbooks);
            filter(filterbooks);
        } else {
            const filterauthors = await authorService.findAuthor(text);
            setAuthors(filterauthors);
            filter(filterauthors);
        }
    }
    

    useEffect(() => {
        setIsBook(Book);
        // setText("");
    }, [Book,useNavigate]);

    return (
        <Box width="100vw" height="5rem" display="flex" flexDirection="row">
            <OutlinedInput 
                placeholder="Search"
                onChange={textSearch}
                sx={{ 
                    width: "85%", 
                    height: "100%",
                    border: "1px solid grey",
                    borderRadius: "0px", 
                    backgroundColor: "white",
                }}
                slotProps={{ input: { style: { fontSize: '1.8rem' } } }}
                />
            <Button onClick = {searchObject} 
            sx={{
                width: "15%", 
                height: "100%",
                border: "1px solid grey", 
                borderRadius: "0px",
                backgroundColor: "white",
            }}>
                <ManageSearchSharpIcon sx={{ color: "black", width: "100%", height: "100%", backgroundColor: "secondary" }} />
            </Button>
        </Box>
    )
}