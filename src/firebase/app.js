import { initializeApp } from 'firebase/app';
import GetFirebaseConfig from './config';

// Initialize Firebase
const app = initializeApp(GetFirebaseConfig());

export default app;