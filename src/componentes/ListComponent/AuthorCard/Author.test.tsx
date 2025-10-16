import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Author } from './Author';
import { vi } from 'vitest';
import { AuthorJSON } from '../../../domain/AuthorJSON';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';

const author = new AuthorJSON(); 
    author.id = 1;
    author.name = 'John';
    author.lastName = 'Doe';
    author.nationality = 'PORTUGUES';
    author.creator = false;

    const onDelete = vi.fn();
    const navigateMock = vi.fn();

    vi.mock('react-router-dom', async () => {
        const actual = await vi.importActual('react-router-dom');
        return {
            ...actual,
            useNavigate: () => navigateMock,
        };
    });

describe('Author Component render', () => {

    afterEach(() => {
        vi.clearAllMocks()
    })

    beforeEach(() => {
        render(
            <MemoryRouter>
                <Author renderAuthor={author} onDelete={onDelete} />
            </MemoryRouter>
        );
    });

    it('card renders correctly', async () => {
        const card = await screen.findByTestId('card'); 
        expect(card).toBeInTheDocument();
    });

    it('renders author details correctly', async () => {
        const authorName = await screen.findByTestId('authorName'); 
        expect(authorName.textContent).toBe("John Doe");
    });

});

describe('buttons capture the info', () => {

    afterEach(() => {
        vi.clearAllMocks()
    })

    beforeEach(() => {
        render(
            <MemoryRouter>
                <Author renderAuthor={author} onDelete={onDelete} />
            </MemoryRouter>
        );
    });
    
    it('calls the correct onDelete function with the correct ID when delete button is clicked', async () => {
        const deleteButton = await screen.findByTestId('deleteAuthor');
        act(() => {
            fireEvent.click(deleteButton);
        });
        expect(onDelete).toHaveBeenCalledWith(1);
    });

    it('navigates to the correct path when edit button is clicked', async () => {
        const editButton = await screen.findByTestId('editAuthor');
        fireEvent.click(editButton);
        expect(navigateMock).toHaveBeenCalledWith('/autor/edit/1');
    });
    
    it('calls onDelete with correct ID when delete button is clicked', () => { 
        const deleteButton = screen.queryByTestId('deleteAuthor');
        act(() => {
            if (deleteButton) {
                fireEvent.click(deleteButton);
            }
        });

        expect(deleteButton).toBeInTheDocument(); 
        expect(onDelete).toHaveBeenCalledWith(1); 
    });

});