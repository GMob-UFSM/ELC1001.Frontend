import axios from 'axios';

/* Endereços para cada emulador/simulador:
** Genymotion:              http://10.0.3.2:3333/
** Emulador Android Studio: http://10.0.2.2:3333/
** Simulador IOS:           http://localhost:3333/
*/

const api = axios.create({
  baseURL: 'https://db6hs1ctv1.execute-api.us-east-1.amazonaws.com/dev',
});

export default api;