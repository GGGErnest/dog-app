import { Routes } from '@angular/router';
import { BreedDetailComponent } from './routes/breed-detail/breed-detail.component';
import { BreedListComponent } from './routes/breed-list/breed-list.component';
import { HomeComponent } from './routes/home/home.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { breedsResolver } from './services/resolvers/breeds.resolver';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'breeds', component: BreedListComponent, resolve: { breeds: breedsResolver } },
  { path: 'breeds/details:id', component: BreedDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '*', component: NotFoundComponent },
];
