// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  DB_URL : 'https://misproyectos-55a6d-default-rtdb.firebaseio.com/resto/',
  DB_NODE : localStorage.getItem('uid_hash'),
  firebaseConfig : {
    apiKey: "AIzaSyDVqOQtZqHsrxqxp3AqF1AZOWHF9Cpr7u4",
    authDomain: "misproyectos-55a6d.firebaseapp.com",
    projectId: "misproyectos-55a6d",
    storageBucket: "misproyectos-55a6d.appspot.com",
    messagingSenderId: "846507628367",
    appId: "1:846507628367:web:58bee54ad4eeb138b8173a"
  }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
