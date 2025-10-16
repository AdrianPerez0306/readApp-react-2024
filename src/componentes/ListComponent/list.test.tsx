import { render, screen, act, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import axios from 'axios';
import { REST_SERVER_URL } from '../../constants';
import { AuthorJSON } from '../../domain/AuthorJSON';
import { MemoryRouter } from 'react-router-dom';
import { expect } from 'vitest';
import { List } from './list';

const author1 = new AuthorJSON();
author1.id = 1;
author1.name = 'John';
author1.lastName = 'Doe';
author1.nationality = 'PORTUGUES';
author1.creator = false;

const mockAuthors = [author1];

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await import('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedNavigate,  
    };
});

describe('AuthorList Component', () => {

    beforeEach(() => {
        vi.mock('axios');
        const spyGetAxios = vi.spyOn(axios, 'get');
        const spyDelAxios = vi.spyOn(axios, 'delete');

        spyGetAxios.mockResolvedValueOnce({
            data: mockAuthors,
        });
        spyDelAxios.mockResolvedValueOnce({
            data: null,
        });

        render(
            <MemoryRouter>
                <List selectedOption={'autor'} />
            </MemoryRouter>
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('fetches authors from the backend and displays them', async () => {
      
        expect(axios.get).toHaveBeenCalledWith(`${REST_SERVER_URL}/allAuthors`);
    });

    it('sends the author to delete', async () => {
      
        const elimina = await screen.findByTestId("deleteAuthor");
        act(() => {
            fireEvent.click(elimina);
        });
        expect(axios.delete).toHaveBeenCalledWith(`${REST_SERVER_URL}/deleteAutor/1`);
    });

    it('navigates to edit page when edit button is clicked', async () => {

        const edita = await screen.findByTestId("editAuthor");
        act(() => {
            fireEvent.click(edita);
        });
        expect(mockedNavigate).toHaveBeenCalledWith(`/autor/edit/1`);
    });
});
