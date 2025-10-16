import { act, render, screen } from '@testing-library/react'
import { Dashboard } from "./Dashboard"
import { beforeEach, expect, MockInstance, vi } from 'vitest'
import { DashboardJSON } from '../../domain/DashboardJSON'
import axios from 'axios'
import { REST_SERVER_URL } from '../../constants'

const mockDashboard = new DashboardJSON(10, 5, 3, 8)


describe('Los datos del dashboard se muestran por pantalla', async () => {
    
    beforeEach(() => {
        vi.mock("axios")
        const spyGetAxios = vi.spyOn(axios, 'get')

        spyGetAxios.mockResolvedValue({
            data: mockDashboard
        })
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it("La recomendaciones se muestran en pantalla", async () => {
        render(<Dashboard />)
        const recomendations = await screen.findByTestId("recomendations") //Es importante porque hay que esperar a que el screen se actualiza, para eso sirve el find
        expect(recomendations.textContent).toBe("10")
    })

    it("Los libros se muestran en pantalla", async () => {
        render(<Dashboard />)
        const recomendations = await screen.findByTestId("books") //Es importante porque hay que esperar a que el screen se actualiza, para eso sirve el find
        expect(recomendations.textContent).toBe("5")
    })
})

describe("Los botones llaman al backend", async () => {
    let spyGetAxios: MockInstance

    beforeEach(() => {
        vi.mock("axios")
        spyGetAxios = vi.spyOn(axios, 'delete')
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it("El boton de borrar usuarios inactivos llama al back", async () => {
        render(<Dashboard />)
        const deleteUsers = screen.getByTestId("delete-users")
        act(() => deleteUsers.click())
        expect(spyGetAxios).toHaveBeenCalledWith(`${REST_SERVER_URL}/borrarUsuariosInactivos`)
    })

    it("El boton de borrar centros inactivos llama al back", async () => {
        render(<Dashboard />)
        const deleteUsers = screen.getByTestId("delete-centers")
        act(() => deleteUsers.click())
        expect(spyGetAxios).toHaveBeenCalledWith(`${REST_SERVER_URL}/borrarCentrosInactivos`)
    })

    
})

