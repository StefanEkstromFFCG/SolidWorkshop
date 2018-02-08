import { NgModule, Inject } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Ng2BootstrapModule } from 'ngx-bootstrap';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './containers/home/home.component';
import { UsersComponent } from './containers/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { CounterComponent } from './containers/counter/counter.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { NgxBootstrapComponent } from './containers/ngx-bootstrap-demo/ngx-bootstrap.component';

import { LinkService } from './shared/link.service';
import { UserService } from './shared/user.service';
import { ORIGIN_URL } from './shared/constants/baseurl.constants';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';

export function createTranslateLoader(http: Http, baseHref) {
    // Temporary Azure hack
    if (baseHref === null && typeof window !== 'undefined') {
        baseHref = window.location.origin;
    }

    return new TranslateHttpLoader(http, `${baseHref}/assets/i18n/`, '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        UsersComponent,
        UserDetailComponent,
        HomeComponent,
        NotFoundComponent,
        NgxBootstrapComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        Ng2BootstrapModule.forRoot(),
        TransferHttpModule,

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http, [ORIGIN_URL]]
            }
        }),

        RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home', component: HomeComponent,
                data: {
                    title: 'Homepage',
                    meta: [{ name: 'description', content: 'This is an example Description Meta tag!' }],
                    links: [
                        { rel: 'canonical', href: 'http://blogs.example.com/blah/nice' },
                        { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/' }
                    ]
                }
            },
            {
                path: 'counter', component: CounterComponent,
                data: {
                    title: 'Counter',
                    meta: [{ name: 'description', content: 'This is a Counter page Description!' }],
                    links: [
                        { rel: 'canonical', href: 'http://blogs.example.com/counter/something' },
                        { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/counter' }
                    ]
                }
            },
            {
                path: 'users', component: UsersComponent,
                data: {
                    title: 'Users REST example',
                    meta: [{ name: 'description', content: 'This is the User REST API example page Description!' }],
                    links: [
                        { rel: 'canonical', href: 'http://blogs.example.com/chat/something' },
                        { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/users' }
                    ]
                }
            },
            {
                path: 'ngx-bootstrap', component: NgxBootstrapComponent,
                data: {
                    title: 'Ngx-bootstrap demo!',
                    meta: [{ name: 'description', content: 'This is an Demo Bootstrap page Description!' }],
                    links: [
                        { rel: 'canonical', href: 'http://blogs.example.com/bootstrap/something' },
                        { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/bootstrap-demo' }
                    ]
                }
            },

            { path: 'lazy', loadChildren: './containers/lazy/lazy.module#LazyModule'},

            {
                path: '**', component: NotFoundComponent,
                data: {
                    title: '404 - Not found',
                    meta: [{ name: 'description', content: '404 - Error' }],
                    links: [
                        { rel: 'canonical', href: 'http://blogs.example.com/bootstrap/something' },
                        { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/bootstrap-demo' }
                    ]
                }
            }
        ], {
          useHash: false,
          preloadingStrategy: PreloadAllModules,
          initialNavigation: 'enabled'
        })
    ],
    providers: [
        LinkService,
        UserService,
        TranslateModule
    ]
})
export class AppModuleShared {
}
