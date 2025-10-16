import { render, screen, fireEvent, waitFor } from '@testing-library/react' 
import { FormsComponent } from './FormsComponent' 
import { vi } from 'vitest'  // Importa `vi` para los mocks en Vitest
import '@testing-library/jest-dom'  // Importa esto para usar las aserciones extendidas
import userEvent from '@testing-library/user-event'

describe('FormsComponent', () => {
  const mockLogin = vi.fn()  // Usamos `vi.fn()` en lugar de `jest.fn()`
  const mockCreate = vi.fn()
  const mockChangePage = vi.fn()

  it('should render login view by default', () => {
    render(<FormsComponent 
      isLoginPage={true} 
      login={mockLogin} 
      changePage={mockChangePage} 
      create={mockCreate} 
    />)

    // Verificar que estamos en la vista de login
    expect(screen.getByText(/Login/i)).toBeInTheDocument()
    expect(screen.getByText(/New account/i)).toBeInTheDocument()
  })

  it('should render signup view when changed', () => {
    render(<FormsComponent 
      isLoginPage={false} 
      login={mockLogin} 
      changePage={mockChangePage} 
      create={mockCreate} 
    />)

    // Verificar que estamos en la vista de registro
    expect(screen.getByText(/Create Account/i)).toBeInTheDocument()
    expect(screen.getByText(/Back to Login/i)).toBeInTheDocument()
  })

  it('should show error messages for required fields when the form is submitted empty', async () => {
    render(
      <FormsComponent
        isLoginPage={true}
        login={mockLogin}
        changePage={mockChangePage}
        create={mockCreate}
      />
    )
  
    // Buscar el botón de login y hacer clic en él para intentar enviar el formulario
    const loginButton = screen.getByTestId('try-login')
    fireEvent.click(loginButton)
  
    // Esperar que los mensajes de error aparezcan
    await waitFor(() => {
      // Obtener todos los mensajes de error
      const errorMessages = screen.getAllByText(/Field is required/i)
      
      // Verificar que hay exactamente 2 mensajes de error
      expect(errorMessages).toHaveLength(2)
  
      // Verificar que los mensajes de error estén presentes
      expect(errorMessages[0]).toBeInTheDocument()
      expect(errorMessages[1]).toBeInTheDocument()
    })
  
    // Verificar que el mock de login no haya sido llamado
    expect(mockLogin).not.toHaveBeenCalled()
  })

//   it('should create an account successfully when the form is submitted with valid data', async () => {
//     const email = 'test@example.com'
//     const username = 'testuser'
//     const password = 'password123'
//     const name = 'TestUser'
  
//     render(<FormsComponent isLoginPage={false} login={mockLogin} changePage={mockChangePage} create={mockCreate} />)
  
//     // Escribir en los campos del formulario
//     await userEvent.type(screen.getByTestId('email-input'), email)
//     await userEvent.type(screen.getByTestId('username-input'), username)
//     await userEvent.type(screen.getByTestId('password-input'), password)
//     await userEvent.type(screen.getByTestId('name-input'), name)
  
//     // Verificar que los valores se hayan actualizado correctamente
//     expect(screen.getByTestId('email-input')).toHaveValue(email)
//     expect(screen.getByTestId('username-input')).toHaveValue(username)
//     expect(screen.getByTestId('password-input')).toHaveValue(password)
//     expect(screen.getByTestId('name-input')).toHaveValue(name)
  
//     // Hacer clic en el botón de crear cuenta
//     fireEvent.click(screen.getByText(/Create Account/i))
  
//     // Verificar que la función create haya sido llamada
//     await waitFor(() => {
//       expect(mockCreate).toHaveBeenCalledWith(email, username, password, name)
//     })
  
//     // Verificar que login no haya sido llamado
//     expect(mockLogin).not.toHaveBeenCalled()
//   })
})
