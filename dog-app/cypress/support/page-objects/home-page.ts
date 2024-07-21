import { createCypressSelector } from "../utils/utils"
import { runAllPageIntegrityChecks } from "./page-integrity"

export class HomePage {
  visit() {
    cy.visit('/home')
    runAllPageIntegrityChecks()
  }

  navigateToBreedsPage() {
    cy.get(createCypressSelector('breeds-link')).should('exist').click()
    cy.location('pathname').should('contain', 'breeds')
  }

  hasMainInformationText() {
    const mainContent = cy.get(createCypressSelector('main'))
    mainContent.should('exist')

    mainContent.find('p').should('exist')
    mainContent.parent()
    mainContent.find('h2').should('exist')
  }
}
