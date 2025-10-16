import { ChangeEvent, useEffect, useState } from "react";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import { Alert, Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField } from "@mui/material";
import { SaveCancelButton } from "../../FolderButtons/SaveCancelButton/SaveCancel";

export const Formulario = ({ autor, idiomas, onSelect, isEdit }: 
    { autor: AuthorJSON, idiomas: string[], onSelect: (updatedAuthor: AuthorJSON) => void, isEdit: boolean }) => {

    const [lenguajes, setLenguajes] = useState<string[]>(idiomas);
    const [autorFormulario, setAutorFormulario] = useState<AuthorJSON>(autor);
    const [errors, setErrors] = useState({
        name: { error: false, helperText: "" },
        lastName: { error: false, helperText: "" },
        nationality: { error: false, helperText: "" }
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const validateField = (fieldName: string, value: string) => {
        const lettersAndSpacesRegex = /^[a-zA-Z\s]+$/;
        let error = false;
        let helperText = "";
        const trimmedValue = value.trim();
        if (!trimmedValue) {
            error = true;
            helperText = `${fieldName} cannot be empty.`;
        } else if (!lettersAndSpacesRegex.test(trimmedValue)) {
            error = true;
            helperText = `${fieldName} must contain only letters and spaces.`;
        }
        return { error, helperText };
    };

    const editFile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        if (name === "name" || name === "lastName") {
            const { error, helperText } = validateField(name, value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: { error, helperText }
            }));
        }
        const updatedAuthor = { ...autorFormulario, [name]: value };
        setAutorFormulario(Object.assign(new AuthorJSON(), updatedAuthor));
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const confirm = () => {
        const updatedErrors = {
            name: validateField("name", autorFormulario.name || ""),
            lastName: validateField("lastName", autorFormulario.lastName || ""),
            nationality: {
                error: !autorFormulario.nationality,
                helperText: !autorFormulario.nationality ? "Language selection is required." : ""
            }
        };
        setErrors(updatedErrors);
    
        const hasErrors = Object.values(updatedErrors).some((field) => field.error);
    
        if (hasErrors) {
            setSnackbarSeverity("error");
            setSnackbarMessage("Please correct the errors before saving.");
            setOpenSnackbar(true);
            return;
        }
    
        // Si no hay errores, llamar a onSelect
        onSelect(autorFormulario);
        setSnackbarSeverity("success");
        setSnackbarMessage("Operation successful!");
        setOpenSnackbar(true);
    };
    

    useEffect(() => {
        setLenguajes(idiomas);
        setAutorFormulario(autor);
    }, [idiomas, autor]);

    return (
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="70vh">
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Box component="form" display="flex" flexDirection="column" alignItems="center" gap={3} width="100%" height="100%" padding={5}>
                <TextField label="Name" variant="outlined" onChange={editFile} name="name" disabled={!isEdit}
                    value={autorFormulario.name || ''} sx={{ width: '20rem' }} InputProps={{ style: { fontSize: '1.5rem' } }}
                    error={errors.name.error} 
                    helperText={errors.name.error ? errors.name.helperText : ''} 
                    data-testid="name-input"
                />

                <TextField
                    label="Last Name" variant="outlined" onChange={editFile} name="lastName" disabled={!isEdit} 
                    value={autorFormulario.lastName || ''} sx={{ width: '20rem' }} InputProps={{ style: { fontSize: '1.5rem' } }}
                    error={errors.lastName.error}
                    helperText={errors.lastName.error ? errors.lastName.helperText : ''} 
                    data-testid="last-name-input"
                />

                <FormControl sx={{ width: '20rem' }} error={errors.nationality.error} data-testid="language-select">
                    <InputLabel id="nationality-select-label">Language</InputLabel>
                    <Select
                        labelId="nationality-select-label"
                        id="nationality-select"
                        name="nationality"
                        disabled={!isEdit}
                        value={autorFormulario.nationality || ''}
                        label="Language"
                        onChange={(event: SelectChangeEvent) => editFile(event)}
                        sx={{ width: '20rem' }}
                        data-testid="language-select-input"
                    >
                        {lenguajes?.map((language) => (
                            <MenuItem key={language} value={language}>
                                {language}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.nationality.error && (
                        <FormHelperText>{errors.nationality.helperText}</FormHelperText>
                    )}
                </FormControl>
            </Box>
            <SaveCancelButton onClick={confirm} isBook={false} editable={isEdit} />
        </Box>
    );
}
