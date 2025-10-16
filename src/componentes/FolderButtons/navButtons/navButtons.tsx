import './navButtons.css'
import { NavLink } from 'react-router-dom';
import { paths, PathTestId } from '../../../domain/routes';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { AdminPanelSettingsRounded, BookOnlineTwoTone, LogoutOutlined, PeopleAltTwoTone } from '@mui/icons-material';
import { styled } from "@mui/material/styles";
import { blue, deepOrange, deepPurple } from '@mui/material/colors';
import shadows from '@mui/material/styles/shadows';
import { useState } from 'react';


const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    height: 70,
    justifyContent: 'space-evenly'
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    transition: '0.5s',
    boxShadow: shadows[2],
    borderColor: theme.palette.success.main,
    borderWidth: '3px',
    borderStyle: 'solid'

}));

export const NavButtonsComponent = () => {
    const [value, setValue] = useState('dashboard');

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return <>
        <StyledBottomNavigation
            value={value}
            onChange={handleChange}
            className='nav-menu'
            data-testid='bottom-nav-menu'
        >
            <StyledNavLink to={`${paths.dashboard.path}`} data-testid={`link-${PathTestId.dashboard}`}>
                <BottomNavigationAction
                    label="Dashboard"
                    value='dashboard'
                    icon={<AdminPanelSettingsRounded />}
                >
                </BottomNavigationAction>
            </StyledNavLink>

            <StyledNavLink to={`list/autor`} data-testid={`link-${PathTestId.author}`}>
                <BottomNavigationAction label="Author" value='author' icon={<PeopleAltTwoTone />}>
                </BottomNavigationAction>
            </StyledNavLink>
            <StyledNavLink to={`list/book`} data-testid={`link-${PathTestId.books}`}>
                <BottomNavigationAction label="Book" value='book' icon={<BookOnlineTwoTone />}>
                </BottomNavigationAction>
            </StyledNavLink>

            <StyledNavLink to={`${paths.login.path}`} data-testid={`link-${PathTestId.login}`}>
                <BottomNavigationAction label="Log out" value='log out' icon={<LogoutOutlined />}>
                </BottomNavigationAction>
            </StyledNavLink>
        </StyledBottomNavigation>


    </>
}
