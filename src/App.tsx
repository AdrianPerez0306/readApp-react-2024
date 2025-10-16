import { createTheme, CssBaseline, styled, Switch, ThemeProvider, useColorScheme } from '@mui/material';
import './App.css'
import { AppRouter } from './routes';
import { useState } from 'react';
import { blue, deepOrange, grey, red } from '@mui/material/colors';
import { appTheme } from './AppTheme';
import { useLocation } from 'react-router-dom';
import { render } from 'react-dom';
import { MaterialUISwitch } from './mui-themes/mui-switch';


const StyledSwitchToggle = styled(Switch)(({ theme }) => ({
    background: theme.palette.secondary.main,
    position: 'absolute',
    bottom: 80,
    right: 2,
    zIndex: 'tooltip',
    borderRadius: '1rem',
    transform: 'rotate(90deg)'
}));

const StyledSwitchToggleLogin = styled(Switch)(({ theme }) => ({
    // background: theme.palette.primary.main,
    position: 'absolute',
    top: 180,
    right: 20,
    borderRadius: '1rem',
    zIndex: 999
}));

function App() {


    const [mode, setMode] = useState(false);

    const theme = appTheme(mode)

    function handleChange() {
        setMode(!mode)
    }
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppRouter />
                <SwitchToggleThemeMode checked={mode} change={handleChange} />
            </ThemeProvider>

        </>
    );


}

export default App

interface SwitchToggleThemeModeProps {

    checked: boolean;

    change: () => void;

}

function SwitchToggleThemeMode(props: SwitchToggleThemeModeProps) {
    return (
        <>
            {window.location.pathname != '/login'
                ? <MaterialUISwitch checked={props.checked} onChange={props.change} ></MaterialUISwitch>
                : <StyledSwitchToggleLogin checked={props.checked} onChange={props.change} />
            }
        </>
    );
}
