import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBpVBuWRHDkWh07JhGgnxLVIAWLFgGcPLM",
    authDomain: "isp20-828cd.firebaseapp.com",
    projectId: "isp20-828cd",
    storageBucket: "isp20-828cd.appspot.com",
    messagingSenderId: "834409981790",
    appId: "1:834409981790:web:890535628e8164030911cf",
    measurementId: "G-B5J846TVLQ"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();