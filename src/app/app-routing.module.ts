import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
     {
          path: 'home',
          loadChildren: () => import('./Users/home/home.module').then( m => m.HomePageModule)
     },
     {
          path: '',
          redirectTo: 'login',
          pathMatch: 'full'
     },
     {
          path: 'login',
          loadChildren: () => import('./Users/login/login.module').then( m => m.LoginPageModule)
     },
     {
          path: 'ragister',
          loadChildren: () => import('./Users/ragister/ragister.module').then( m => m.RagisterPageModule)
     },

     {
          path: 'otp',
          loadChildren: () => import('./Users/otp/otp.module').then( m => m.OtpPageModule)
     },
     {
          path: 'selectdriver',
          loadChildren: () => import('./Users/selectdriver/selectdriver.module').then( m => m.SelectdriverPageModule)
     },
     {
          path: 'choosedriver',
          loadChildren: () => import('./Users/choosedriver/choosedriver.module').then( m => m.ChoosedriverPageModule)
     },

     {
          path: 'menu',
          loadChildren: () => import('./Users/menu/menu.module').then( m => m.MenuPageModule)
     },
     {
          path: 'profile',
          loadChildren: () => import('./Users/profile/profile.module').then( m => m.ProfilePageModule)
     },
     {
          path: 'history',
          loadChildren: () => import('./Users/history/history.module').then( m => m.HistoryPageModule)
     },
     {
          path: 'help',
          loadChildren: () => import('./Users/help/help.module').then( m => m.HelpPageModule)
     },
     {
          path: 'support',
          loadChildren: () => import('./Users/support/support.module').then( m => m.SupportPageModule)
     },
     {
          path: 'driverdtls',
          loadChildren: () => import('./Users/driverdtls/driverdtls.module').then( m => m.DriverdtlsPageModule)
     },
     {
       path: 'addrating',
       loadChildren: () => import('./Users/addrating/addrating.module').then( m => m.AddratingPageModule)
     },
     {
       path: 'dlogin',
       loadChildren: () => import('./driver/login/login.module').then( m => m.LoginPageModule)
     },
     {
       path: 'dragister',
       loadChildren: () => import('./driver/ragister/ragister.module').then( m => m.RagisterPageModule)
     },
     {
       path: 'dotp',
       loadChildren: () => import('./driver/otp/otp.module').then( m => m.OtpPageModule)
     },
     {
       path: 'work',
       loadChildren: () => import('./driver/work/work.module').then( m => m.WorkPageModule)
     },
     {
       path: 'pdetails',
       loadChildren: () => import('./driver/pdetails/pdetails.module').then( m => m.PdetailsPageModule)
     },
     {
       path: 'vehicle-d',
       loadChildren: () => import('./driver/vehicle-d/vehicle-d.module').then( m => m.VehicleDPageModule)
     },
     {
       path: 'id-verification',
       loadChildren: () => import('./driver/id-verification/id-verification.module').then( m => m.IdVerificationPageModule)
     },
     {
       path: 'user-review',
       loadChildren: () => import('./driver/user-review/user-review.module').then( m => m.UserReviewPageModule)
     },
     {
       path: 'driver-home',
       loadChildren: () => import('./driver/driver-home/driver-home.module').then( m => m.DriverHomePageModule)
     },
     {
       path: 'driver-ride-details',
       loadChildren: () => import('./driver/driver-ride-details/driver-ride-details.module').then( m => m.DriverRideDetailsPageModule)
     },
     {
       path: 'driver-menu',
       loadChildren: () => import('./driver/menu/menu.module').then( m => m.MenuPageModule)
     },
     {
       path: 'driver-profile',
       loadChildren: () => import('./driver/profile/profile.module').then( m => m.ProfilePageModule)
     },
     {
       path: 'frieght',
       loadChildren: () => import('./driver/frieght/frieght.module').then( m => m.FrieghtPageModule)
     },
     {
       path: 'payment',
       loadChildren: () => import('./driver/payment/payment.module').then( m => m.PaymentPageModule)
     },
     {
       path: 'reviews',
       loadChildren: () => import('./driver/reviews/reviews.module').then( m => m.ReviewsPageModule)
     },
     {
       path: 'city',
       loadChildren: () => import('./driver/city/city.module').then( m => m.CityPageModule)
     },
     {
       path: 'intercity',
       loadChildren: () => import('./driver/intercity/intercity.module').then( m => m.IntercityPageModule)
     },
     {
       path: 'settings',
       loadChildren: () => import('./driver/settings/settings.module').then( m => m.SettingsPageModule)
     },
     {
       path: 'myearnings',
       loadChildren: () => import('./driver/myearnings/myearnings.module').then( m => m.MyearningsPageModule)
     },
     {
       path: 'doc-detls',
       loadChildren: () => import('./driver/doc-detls/doc-detls.module').then( m => m.DocDetlsPageModule)
     },
     {
        path: 'verifed',
       loadChildren: () => import('./driver/verifed/verifed.module').then( m => m.VerifedPageModule)
     },
     {
       path: 'enterlocation',
       loadChildren: () => import('./Users/enterlocation/enterlocation.module').then( m => m.EnterlocationPageModule)
     },
     {
       path: 'autoadd',
       loadChildren: () => import('./Users/autoadd/autoadd.module').then( m => m.AutoaddPageModule)
     },
     {
     path: 'otherridelist',
     loadChildren: () => import('./driver/otherridelist/otherridelist.module').then( m => m.OtherridelistPageModule)
     },
     {
     path: 'otheraccpet',
     loadChildren: () => import('./driver/otheraccpet/otheraccpet.module').then( m => m.OtheraccpetPageModule)
     },
     {
     path: 'otheraccpetride',
     loadChildren: () => import('./Users/otheraccpetride/otheraccpetride.module').then( m => m.OtheraccpetridePageModule)
     },
     {
     path: 'workingtype',
     loadChildren: () => import('./driver/workingtype/workingtype.module').then( m => m.WorkingtypePageModule)
     },
     {
     path: 'updateper-de',
     loadChildren: () => import('./driver/updateper-de/updateper-de.module').then( m => m.UpdateperDePageModule)
     },
     {
     path: 'update-vehical-de',
     loadChildren: () => import('./driver/update-vehical-de/update-vehical-de.module').then( m => m.UpdateVehicalDePageModule)
     },
     {
     path: 'update-professional-de',
     loadChildren: () => import('./driver/update-professional-de/update-professional-de.module').then( m => m.UpdateProfessionalDePageModule)
     },
     {
     path: 'chat',
     loadChildren: () => import('./Users/chat/chat.module').then( m => m.ChatPageModule)
     },
  
  {
    path: 'startride',
    loadChildren: () => import('./driver/startride/startride.module').then( m => m.StartridePageModule)
  },
  {
    path: 'completeride',
    loadChildren: () => import('./driver/completeride/completeride.module').then( m => m.CompleteridePageModule)
  },
  {
    path: 'ridedtl',
    loadChildren: () => import('./Users/ridedtl/ridedtl.module').then( m => m.RidedtlPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./driver/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'refresh',
    loadChildren: () => import('./driver/refresh/refresh.module').then( m => m.RefreshPageModule)
  },
  {
    path: 'oldride',
    loadChildren: () => import('./driver/oldride/oldride.module').then( m => m.OldridePageModule)
  },
  {
    path: 'ridehistory',
    loadChildren: () => import('./driver/ridehistory/ridehistory.module').then( m => m.RidehistoryPageModule)
  },
  {
    path: 'accepteduser',
    loadChildren: () => import('./driver/accepteduser/accepteduser.module').then( m => m.AccepteduserPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./driver/help/help.module').then( m => m.HelpPageModule)
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
