import { createCypressSelector } from "../utils/utils"
import { runAllPageIntegrityChecks } from "./page-integrity"

export class BreedDetailPage {

  checkPageIntegrity() {
    runAllPageIntegrityChecks()
  }
  openGallery() {
    cy.get(createCypressSelector('gallery-button')).click()
    cy.get(createCypressSelector('gallery')).should('exist').parent().find(createCypressSelector('gallery-close-btn')).click()
    cy.get(createCypressSelector('gallery')).should('not.exist')
  }

}
