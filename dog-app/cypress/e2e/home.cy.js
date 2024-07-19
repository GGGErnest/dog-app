import { HomePage } from '../support/page-objects/home-page'

describe('home page', () => {
  const homePage = new HomePage()
  beforeEach(() => {
    homePage.visit()
  })

  it('information texts', () => {
    homePage.hasMainInformationText()
  })

})
