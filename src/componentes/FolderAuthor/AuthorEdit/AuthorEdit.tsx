import { AuthorJson, AuthorJSON} from "../../../domain/AuthorJSON";
import { authorService } from "../../../service/authorService";
import { useNavigate, useParams } from "react-router-dom";
import { mostrarMensajeError } from '../../../error-handling';
import { Formulario } from "../Formulario/Formulario";
import { useEffect, useState } from "react";
import { paths } from "../../../domain/routes";

export const AuthorEdit = ({ editable }: { editable: boolean }) => {
  const [author, setAuthor] = useState<AuthorJSON>(new AuthorJSON());
  const [lenguajes, setLenguajes] = useState<string[]>([]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const params = useParams();
  const navigate = useNavigate();

  const getAuthor = async () => {
    try {
      const id = Number(params.id);
      const fetchedAuthor = await authorService.getAuthor(id);
      setAuthor(fetchedAuthor);
      await getIdiomas();

    } catch (error: any) {
      setSnackbarSeverity('error');
      mostrarMensajeError(error, setSnackbarMessage);
      setOpenSnackbar(true);
    }
  };

  const getIdiomas = async () => {
    try {
      const idiomas = await authorService.getIdiomas();
      setLenguajes(idiomas);
    } catch (error: any) {
      setSnackbarSeverity('error');
      mostrarMensajeError(error, setSnackbarMessage);
      setOpenSnackbar(true);
    }
  };

  const confirmEdit = async (autorEdit: AuthorJSON) => {
    if (JSON.stringify(autorEdit) === JSON.stringify(author)) {
      navigate(`${paths.list.autor.path}`);
    }

    const autor = AuthorJson.toAuthor(autorEdit);
    try {
      await authorService.editAuthor(autor);
      setTimeout(() => navigate(`${paths.list.autor.path}`), 1000);
    } catch (error: any) {
      setSnackbarSeverity('error');
      mostrarMensajeError(error, setSnackbarMessage);
      setOpenSnackbar(true);
    }
  }

  const confirmCreate = async (autorCreate: AuthorJSON) => {
    const autor = AuthorJson.toCreateAuthor(autorCreate);
    try {
      await authorService.createAuthor(autor);
      setTimeout(() => navigate(`${paths.list.autor.path}`), 1000);
    } catch (error: any) {
      setSnackbarSeverity('error');
      mostrarMensajeError(error, setSnackbarMessage);
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    if (params.id) {
      getAuthor();
    } else {
      getIdiomas();
    }
  }, [params.id]);

  return (
    <Formulario
      autor={author}
      idiomas={lenguajes}
      onSelect={(updatedAuthor) => (params.id ? confirmEdit(updatedAuthor) : confirmCreate(updatedAuthor))}
      isEdit={editable}
      data-testid="authorCrear"
    />
  );
}
export default AuthorEdit;
