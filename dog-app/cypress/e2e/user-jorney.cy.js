import { BreedsPage } from "../support/page-objects/breeds-page"
import { HomePage } from "../support/page-objects/home-page"
import { BreedDetailPage } from "../support/page-objects/breed-detail-page"

describe('User jorney tests', () => {
  const homePage = new HomePage()
  const breedsPage = new BreedsPage()
  const breedsDetail = new BreedDetailPage()

  it('User can find the breed he/she is looking for and see its description as well as its image gallery', () => {
    homePage.visit()
    homePage.navigateToBreedsPage()
    breedsPage.navigateToBreedDetails()
    breedsDetail.openGallery();
  })

})
