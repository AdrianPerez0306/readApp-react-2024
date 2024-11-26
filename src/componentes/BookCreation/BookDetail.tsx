import { Alert, Box, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { BookListDetail } from "../../domain/BookJSON";
import { bookService } from "../../service/bookService";
import { useNavigate, useParams } from "react-router-dom";
import { authorService } from "../../service/authorService";
import { AuthorBook } from "../../domain/AuthorJSON";
import { LanguageCheckbox } from '../BookCreation/LanguageCheckbok/LanguageCheckbox';
import { SaveCancelButton } from "../FolderButtons/SaveCancelButton/SaveCancel";
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import { paths } from "../../domain/routes";

export const BookDetail = ({editable}: {editable: boolean}) => {

    const [book, setBook] = useState<BookListDetail>(new BookListDetail());
    const [author, setAuthor] = useState<AuthorBook>(new AuthorBook());
    const [authorsSystemList, setAuthorsSystemList] = useState<AuthorBook[]>([]);
    const [bestseller, setBestseller] = useState<Boolean>(book.bestSeller);
    const [challenging, setChallenging] = useState<Boolean>(book.challenging);

    const [errors, setErrors] = useState({
        title: { error: false, helperText: "" },
        numberOfEditions: { error: false, helperText: "" },
        numberOfPages: { error: false, helperText: "" },
        numberOfWords: { error: false, helperText: "" },
        weeklySales: { error: false, helperText: "" }
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const params = useParams();
    const navigate = useNavigate();

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const validateField = (fieldName: string, value: string | number) => {
        let error = false;
        let helperText = "";
    
        if (fieldName === "title" && typeof value === "string") {
            if (!value.trim()) {
                error = true;
                helperText = "Title cannot be empty.";
            }
        } else if (["numberOfEditions", "numberOfPages", "numberOfWords", "weeklySales"].includes(fieldName)) {
            if (!value || isNaN(Number(value))) {
                error = true;
                helperText = `This field must be a valid number.`;
            }
        }
    
        return { error, helperText };
    };

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
    
        const { error, helperText } = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: { error, helperText }
        }));
    
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
        const hasErrors = Object.values(errors).some(field => field.error);

        if (hasErrors) {
            console.log("Corrige los errores antes de guardar");
            return;
        }

        try {
            const bookJson = book.toJson(book, author);
            await bookService.editBook(bookJson);
            setSnackbarSeverity("success");
            setSnackbarMessage("Book edited successfully!");
            setOpenSnackbar(true);
            setTimeout(() => navigate(`${paths.list.book.path}`), 1000);
        } catch (error) {
            console.error("Error editing the book:", error);
            setSnackbarSeverity("error");
            setSnackbarMessage("Error editing the book.");
            setOpenSnackbar(true);
        }
    };

    const confirmCreate = async () => {
        const updatedErrors = {
            title: validateField("title", book.title || ""),
            numberOfEditions: validateField("numberOfEditions", book.numberOfEditions || ""),
            numberOfPages: validateField("numberOfPages", book.numberOfPages || ""),
            numberOfWords: validateField("numberOfWords", book.numberOfWords || ""),
            weeklySales: validateField("weeklySales", book.weeklySales || "")
        };
        setErrors(updatedErrors);
    
        const hasErrors = Object.values(updatedErrors).some((field) => field.error);
        if (hasErrors) {
            console.error("Please correct the errors before saving.");
            return;
        }
    
        try {
            const bookCreateJson = book.toCreateJson(book, author); 
            await bookService.createBook(bookCreateJson);   
            setSnackbarSeverity("success");
            setSnackbarMessage("Book created successfully!");
            setOpenSnackbar(true);
            setTimeout(() => navigate(`${paths.list.book.path}`), 1000);
        } catch (error) {
            console.error("Error creating the book:", error);
            setSnackbarSeverity("error");
            setSnackbarMessage("Error creating the book.");
            setOpenSnackbar(true);
        }
    };
    

    useEffect(() => {
        setBestseller(book.weeklySales >= 10000 && ( book.numberOfEditions > 2 || book.translations.length > 5));
        setChallenging(book.numberOfPages > 600 || book.complex);
    }, [book.weeklySales, book.numberOfEditions, book.translations, book.numberOfPages, book.complex]);
    

    useEffect(() => {
        getAuthors();
        if (params.id) getBook();}, [params.id]);

    return (
        <>
            {(
                <>
                <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
                <Box display="flex" flexDirection="column" justifyContent="space-between"
                    alignItems="center" gap={3} sx={{ width: 500, maxWidth: '100%' }} padding={5}>
                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Box>
                        <h4>Book</h4>
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
                            <WhatshotOutlinedIcon sx={{ height: "100%", width: "100%", color: "blue" }}></WhatshotOutlinedIcon>
                            </IconButton>
                        )}
                        </Box>
                    </Box>
                    <TextField fullWidth
                        label="Title"
                        onChange={editBook}
                        name="title"
                        disabled={!editable}
                        value={book.title || ''}
                        error={errors.title.error}
                        helperText={errors.title.error ? errors.title.helperText : ''} />
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
                        value={book.numberOfEditions || ''}
                        error={errors.numberOfEditions.error}
                        helperText={errors.numberOfEditions.helperText} />
                    <Box display="flex" flexDirection="row" gap={3} sx={{ width: "100%" }}>
                        <TextField
                            label="Number of pages"
                            variant="outlined"
                            onChange={editBook}
                            name="numberOfPages"
                            disabled={!editable}
                            value={book.numberOfPages || ''}
                            error={errors.numberOfPages.error}
                            helperText={errors.numberOfPages.helperText}
                            sx={{ width: '20rem' }} />
                        <TextField
                            label="Number of words"
                            variant="outlined"
                            onChange={editBook}
                            name="numberOfWords"
                            disabled={!editable}
                            value={book.numberOfWords || ''}
                            error={errors.numberOfWords.error}
                            helperText={errors.numberOfWords.helperText}
                            sx={{ width: '20rem' }} />
                    </Box>
                    <TextField fullWidth
                        label="Weekly sales"
                        variant="outlined"
                        onChange={editBook}
                        name="weeklySales"
                        disabled={!editable}
                        value={book.weeklySales || ''}
                        error={errors.weeklySales.error}
                        helperText={errors.weeklySales.helperText} />
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
