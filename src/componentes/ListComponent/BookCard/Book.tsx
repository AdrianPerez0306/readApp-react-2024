import { Box, Card, CardContent, IconButton } from '@mui/material';
import { Book } from '../../../domain/BookJSON';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../domain/routes';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';

export const BookComponent = ({book,onDelete}: {book: Book;onDelete: (id: number) => void;}) => {

    const navigate = useNavigate();

    const editBook = (id: number) => {
        navigate(`${paths.books.edit.path}/${id}`)
    };

    const deleteBook = (id: number) => {
        onDelete(id);
    };

    const displayBook = (id: number) => {
        navigate(`${paths.books.display.path}/${id}`)
    };

    return (

        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1.5}
            width="100vw"
            height="auto"
            padding="1rem"
            margin="auto">

            <Card sx={{
                width: "100%",
                height: "100%",
                borderRadius: 2,
                borderColor: '#212121',
                backgroundColor: "#ff8a80",
            }}>
                <CardContent sx={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "rows",
                    alignItems: "center",
                    gap: "1rem"
                }}>

                    <Box sx={{
                        width: "10rem",
                        height: "20rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <img src={book.image} alt="FOTO" style={{ width: "100%", height: "100%", borderRadius: "1rem" }} />
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "15rem"
                    }}>

                        <Box>
                            <h4>{book.title}</h4>
                            <p>Por <strong>{book.author}</strong></p>
                        </Box>

                        <Box display="flex" flexDirection="column">
                            <Box display="flex" flexDirection="row" alignItems="center" gap="1rem">
                                <AutoStoriesOutlinedIcon
                                    sx={{ width: "3rem", height: "3rem" }}>
                                </AutoStoriesOutlinedIcon>
                                <strong><p>Paginas</p></strong>
                                <p>{book.numberOfPages}</p>
                            </Box>
                        </Box>

                        <Box display="flex" flexDirection="column">
                            <Box display="flex" flexDirection="row" alignItems="center" gap="1rem">
                                <AbcOutlinedIcon
                                    sx={{ width: "4rem", height: "4rem" }}>
                                </AbcOutlinedIcon>
                                <strong><p>Palabras</p></strong>
                                <p>{book.numberOfWords}</p> 
                            </Box>
                        </Box>

                        <Box display="flex" flexDirection="column">
                            <Box display="flex" flexDirection="row" alignItems="center" gap="1rem">
                            <TranslateOutlinedIcon
                                sx={{ width: "3rem", height: "3rem" }}>
                            </TranslateOutlinedIcon>
                            <strong><p>Traductions</p></strong>
                                </Box>
                            <Box display="flex" gap="1rem" flexWrap="wrap" >
                                {book.translations.map((translation) => (
                                    <p key={translation}> {translation}</p>
                                ))}
                            </Box>
                        </Box>

                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "5rem", height: "20rem", alignItems: "center" }}>
                        <Box display="flex" flexDirection="row" marginRight={5}>
                        {book.bestSeller && (
                            <IconButton
                            sx={{ height: "4rem" }}>
                            <CardMembershipRoundedIcon sx={{ height: "100%", width: "100%", color: "purple" }}></CardMembershipRoundedIcon>
                        </IconButton>
                        )}
                        
                        {book.challenging && (
                             <IconButton
                            sx={{ height: "4rem" }}>
                            <WhatshotOutlinedIcon sx={{ height: "100%", width: "100%", color: "blue" }}></WhatshotOutlinedIcon>
                            </IconButton>
                        )}
                        </Box>
        
                        <IconButton
                            onClick={() => displayBook(book.id)}
                            sx={{ height: "4rem",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%", // Forma circular
                                color: "black", // Color del ícono
                                }}>

                            <MoreVertIcon sx={{ width: "100%", height: "100%" }} />

                        </IconButton>

                        <IconButton
                            onClick={() => editBook(book.id)}
                            sx={{ height: "4rem",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#417cba", // Color de fondo
                                borderRadius: "50%", // Forma circular
                                color: "white", // Color del ícono
                                }}>

                            <EditIcon sx={{ width: "100%", height: "100%"}} />

                        </IconButton>

                        <IconButton
                            sx={{ height: "4rem",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "red", // Color de fondo
                                borderRadius: "50%", // Forma circular
                                color: "white", // Color del ícono
                                }}
                            onClick={() => deleteBook(book.id)}
                            >

                            <DeleteIcon sx={{ width: "100%", height: "100%" }} />

                        </IconButton>



                    </Box>
                </CardContent>
            </Card>
        </Box>
    )

}

export { Book };

