import { createCypressSelector } from "../utils/utils"
import { runAllPageIntegrityChecks } from "./page-integrity"

export class HomePage {
  visit() {
    cy.visit('/home')
    runAllPageIntegrityChecks()
  }

  hasMainInformationText() {
    const mainContent = cy.get(createCypressSelector('main'))
    mainContent.should('exist')

    mainContent.find('p').should('exist')
    mainContent.parent()
    mainContent.find('h2').should('exist')
  }
}
