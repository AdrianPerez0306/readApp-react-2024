import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Formulario } from './Formulario';
import { AuthorJSON } from '../../../domain/AuthorJSON';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react';

const mockOnSelect = vi.fn();
const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => navigateMock,
    };
});

const idiomas = ["PORTUGUES", "ESPANIOL", "ALEMAN"];

const autor = new AuthorJSON();
autor.id = 1;
autor.name = "John";
autor.lastName = "Doe";
autor.nationality = "ESPANIOL";

const autor0 = new AuthorJSON();
autor0.id = 0;
autor0.name = "";
autor0.lastName = "";
autor0.nationality = "";

describe('Formulario Component', () => {
    
    afterEach(() => {
        cleanup();
        vi.clearAllMocks()
    })

    beforeEach(() => {
        render(
            <MemoryRouter>
                <Formulario autor={autor} idiomas={idiomas} onSelect={mockOnSelect} isEdit={true} />;
            </MemoryRouter>
        );
        nameInput = screen.getByTestId('name-input');
        lastNameInput = screen.getByTestId('last-name-input');
    });

    let nameInput: HTMLElement;
    let lastNameInput: HTMLElement;

    it('should validate name field and update inputs correctly', () => {
        expect(nameInput).not.toBeDisabled();
        expect(lastNameInput).not.toBeDisabled();
    });

    it('should validate name field and update inputs correctly', () => {

        userEvent.type(nameInput, 'diego');
        userEvent.type(lastNameInput, 'lentz');

        const saveButton = screen.getByTestId('save-button');
        act(() => {
            fireEvent.click(saveButton);
        });

        expect(mockOnSelect).toHaveBeenCalledTimes(1);
        expect(mockOnSelect).toHaveBeenCalledWith(expect.any(AuthorJSON));

    });
});

    describe('if id = 0, the inputs are empty', () => {

        afterEach(() => {
            cleanup();
            vi.clearAllMocks()
        });

        beforeEach(() => {
            render(
                <MemoryRouter>
                    <Formulario autor={autor0} idiomas={idiomas} onSelect={mockOnSelect} isEdit={true} />;
                </MemoryRouter>
            );

            nameInput = screen.getByTestId('name-input');
            lastNameInput = screen.getByTestId('last-name-input');
        });

        let nameInput: HTMLElement;
        let lastNameInput: HTMLElement;

        it('should have empty inputs', () => {

            expect(nameInput).not.toHaveValue();
            expect(lastNameInput).not.toHaveValue();
        });
    });

