import "./Create.css";
import { AddCircleTwoTone } from "@mui/icons-material";

export const Create = ({onClick} : 
    {onClick : () => void
    }) => {

    
    const createNavigation = () => {
            onClick();
        };


    return (
        
               <AddCircleTwoTone   sx={{ fontSize: 50, color: '#5dba41'}} onClick={createNavigation}></AddCircleTwoTone>
    );
}