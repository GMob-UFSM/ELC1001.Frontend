import React from 'react';
import { StatusBar } from 'react-native'

import StackRoutes from './Navigation/routes';

export default function App() {
    return (
        <>
            <StatusBar backgroundColor="#C58882" />
            <StackRoutes />
        </>

    )
}