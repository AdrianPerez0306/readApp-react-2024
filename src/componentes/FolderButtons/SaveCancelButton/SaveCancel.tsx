import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import SaveIcon from '@mui/icons-material/Save';
import { SaveOutlined } from "@mui/icons-material";

export const SaveCancelButton = ({ onClick, isBook, editable }: { onClick: () => void, isBook: boolean, editable: boolean }) => {

    const navigate = useNavigate();

    const confirm = () => {
        onClick();
    }
    const cancel = () => {
        if (isBook) {
            navigate("/list/book");
        } else {
            navigate("/list/autor");
        }
    }

    return (
        <>
            <Box display="flex" flexDirection="row" justifyContent="center">
                    <Button>
                        <ReplyAllIcon
                            fontSize="large"
                            sx={{ color: "red", fontSize: "4rem" }}
                            onClick={cancel} />
                    </Button>
                    {editable &&
                <Button>
                    <SaveOutlined
                        fontSize="large"
                        sx={{ color: "green", fontSize: "4rem" }}
                        onClick={confirm} 
                        data-testid= 'save-button'/>
                </Button>
                }
            </Box>
        </>
    );
}