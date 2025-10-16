import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { paths, PathTestId } from "../../domain/routes";
import { HeaderComponent } from "./header";

function renderWithBrowserRouter() {
    render(
        <>
            <BrowserRouter>
                <HeaderComponent currentOption="Mock title"></HeaderComponent>
            </BrowserRouter>
        </>
    );
}
describe('Header shortcut navigation', () => {

    it('Component rendering - ViewLayout child components truthy', async () => {
        renderWithBrowserRouter()

        expect(screen.findByTestId(`dashboard-shortcut`)).toBeTruthy()
    });

    it('Navigation - Click on AppName, navigates to Dashboard ', async () => {
        renderWithBrowserRouter()

        expect(screen.findByTestId("dashboard-shortcut")).toBeTruthy()

            ; (await screen.findByTestId("dashboard-shortcut")).click()
        expect(window.location.pathname).toBe(`${paths.dashboard.path}`)

    });

})