import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { PostListComponent, PostComponent } from './posts';
import { PostBodyComponent } from './core/';
import { AdminComponent } from './admin';

const appRoutes: Routes = [
    {
      path: 'articles',
      component: PostListComponent
    },
    {
      path: 'article',
      children: [
        {
          path: ':urlSlug',
          component: PostComponent,
        },
    ]
    },
    { path: '',
      redirectTo: '/articles',
      pathMatch: 'full'
    },
    {
      path: 'admin',
      component: AdminComponent
    },
    { path: '**', component: PageNotFoundComponent }
  ];

  export const Routing = RouterModule.forRoot(appRoutes, { enableTracing: false });
