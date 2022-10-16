// Firebase config for BeSpoked Bike Trail
const config = {
  apiKey: 'AIzaSyBkgsjmmAGXXd3yfYpRic8CkYB-TPhPBwg',
  authDomain: 'bespoked-bike-trail.firebaseapp.com',
  projectId: 'bespoked-bike-trail',
  storageBucket: 'bespoked-bike-trail.appspot.com',
  messagingSenderId: '604956870448',
  appId: '1:604956870448:web:ea7a26398ab55101ca2af5',
  measurementId: 'G-4HZG95XC1L'
};

const GetFirebaseConfig = () => {
  if (!config || !config.apiKey) {
    throw new Error(
      'No Firebase configuration object provided.\nAdd the proper configurations.'
    );
  } else {
    return config;
  }
};

export default GetFirebaseConfig;
