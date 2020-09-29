import React from 'react';
import { StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import StackRoutes from './Navigation/routes';

export default function App() {
    return (
        <>
            <StatusBar  backgroundColor="#C58882"/>
            <StackRoutes />
        </>

    )
}