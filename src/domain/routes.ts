
export const PathTestId = {
    login: 'login',
    dashboard: 'dashboard',
    author: 'autor',
    books: 'book',
    list : 'list',
}

export const mainPaths = {
    login: `/${PathTestId.login}`,
    dashboard: `/${PathTestId.dashboard}`,
    author: `/${PathTestId.author}`,
    books: `/${PathTestId.books}`,
    list: `/${PathTestId.list}`
}

export const paths = {
    login: {
        path: `${mainPaths.login}`,
        label: 'Login'
    },
    dashboard: {
        path: `${mainPaths.dashboard}`,
        label: 'Dashboard'
    },
    list:{
        autor:{
            path: `${mainPaths.list}/autor`,
            label: `Autor list `
        },
        book:{

            path: `${mainPaths.list}/book`,
            label: `Book list `
        }
        },
    author: {
        list: {
            path: `${mainPaths.author}/list`,
            label: `Author list`
        },
        create: {
            path: `${mainPaths.author}/create`,
            label: `Create author`
        },
        edit: {
            path: `${mainPaths.author}/edit`,
            label: `Edit author`
        },
        show: {
            path: `${mainPaths.author}/show`,
            label: `Author details`
        }
    },
    books: {
        list: {
            path: `${mainPaths.books}/list`,
            label: 'Book list',
        },
        display: {
            path: `${mainPaths.books}/display`,
            label: `Book details`
        },
        create: {
            path: `${mainPaths.books}/create`,
            label: `Create book`
        },
        edit: {
            path: `${mainPaths.books}/edit`,
            label: `Edit book`
        }
    }
}



export const pathToLabelMap = {

    [paths.dashboard.path]: paths.dashboard.label,

    [paths.author.list.path]: paths.author.list.label,

    [paths.author.create.path]: paths.author.create.label,

    [paths.author.edit.path]: paths.author.edit.label,

    [paths.author.show.path]: paths.author.show.label,

    [paths.books.list.path]: paths.books.list.label,

    [paths.books.create.path]: paths.books.create.label,

    [paths.books.display.path]: paths.books.display.label,

    [paths.books.edit.path]: paths.books.edit.label,


    [paths.list.book.path]: paths.list.book.label,

    [paths.list.autor.path]: paths.list.autor.label
};
