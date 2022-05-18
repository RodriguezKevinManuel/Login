      // Importación de funciones firebase
      import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
      import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
      import { getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

      // Configuracion de la aplicacion
      const firebaseConfig = {
        apiKey: "AIzaSyBkoFyuAy2tYibNXr7V7oQ8nTKqyNw34LE",
        authDomain: "login-eedfe.firebaseapp.com",
        projectId: "login-eedfe",
        storageBucket: "login-eedfe.appspot.com",
        messagingSenderId: "842902470511",
        appId: "1:842902470511:web:f11d22dd87a6c10105b29a",
      };

      // Inicializando Firebase
      const app = initializeApp(firebaseConfig);
      const auth = getAuth();
      const db = getDatabase(app);

      /*Funcion: Registro Usuario*/
      submitData.addEventListener("click", (e) => {
        e.preventDefault()

        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            set(ref(db, "users/" + user.uid), {
              email: email,
              password: password
            })
              .then(() => {
                alert('Usuario Registrado Exitosamente!');

              })
              .catch((error) => {
                alert(error);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('Verifica los datos');
          });
      });

      /*Función: Iniciar Sesión*/
      buttonLogin.addEventListener("click", (e) => {
        e.preventDefault()

        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          var lgDate = new Date();
          update(ref(db, "users/" + user.uid), {
            last_login: lgDate,
          })
            .then(() => {
              alert('Bienvenido...');

            })
            .catch((error) => {
              // The write failed...
              alert(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert('Verifica los datos');
        });
      })
