import { BreedsPage } from '../support/page-objects/breeds-page'
import { createCypressSelector } from '../support/utils/utils'

describe('home page', () => {
  const breedsPage = new BreedsPage()

  beforeEach(() => {
    breedsPage.visit()
  })

  it('table should load', () => {
    breedsPage.checkTable()
  })

  it('navigation to details view is possible', () => {
    const table = cy.get(createCypressSelector('table'))
    table.should('exist')
    table.find('tbody tr').first().find('td').last().find(createCypressSelector('breeds-detail-link')).click()
    cy.get(createCypressSelector('breed-description')).should('exist')
  })

})
