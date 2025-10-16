import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ViewLayoutComponent } from "./viewLayout";
import { paths, PathTestId } from "../../domain/routes";


function renderWithBrowserRouter() {
    render(
        <>
            <BrowserRouter>
                <ViewLayoutComponent selectedOption="Mock title"></ViewLayoutComponent>
            </BrowserRouter>
        </>
    );
}
describe('bottom-menu-navigation', () => {

    it('Component rendering - ViewLayout child components truthy', async () => {
        renderWithBrowserRouter()

        expect(screen.findByTestId(`header`)).toBeTruthy()
        expect(screen.findByTestId(`content`)).toBeTruthy()
        expect(screen.findByTestId(`nav-buttons`)).toBeTruthy()
    });

    it('Child component navigation. Button navigates on click', async () => {
        renderWithBrowserRouter()

        expect(screen.findByTestId(`link-${PathTestId.dashboard}`)).toBeTruthy()
        expect(screen.findByTestId(`link-${PathTestId.author}`)).toBeTruthy()
        expect(screen.findByTestId(`link-${PathTestId.books}`)).toBeTruthy()
        expect(screen.findByTestId(`link-${PathTestId.login}`)).toBeTruthy()

            ; (await screen.findByTestId(`link-${PathTestId.dashboard}`)).click()
        expect(window.location.pathname).toBe(`${paths.dashboard.path}`)

            ; (await screen.findByTestId(`link-${PathTestId.author}`)).click()
        expect(window.location.pathname).toBe(`${paths.author.list.path}`)

            ; (await screen.findByTestId(`link-${PathTestId.books}`)).click()
        expect(window.location.pathname).toBe(`${paths.books.list.path}`)

            ; (await screen.findByTestId(`link-${PathTestId.login}`)).click()
        expect(window.location.pathname).toBe(`${paths.login.path}`)
    });

})