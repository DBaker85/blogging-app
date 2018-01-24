import { RouterModule, Routes }   from '@angular/router';
import {BloggingComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SidePanelComponent} from './sidepanel/sidepanel.component';
import {PageNotFoundComponent} from './pagenotfound/pagenotfound.component';
import {PostListComponent, PostComponent, ArticleBodyComponent} from './posts';
import {AdminComponent} from './admin/admin.component';

const appRoutes: Routes = [
    {
      path: 'articles',
      component: PostListComponent
    },
    {
      path: 'article',
      children:[
        {
          path:':urlSlug',
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
  ]
    
  export const Routing = RouterModule.forRoot(appRoutes, { enableTracing: false });