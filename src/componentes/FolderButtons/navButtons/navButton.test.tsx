import { render, screen } from "@testing-library/react";
import { NavButtonsComponent } from "./navButtons";
import { paths, PathTestId } from "../../../domain/routes";
import { BrowserRouter } from "react-router-dom";


function renderWithBrowserRouter() {
    render(
        <>
            <BrowserRouter>
                <NavButtonsComponent></NavButtonsComponent>
            </BrowserRouter>
        </>
    );
}
describe('bottom-menu-navigation', () => {

    it('Component rendering - Navigation Buttons truthy', () => {
        renderWithBrowserRouter()

        expect(screen.findByTestId(`link-${PathTestId.dashboard}`)).toBeTruthy()
        expect(screen.findByTestId(`link-${PathTestId.author}`)).toBeTruthy()
        expect(screen.findByTestId(`link-${PathTestId.books}`)).toBeTruthy()
        expect(screen.findByTestId(`link-${PathTestId.login}`)).toBeTruthy()
    });

    it('Button navigates on click', async () => {
        renderWithBrowserRouter()

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