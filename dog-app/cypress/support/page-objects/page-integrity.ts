import { createCypressSelector } from "../utils/utils";
export function hasNavigationBar(): void {
  const topHeader = cy.get(createCypressSelector('top-header'))
  topHeader.should('exist')
  topHeader.get(createCypressSelector('logo')).should('exist')
  topHeader.get(createCypressSelector('home-link')).should('exist')
  topHeader.get(createCypressSelector('breeds-link')).should('exist')
}

export function hasMainContent(): void {
  cy.get(createCypressSelector('main')).should('exist')
}

export function hasFooter(): void {
  const footer = cy.get(createCypressSelector('footer'))
  footer.should('exist')
  footer.get(createCypressSelector('about-us-nav-link')).should('exist')
  footer.get(createCypressSelector('contact-us')).should('exist')
  footer.get(createCypressSelector('privacy-policy')).should('exist')
  footer.get(createCypressSelector('terms-and-conditions')).should('exist')
  footer.get(createCypressSelector('rights')).should('exist')
}

export function runAllPageIntegrityChecks() {
  hasNavigationBar()
  hasMainContent()
  hasFooter()
}
