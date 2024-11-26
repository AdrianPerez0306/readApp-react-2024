import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorService } from '../../service/authorService';
import { AuthorJSON } from '../../domain/AuthorJSON';
import { mostrarMensajeError } from '../../error-handling';
import Author from './AuthorCard/Author';
import { Alert, Box, Snackbar } from '@mui/material';
import { Create } from '../FolderButtons/CreateButton/Create';
import { Book } from '../../domain/BookJSON';
import { bookService } from '../../service/bookService';
import { BookComponent } from './BookCard/Book';
import { Search } from './Search/Search';

export const List = ({ selectedOption }: { selectedOption: string }) => {
    
    const [isBook, setIsBook] = useState<boolean >(selectedOption === 'book'); /* seteo el booleano base */
    const [authors, setAuthors] = useState<AuthorJSON[]>([]);
    const [books, setBooks] = useState<Array<Book>>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const navigate = useNavigate();

    const createAuthor = () => {
        navigate(`/${selectedOption}/create`);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const fetchData = async () => {
        try {
            if (isBook) {
                const books = await bookService.getBooksShortData();
                setBooks(books);
            } else {
                const autorData = await authorService.getAuthorData();
                setAuthors(autorData);
            }
        } catch (error: any) {
            setSnackbarSeverity('error');
            mostrarMensajeError(error, setSnackbarMessage);
            setOpenSnackbar(true);
        }
    };

    const deleteObject = async (id: number) => {
        try {
            if (isBook) {
                await bookService.deleteBook(id);
                setBooks((prevBooks) => prevBooks.filter((book: Book) => book.id !== id));
            } else {
                await authorService.deleteAuthor(id);
                setAuthors((prevAuthors) => prevAuthors.filter((author: AuthorJSON) => author.id !== id));
            };
            setSnackbarSeverity('success');
            setSnackbarMessage(`${selectedOption} deleted successfully.`);
            setOpenSnackbar(true)
        } catch (error: any) {
            setSnackbarSeverity('error');
            mostrarMensajeError(error, setSnackbarMessage);
            setOpenSnackbar(true);
        }
    };

    const filterObject = (objects: any) => {
        if (isBook) {
            setBooks(objects)
        } else {
            setAuthors(objects)
        }
        console.log(objects)
    }

    const updateStateAndFetch = async () => {
        const variable = selectedOption === 'book';
        setIsBook(variable);
        await fetchData();
    };
    
    useEffect( () => {
        updateStateAndFetch();

    }, [selectedOption,isBook]);

    return (
        <>
            <Box position="sticky" top={0} zIndex={2} >
                <Search Book={isBook} filter={filterObject} />
            </Box>
            <Box display="flex" flexDirection="column" position="relative" height="auto" data-testid="authors-container" marginTop="2rem">
                {!isBook ? (
                    authors.map((autor) => (
                        <Author
                            key={autor.id} 
                            renderAuthor={autor}
                            onDelete={deleteObject}
                        />
                    ))
                ) : (
                    books.map((book) => (
                        <BookComponent
                            key={book.id} 
                            book={book}
                            onDelete={deleteObject}
                        />
                    ))
                )}
                <Box sx={{ position: "fixed", bottom: "13rem", right: "1rem", zIndex: 1000 }} data-testid="create-author-button">
                    <Create onClick={createAuthor} data-testid="create" />
                </Box>
            </Box>

            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled" data-testid="snackbar-message">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};
