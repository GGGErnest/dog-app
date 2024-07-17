import { Routes } from '@angular/router';
import { breedsResolver } from './services/resolvers/breeds.resolver';
import { BreedDetailRouteComponent } from './routes/breed-detail-route/breed-detail-route.component';
import { BreedListRouteComponent } from './routes/breed-list-route/breed-list-route.component';
import { HomeRouteComponent } from './routes/home-route/home-route.component';
import { NotFoundRouteComponent } from './routes/not-found-route/not-found-route.component';
import { breedResolver } from './services/resolvers/breed.resolver';
import { AboutUsRouteComponent } from './routes/about-us-route/about-us-route.component';
import { ContactUsRouteComponent } from './routes/contact-us-route/contact-us-route.component';
import { PrivacyPolicyRouteComponent } from './routes/privacy-policy-route/privacy-policy-route.component';
import { TermsAndConditionsRouteComponent } from './routes/terms-and-conditions-route/terms-and-conditions-route.component';

export const routes: Routes = [
  { path: 'home', component: HomeRouteComponent },
  { path: 'about-us', component: AboutUsRouteComponent },
  { path: 'contact-us', component: ContactUsRouteComponent },
  { path: 'privacy-policy', component: PrivacyPolicyRouteComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsRouteComponent },
  { path: 'breeds', component: BreedListRouteComponent, resolve: { breeds: breedsResolver } },
  { path: 'breeds/:id', component: BreedDetailRouteComponent, resolve: { breed: breedResolver } },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundRouteComponent },
];
