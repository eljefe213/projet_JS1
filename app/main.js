import Home from '../controllers/Home.js';
import app from './app.js';
import config from './config.js';
import About from '../controllers/About.js';
import Search from '../controllers/Search.js';
import Login from '../controllers/Login.js';

// --------------------------------------------------------------------------------------------------------------------
// INITIALISATION DE L'APPLICATION
// --------------------------------------------------------------------------------------------------------------------

function initializeRouter() {
    // Instancier ici le Vanilla Router dans l'objet "app.mvc.router"
    // ...
    app.mvc.router = new Router({
        mode: 'hash',
        page404: function(path) {
            console.log('"/' + path + '" Page not found');
        }
    });
    app.mvc.router.add('', () => app.mvc.dispatchRoute(new Home()));
    app.mvc.router.add('Search', () => app.mvc.dispatchRoute(new Search()));
    app.mvc.router.add('About', () => app.mvc.dispatchRoute(new About()));
    app.mvc.router.add('Login', () => app.mvc.dispatchRoute(new Login()));
    app.mvc.router.addUriListener();
    app.mvc.router.navigateTo('/').check();

}


// --------------------------------------------------------------------------------------------------------------------
// CODE PRINCIPAL
// --------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation du routeur.
    initializeRouter();
    const firebaseConfig = {
        apiKey: "AIzaSyC1Ze5UzxmnwWiq_DJsnLfFf5m2KNuUwVU",
        authDomain: "pariseventsproject.firebaseapp.com",
        projectId: "pariseventsproject",
        storageBucket: "pariseventsproject.appspot.com",
        messagingSenderId: "1009141992858",
        appId: "1:1009141992858:web:62d1be8da08faf81747e23",
        measurementId: "G-BVTK6YT7J3"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

});