const INTERNAL_SERVER_ERROR = 500

export const mostrarMensajeError = (error: ErrorResponse, setearMensaje: (mensaje: string) => void) => {
const status = error.response?.status
const errorMessage = status >= INTERNAL_SERVER_ERROR ? 'An error occurred, please try again' :
  !status ? 'An error occurred while connecting to the backend. Please contact the system administrator' : error.response.data.message
  if (status >= INTERNAL_SERVER_ERROR) {
    console.error(error.message)
  }
  setearMensaje(errorMessage)
}

export type ErrorResponse = {
  response: {
    status: number,
    data: {
      message: string
    }
  },
  message: string
}