/// <reference types="cypress" />
import { getByDataTestId } from "../../utils.cy"

describe("Tests crear y logear usuario", function(){
    const email = Math.random().toString() + "@gmail.com"
    const user = Math.random().toString()
    const pass = Math.random().toString()
    it("crear usuario", function() {
        cy.visit('/')
        cy.viewport('iphone-6')
        getByDataTestId('new-account-btn').click()
        getByDataTestId('input-email').type(email)
        getByDataTestId('input-name').type(user)
        getByDataTestId('input-username').type(user)
        getByDataTestId('input-password').type(pass)
        getByDataTestId('btn-create-account').click()
    })

    it("El usuario debe poder ser logeado", function(){
        cy.viewport('iphone-6') // Set viewport to 375px x 667px
        cy.visit('/')
        getByDataTestId('input-username').type(user)
        getByDataTestId('input-password').type(pass)
        getByDataTestId('try-login').click()
        cy.url().should('match', /dashboard/)
    })
})