import { createCypressSelector } from "../utils/utils"
import { runAllPageIntegrityChecks } from "./page-integrity"

export class BreedsPage {

  visit() {
    cy.visit('/breeds')
    runAllPageIntegrityChecks()
  }

  checkTable() {
    const table = cy.get(createCypressSelector('table'))
    table.should('exist')

    table.find('tbody tr').first().find('td').should('exist')
  }


}
