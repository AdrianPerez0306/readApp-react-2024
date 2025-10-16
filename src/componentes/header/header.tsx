import { Link } from 'react-router-dom'
import { paths } from '../../domain/routes'
import { styled } from "@mui/material/styles";
import { Box, ThemeProvider, useTheme } from '@mui/material'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import Paper from '@mui/material/Paper';
import { common } from '@mui/material/colors';




const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    height: '100%',
    width: 'fit-content',
    display: 'flex',
    padding: 5,
    gap: 5,
    '& a, & h2': {
        height: 35,
    },
    borderColor: theme.palette.success.main,
    borderWidth: '3px',
    borderStyle: 'solid'
}));

const StyledSvg = styled(LibraryBooksOutlinedIcon)(({ theme }) => ({
    height: 40,
    width: 40,

}));

const StyledBoxHeader = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    height: 70,
    display: 'flex',
    padding: 10,
    gap: 10
}));


export const HeaderComponent = ({ currentOption }: { currentOption: string }) => {
    const theme = useTheme()
    return <>
        <ThemeProvider theme={theme}>
            <StyledBoxHeader
                data-testid="header">
                <StyledSvg></StyledSvg>
                <StyledPaper>
                    <Link to={`${paths.dashboard.path}`} data-testid="dashboard-shortcut">
                        <h2>ReadApp</h2>
                    </Link>
                    <h2>/{currentOption}</h2>
                </StyledPaper>
            </StyledBoxHeader>
        </ThemeProvider>

    </>
}

