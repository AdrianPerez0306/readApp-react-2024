import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { BookListDetail } from "../../domain/BookJSON";
import { bookService } from "../../service/bookService";
import { useParams } from "react-router-dom";
import { authorService } from "../../service/authorService";
import { AuthorBook } from "../../domain/AuthorJSON";
import { LanguageCheckbox } from '../BookCreation/LanguageCheckbok/LanguageCheckbox';

export const BookDetail = ({
    editable,
}: {
    editable: boolean;
}) => {

    const [book, setBook] = useState<BookListDetail>(new BookListDetail());
    const [author, setAuthor] = useState<AuthorBook>(new AuthorBook());
    const [authorsSystemList, setAuthorsSystemList] = useState<AuthorBook[]>([]);
    const [nativeLanguage, setNativeLanguage] = useState<string>(author.nacionalidad);
    const [languages, setLanguages] = useState<string[]>([]);
    const params = useParams();

    const [checkedComplex, setCheckedComplex] = useState<boolean>(book.complex);
    
    const [selectedAuthor, setSelectedAuthor] = useState<string>('');

    const handleChangeSelect = (event: SelectChangeEvent) => {
        const authorId = Number(event.target.value);
        const localAuthor = authorsSystemList.find((author: AuthorBook) => author.id === authorId);
        
        if (localAuthor) {
            setNativeLanguage(localAuthor.nacionalidad);
            setSelectedAuthor(localAuthor.id.toString());
        }

        editBook(event);
    };

    const handleChangeCheckComplex = (event: ChangeEvent<HTMLInputElement>) => {
        setCheckedComplex(event.target.checked);
        editBook(event);
    };

    const getLanguages = async () => {
        const languages = await authorService.getIdiomas();
        setLanguages(languages);
        console.log(languages);
    };

    const getBook = async () => {
        const id = Number(params.id);
        const [fetchedBook, fetchedAuthor] = await bookService.getBook(id);

        setBook(fetchedBook);
        setAuthor(fetchedAuthor);
    };

    const getAuthors = async () => {
        const fetchedAuthors = await authorService.getAuthorDataForBooks();
        setAuthorsSystemList(fetchedAuthors);
    };

    const editBook = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
      ) => {
        const { name, type } = event.target;
        const value = type === "checkbox" ? (event.target as HTMLInputElement).checked : event.target.value;
      
        const updatedBook = { ...book, [name]: value };
        setBook(Object.assign(new BookListDetail(), updatedBook));
      };

    useEffect(() => {
        getLanguages();
        if (params.id) getBook();
        if (editable) getAuthors();
    }, [params.id]);

    return (
        <>
            {(
                <Box display="flex" flexDirection="column" justifyContent="space-between"
                    alignItems="center" gap={3} sx={{ width: 500, maxWidth: '100%' }} padding={5}>
                    <TextField fullWidth
                        label="Title"
                        onChange={editBook}
                        name="title"
                        disabled={!editable}
                        value={book.title || ''}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="author-select-label">Author</InputLabel>
                        <p>{author.nombre} {author.apellido}</p>
                        <Select
                            labelId="author-select-label"
                            id="nationality-select"
                            name="author"
                            disabled={!editable}
                            value={selectedAuthor}
                            onChange={handleChangeSelect}
                        >
                            {authorsSystemList.map((author) => (
                                <MenuItem
                                    key={author.id}  // Cambia el valor de key a author.id
                                    value={author.id.toString()}
                                >
                                    {author.nombre + " " + author.apellido}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField fullWidth
                        label="Editions"
                        variant="outlined"
                        onChange={editBook}
                        name="numberOfEditions"
                        disabled={!editable}
                        value={book.numberOfEditions || ''}
                    />
                    <Box display="flex" flexDirection="row" gap={3} sx={{ width: "100%" }} >
                        <TextField
                            label="Number of pages"
                            variant="outlined"
                            onChange={editBook}
                            name="numberOfPages"
                            disabled={!editable}
                            value={book.numberOfPages || ''}
                            sx={{ width: '20rem' }} />
                        <TextField
                            label="Number of words"
                            variant="outlined"
                            onChange={editBook}
                            name="numberOfWords"
                            disabled={!editable}
                            value={book.numberOfWords || ''}
                            sx={{ width: '20rem' }} />
                    </Box>
                    <TextField fullWidth
                        label="Weekly sales"
                        variant="outlined"
                        onChange={editBook}
                        name="weeklySales"
                        disabled={!editable}
                        value={book.weeklySales || ''}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checkedComplex}
                                onChange={handleChangeCheckComplex}
                                name="complex"
                                disabled={!editable}
                            />
                        }
                        label="complex to read"
                    />
                    
                    <TextField
                        label="Native language"
                        name="nativeLanguage"
                        disabled
                        value={author.nacionalidad}
                        sx={{ width: '20rem' }} />
                    <LanguageCheckbox 
                        fullLanguageList={book.translations} 
                        nativeLanguage={author.nacionalidad}
                    />
                </Box>
            )}
        </>
    );
};
