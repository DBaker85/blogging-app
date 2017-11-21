import { RouterModule, Routes }   from '@angular/router';
import {bloggingComponent} from './app.component'
import {HeaderComponent} from './header/header.component'
import {SidePanelComponent} from './sidepanel/sidepanel.component'
import {PageNotFoundComponent} from './pagenotfound/pagenotfound.component'
import {PostListComponent, PostComponent, ArticleBodyComponent} from './posts'

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
    { path: '**', component: PageNotFoundComponent }
  ]
    
  export const routing = RouterModule.forRoot(appRoutes, { enableTracing: false });