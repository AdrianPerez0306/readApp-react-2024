import { render, screen, fireEvent } from '@testing-library/react';
import { expect } from 'vitest';
import axios from 'axios';
import { REST_SERVER_URL } from '../../../constants';
import { MemoryRouter } from 'react-router-dom';
import AuthorEdit from './AuthorEdit';
import { AuthorJSON } from '../../../domain/AuthorJSON';
import { act } from 'react';
import { vi } from 'vitest';

const author1 = new AuthorJSON();
author1.id = 1;
author1.name = 'John';
author1.lastName = 'Doe';
author1.nationality = 'PORTUGUES';
author1.creator = false;

const mockAuthors = [author1];
const mockLanguages = ['English', 'Spanish', 'German'];

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: () => ({ id: '1' }), 
        useNavigate: vi.fn(),
    };
});

describe('renders component create mode correctly', () => {

    afterEach(() => {
        vi.clearAllMocks();
    });

    beforeEach(() => {
        vi.mock('axios');
        const spyGetAxios = vi.spyOn(axios, 'get');
        spyGetAxios.mockResolvedValueOnce({ data: mockAuthors });
        const spyPostAxios = vi.spyOn(axios, 'post');
        spyPostAxios.mockResolvedValueOnce({ data: true });

        render(
            <MemoryRouter>
                <AuthorEdit editable={true} />
            </MemoryRouter>
        );
    });

    it('should render the form with initial data (Lengaujes)', async () => {
        expect(axios.get).toHaveBeenCalledWith(`${REST_SERVER_URL}/lenguajes`);
    });

    it('should show error when fields are empty and cannot create author', async () => {

        const saveButton = await screen.findByTestId('save-button');

        act(() => {
            fireEvent.click(saveButton);
        });
        expect(axios.post).not.toHaveBeenCalled();

    });

});

describe('renders component edit mode correctly', () => {

    afterEach(() => {
        vi.clearAllMocks();
    });

    beforeEach(() => {
        vi.spyOn(axios, 'get').mockImplementation((url) => {
            if (url.includes('/getAutor/1')) {
                return Promise.resolve({ data: mockAuthors });
            }
           
            return Promise.reject(new Error('Unknown endpoint'));
        });

        render(
            <MemoryRouter>
                <AuthorEdit editable={true} />
            </MemoryRouter>
        );
    });

    it('should load the author data into the form', async () => {
        expect(axios.get).toHaveBeenCalledWith(`${REST_SERVER_URL}/getAutor/1`);

    });
});
      

