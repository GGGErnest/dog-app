import { Routes } from '@angular/router';
import { breedsResolver } from './services/resolvers/breeds.resolver';
import { BreedDetailRouteComponent } from './routes/breed-detail-route/breed-detail-route.component';
import { BreedListRouteComponent } from './routes/breed-list-route/breed-list-route.component';
import { HomeRouteComponent } from './routes/home-route/home-route.component';
import { NotFoundRouteComponent } from './routes/not-found-route/not-found-route.component';

export const routes: Routes = [
  { path: 'home', component: HomeRouteComponent },
  { path: 'breeds', component: BreedListRouteComponent, resolve: { breeds: breedsResolver } },
  { path: 'breeds/details:id', component: BreedDetailRouteComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '*', component: NotFoundRouteComponent },
];
