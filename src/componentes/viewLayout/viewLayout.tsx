import { ThemeProvider, useTheme } from '@emotion/react'
import { NavButtonsComponent } from '../FolderButtons/navButtons/navButtons'
import { HeaderComponent } from '../header/header'
import './viewLayout.css'
import { Outlet } from 'react-router-dom'

export const ViewLayoutComponent = ({ selectedOption }: { selectedOption: string }) => {
    const theme = useTheme();
    return <>
        <ThemeProvider theme={theme}>
            <HeaderComponent currentOption={selectedOption} data-testid={"header"}></HeaderComponent>
            <div className='content' data-testid={"content"}>
                <Outlet></Outlet>
            </div>
            <NavButtonsComponent data-testid={"nav-buttons"}></NavButtonsComponent>
        </ThemeProvider>


    </>
}



