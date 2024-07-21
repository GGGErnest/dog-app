import { first } from "cypress/types/lodash"
import { createCypressSelector } from "../utils/utils"
import { runAllPageIntegrityChecks } from "./page-integrity"

export class BreedsPage {

  private _baseUrl = '/breeds'

  visit() {
    cy.visit(this._baseUrl)
    runAllPageIntegrityChecks()
  }

  getTable() {
    return cy.get(createCypressSelector('table'))
  }

  checkTable() {
    this.getTable().should('exist').find('tbody tr').first().find('td').should('exist')
  }

  navigateToBreedDetails() {
    cy.get(createCypressSelector('breeds-detail-link')).then((links) => {
      const firstLink = links[0];
      const breedName = firstLink.getAttribute('data-cy-breed')
      firstLink.click()
      cy.location('pathname').should('contain', `${this._baseUrl}/${breedName}`)
    })
  }
}
