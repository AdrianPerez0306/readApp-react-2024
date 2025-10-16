import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Dashboard } from './componentes/dashboard/Dashboard';
import { ViewLayoutComponent } from './componentes/viewLayout/viewLayout';
import { Login } from './componentes/login/login';
import { paths, PathTestId, pathToLabelMap } from './domain/routes';
import {BookDetail} from './componentes/BookCreation/BookDetail';
import AuthorEdit from './componentes/FolderAuthor/AuthorEdit/AuthorEdit';
import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from '@emotion/react';
import { List } from './componentes/ListComponent/list';


interface HeaderOptionProps {
    title: string;
    stateDispatcher: React.Dispatch<React.SetStateAction<string>>
}
export const AppRoutes = (props: HeaderOptionProps) => {
    const location = useLocation()
    useEffect(() => {
        handleTitle()
    }, [location]);
    
    function handleTitle() {
        const currentPath = location.pathname;
        const matchedLabel = Object.keys(pathToLabelMap).find(path => {

            return currentPath === path || currentPath.startsWith(path.replace(/:id/, ''));
        });
        props.stateDispatcher(matchedLabel ? pathToLabelMap[matchedLabel] : paths.login.label);
    }
    

    return <>
        <Routes>
            <Route path={`${paths.login.path}`} element={<Login />} />

            <Route element={<ViewLayoutComponent selectedOption={props.title} />}>
                <Route path={`${paths.dashboard.path}`} element={<Dashboard/>} />

                <Route path={`${paths.list.book.path}`} element={<List selectedOption={PathTestId.books}/>} />
                <Route path={`${paths.list.autor.path}`} element={<List selectedOption={PathTestId.author}/>} />

                <Route path={`${paths.author.create.path}`} element={<AuthorEdit editable={true} />} />
                <Route path={`${paths.author.edit.path}/:id`} element={<AuthorEdit editable={true} />} />
                <Route path={`${paths.author.show.path}/:id`} element={<AuthorEdit editable={false} />} />

                <Route path={`${paths.books.create.path}`} element={<BookDetail editable={true}  />} />
                <Route path={`${paths.books.display.path}/:id`} element={<BookDetail editable={false} />} />
                <Route path={`${paths.books.edit.path}/:id`} element={<BookDetail editable={true}  />} />

            </Route>

            <Route path="*" element={<Navigate to={`${paths.login.path}`} replace />} />
        </Routes>
    </>
};


export const AppRouter = () => {
    const [currentOption, setCurrentOption] = useState(paths.dashboard.label)
    const theme = useTheme()
    return <>
        <ThemeProvider theme={theme}>
            <Router>
                <AppRoutes title={currentOption} stateDispatcher={setCurrentOption}></AppRoutes>
            </Router>
        </ThemeProvider>

    </>
};

