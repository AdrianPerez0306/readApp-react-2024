import { Box, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { BookListDetail } from "../../domain/BookJSON";
import { bookService } from "../../service/bookService";
import { useParams } from "react-router-dom";
import { authorService } from "../../service/authorService";
import { AuthorBook } from "../../domain/AuthorJSON";
import { LanguageCheckbox } from '../BookCreation/LanguageCheckbok/LanguageCheckbox';
import { SaveCancelButton } from "../FolderButtons/SaveCancelButton/SaveCancel";
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';

export const BookDetail = ({editable}: {editable: boolean}) => {

    const [book, setBook] = useState<BookListDetail>(new BookListDetail());
    const [author, setAuthor] = useState<AuthorBook>(new AuthorBook());
    const [authorsSystemList, setAuthorsSystemList] = useState<AuthorBook[]>([]);
    const [bestseller, setBestseller] = useState<Boolean>(book.bestSeller);
    const [challenging, setChallenging] = useState<Boolean>(book.challenging);

    const params = useParams();

    const handleChangeSelect = (event: SelectChangeEvent) => {
        const authorId = Number(event.target.value);
        const localAuthor = authorsSystemList.find((author: AuthorBook) => author.id === authorId);
        
        if (localAuthor) {
            setAuthor(localAuthor); 
        }

        editBook(event);
    };

    const getBook = async () => {
        const id = Number(params.id);
        const [fetchedBook, fetchedAuthor] = await bookService.getBook(id);
        setBook(fetchedBook);
        setBestseller(fetchedBook.bestSeller);
        setChallenging(fetchedBook.challenging);
        setAuthor(fetchedAuthor);
    };

    const getAuthors = async () => {
        const fetchedAuthors = await authorService.getAuthorDataForBooks();
        setAuthorsSystemList(fetchedAuthors);
    };

    const editBook = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        const updatedBook = { ...book, [name]: value };
        setBook(Object.assign(new BookListDetail(), updatedBook));
    };
    
    const editBookCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        const updatedBook = { ...book, [name]: checked };
        setBook(Object.assign(new BookListDetail(), updatedBook));
    };
    

    const handleLanguageChange = (selectedLanguages: string[]) => {
            const updatedBook = { ...book, translations: selectedLanguages };
            setBook(Object.assign(new BookListDetail(), updatedBook));        
    };

    const confirmEdition = async () => {
        try {
            const bookJson = book.toJson(book, author); // Convertimos a JSON
            await bookService.editBook(bookJson);       // Llama a bookService con el JSON generado
            console.log("Libro guardado correctamente.");
        } catch (error) {
            console.error("Error al guardar el libro:", error);
        }
    };

    const confirmCreate = async () => {
        try {
            const bookCreateJson = book.toCreateJson(book, author); 
            await bookService.createBook(bookCreateJson);   
            console.log("Libro creado correctamente.");
        } catch (error) {
            console.error("Error al crear el libro:", error);
        }
    };

    useEffect(() => {
        setBestseller(
            book.weeklySales > 10000 &&
            book.numberOfEditions > 2 &&
            book.translations.length > 5
        );
    
        setChallenging(
            book.numberOfPages > 600 &&
            book.complex
        );
    }, [book.weeklySales, book.numberOfEditions, book.translations, book.numberOfPages, book.complex]);
    

    useEffect(() => {
        getAuthors();
        if (params.id) getBook();
        //if (editable) getAuthors();
    }, [params.id]);

    return (
        <>
            {(
                <>
                
                <Box display="flex" flexDirection="column" justifyContent="space-between"
                    alignItems="center" gap={3} sx={{ width: 500, maxWidth: '100%' }} padding={5}>
                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Box>
                        <h4>Libros</h4>
                        </Box>
                        <Box display="flex" flexDirection="row">
                        {bestseller && (
                            <IconButton
                            sx={{ height: "4rem" }}>
                            <CardMembershipRoundedIcon sx={{ height: "100%", width: "100%", color: "purple" }}></CardMembershipRoundedIcon>
                        </IconButton>
                        )}
                        
                        {challenging && (
                             <IconButton
                            sx={{ height: "4rem" }}>
                            <WhatshotOutlinedIcon sx={{ height: "100%", width: "100%", color: "yellow" }}></WhatshotOutlinedIcon>
                            </IconButton>
                        )}
                        </Box>
                    </Box>
                    <TextField fullWidth
                        label="Title"
                        onChange={editBook}
                        name="title"
                        disabled={!editable}
                        value={book.title || ''} />
                    <FormControl fullWidth>
                        <InputLabel id="author-select-label">Author</InputLabel>
                        <Select
                            labelId="author-select-label"
                            id="nationality-select"
                            name="author"
                            disabled={!editable}
                            value={author.id.toString()}
                            onChange={handleChangeSelect}
                        >
                            {authorsSystemList.map(author => (
                                <MenuItem key={author.id} value={author.id.toString()}>
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
                        value={book.numberOfEditions || ''} />
                    <Box display="flex" flexDirection="row" gap={3} sx={{ width: "100%" }}>
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
                        value={book.weeklySales || ''} />
                    <FormControlLabel
                        control={<Checkbox
                            checked={book.complex}
                            onChange={editBookCheckbox}
                            name="complex"
                            disabled={!editable} />}
                        label="complex to read" />

                    <TextField
                        label="Native language"
                        name="nativeLanguage"
                        disabled
                        value={author.nacionalidad}
                        sx={{ width: '20rem' }} />
                    <LanguageCheckbox
                        fullLanguageList={book.translations}
                        nativeLanguage={author.nacionalidad}
                        onChange={handleLanguageChange}
                        editable={editable} />
                </Box>
                <SaveCancelButton onClick={(params.id) ? confirmEdition : confirmCreate} 
                isBook={true} editable={editable}></SaveCancelButton></>
            )}
        </>
    );
};
