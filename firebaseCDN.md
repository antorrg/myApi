```
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB6lP4ea-5SXoPqOUA6HnZh8tfzYb6QY3M",
    authDomain: "apifirexperimental.firebaseapp.com",
    projectId: "apifirexperimental",
    storageBucket: "apifirexperimental.appspot.com",
    messagingSenderId: "675865939467",
    appId: "1:675865939467:web:14ca2d7df9c4e6a3bb410e",
    measurementId: "G-7R7L96GP72"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
```