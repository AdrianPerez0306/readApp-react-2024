import '@testing-library/jest-dom' // Importa esto al inicio de tu archivo de pruebas

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Login } from '../login/login'  // Asegúrate de ajustar la ruta
import { userService } from '../../service/userService'  // Asegúrate de ajustar la ruta
import { vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

vi.mock('../../service/userService')  // Mock para los servicios

describe('Login Component', () => {
  test('displays success message on successful login', async () => {
    // Mock de la respuesta exitosa de login
    userService.login = vi.fn().mockResolvedValueOnce({ userID: 123, message: 'Login successful!' })

    // Renderizar el componente con BrowserRouter para manejar la navegación
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    // Simular el ingreso de datos en el formulario
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } })
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'testpassword' } })

    // Enviar el formulario
    fireEvent.click(screen.getByText(/Login/i))

    // Esperar que el mensaje de éxito sea mostrado en el Snackbar
    await waitFor(() => {
      // Asegúrate de que el mensaje de éxito se muestra en el snackbar
      expect(screen.getByText(/Login successful! Redirecting.../i)).toBeInTheDocument()
    })

    // Puedes verificar redirección o otros efectos secundarios aquí si lo necesitas
  })

  test('displays error message on failed login', async () => {
    // Mock para simular una respuesta de error del login
    userService.login = vi.fn().mockRejectedValueOnce(new Error('Invalid credentials'))

    // Renderizar el componente
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    // Simular el ingreso de datos incorrectos en el formulario
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'wronguser' } })
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpassword' } })

    // Enviar el formulario
    fireEvent.click(screen.getByText(/Login/i))

    // Esperar que el mensaje de error sea mostrado en el Snackbar
    await waitFor(() => {
      // Buscar el Snackbar y verificar el mensaje de error
      const alert = screen.getByRole('alert')
      // Actualizar el texto esperado con el mensaje correcto
      expect(alert).toHaveTextContent(/An error occurred while connecting to the backend. Please contact the system administrator/i)
    })
  })
})
