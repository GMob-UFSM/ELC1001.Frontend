import 'react-native-gesture-handler'

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

import * as Sentry from "@sentry/react-native";

Sentry.init({
    dsn: "https://35c5da2f567b405b8eba4e1cc4b3ec88@o473722.ingest.sentry.io/5508986",
    enableAutoSessionTracking: true,
    sessionTrackingIntervalMillis: 10000,
});

AppRegistry.registerComponent(appName, () => App);
