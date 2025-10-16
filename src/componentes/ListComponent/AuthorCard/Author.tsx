import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import { paths } from "../../../domain/routes";

export const Author = ({ renderAuthor, onDelete }:
    { renderAuthor: AuthorJSON; onDelete: (id: number) => void }) => {

    const navigate = useNavigate();

    const editAuthor = (id: number) => {
        navigate(`${paths.author.edit.path}/${id}`);
    };

    const deleteAuthor = (id: number) => {
        onDelete(id);
    };

    const showAuthor = (id: number) => {
        navigate(`${paths.author.show.path}/${id}`);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="25rem"
            height="14rem"
            margin="auto"
            padding="1rem"
        >

            <Card
                key={renderAuthor.id} variant="outlined" data-testid="card" sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    borderRadius: "2rem",
                    borderColor: '#212121',
                    backgroundColor: "#ff8a80",

                }}>

                <CardContent onClick={() => showAuthor(renderAuthor.id)} data-testid="cardContent" sx={{
                    width: "80%",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "1.5rem",
                }}>

                    <Typography
                        variant="h5"
                        color="text.primary"
                        data-testid="authorName"
                        sx={{ fontWeight: 'bold' }}
                    >
                        {renderAuthor.name} {renderAuthor.lastName}
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.primary"
                        data-testid="authorNationality"
                        sx={{ fontStyle: 'oblique' }}
                    >
                        {renderAuthor.nationality}
                    </Typography>

                </CardContent>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="space-evenly"
                    width="20%"
                    height="100%"
                >
                    <IconButton
                        onClick={() => showAuthor(renderAuthor.id)}
                        data-testid="showAuthor"
                        sx={{ height: "2.5rem", padding: 0, color: "black" }}
                    >
                        <MoreVertIcon sx={{ width: "100%", height: "100%" }} />
                    </IconButton>

                    <IconButton
                        onClick={() => editAuthor(renderAuthor.id)}
                        data-testid="editAuthor"
                        sx={{ height: "2.5rem", padding: 0, color: "green" }}
                    >
                        <EditIcon sx={{ width: "100%", height: "100%" }} />
                    </IconButton>

                    {!renderAuthor.creator && (
                        <IconButton
                            sx={{ height: "2.5rem", padding: 0 }}
                            onClick={() => deleteAuthor(renderAuthor.id)}
                            color="error"
                            data-testid="deleteAuthor"
                        >
                            <DeleteIcon sx={{ width: "100%", height: "100%" }} />
                        </IconButton>
                    )}

                </Box>
            </Card>
        </Box>
    );
};

export default Author;
