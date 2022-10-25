export default class Login {
    constructor() {
        this.view = 'login.html';
    }

    executeHttpRequest() {
        document.querySelector('#auth-google').addEventListener('click', () => {
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then((user) => {
                // vous pouvez récupérer le nom comme ceci :
                alert(user.additionalUserInfo.profile.name);
                document.querySelector('#li_auth').textContent = user.additionalUserInfo.profile.name;
            }).catch(function(error) {
                console.log(error);
            });

        });
        document.querySelector('#auth-github').addEventListener('click', () => {
            let provider = new firebase.auth.GithubAuthProvider();
            firebase.auth().signInWithPopup(provider).then((user) => {
                // vous pouvez récupérer le nom comme ceci :
                alert(user.additionalUserInfo.profile.name);
                document.querySelector('#li_auth').textContent = user.additionalUserInfo.profile.name;
            }).catch(function(error) {
                console.log(error);
            });

        });

    }


}