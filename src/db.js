import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAQsUOc-7I9hDWU0vDG1JHACB6jsqlhD5E",
  authDomain: "project-vkr.firebaseapp.com",
  projectId: "project-vkr",
  storageBucket: "project-vkr.appspot.com",
  messagingSenderId: "685955112265",
  appId: "1:685955112265:web:28dade867c32f7f0b7ce98",
  measurementId: "G-Z24FKDC9N7"
}

 export const db = firebase
    .initializeApp(firebaseConfig)
    .firestore()
 


// const { db } = firebase
//     .initializeApp(firebaseConfig)
//     .firestore()
// export { db }

const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }











