import React from 'react'
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather'

import ComporLook from '../telas/comporLook'
import Looks from '../telas/looks'
import MainMenu from '../telas/menuPrincipal'  
import Calendar from '../telas/calendario'

import Login from '../telas/auth'
import SignIn from '../telas/auth/signin'
import SignUp from '../telas/auth/signup'

import Perfil from '../telas/perfil'
import Sobre from '../telas/sobre'
import Ajuda from '../telas/ajuda'

import GuardaRoupa from '../telas/guarda-roupas'
import Camera from '../telas/guarda-roupas/adicionarPeça/camera'
import Acrescentar from '../telas/guarda-roupas/adicionarPeça/acrescentar'
import Publicar from '../telas/guarda-roupas/adicionarPeça/publicar'
import Display from '../telas/guarda-roupas/display-peça'

import DrawerScreen from './drawerRoutes'
import Header from './tabBar'

const DrawerRoutes = createDrawerNavigator({
 
    MenuPrincipal: MainMenu,
    GuardaRoupa: GuardaRoupa, 
    Perfil: Perfil,
    Sobre: Sobre,
    Ajuda: Ajuda, 

    MainMenu: MainMenu,
    Looks: Looks,
    ComporLook: ComporLook,
    Calendar: Calendar,

    Camera: Camera,
    Acrescentar: Acrescentar,
    Publicar: Publicar,
    Display: Display,


}, {
    contentComponent: DrawerScreen,
    },  
 
);

const StackRoutes = createStackNavigator({

    DrawerRoutes: { screen: DrawerRoutes },
    Login: { screen: Login },
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp },
    MainMenu: { screen: MainMenu },
    Looks: { screen: Looks },
    ComporLook: { screen: ComporLook },
    Calendar: { screen: Calendar },
    GuardaRoupa: { screen: GuardaRoupa },
    Camera: { screen: Camera },
    Acrescentar: { screen: Acrescentar },
    Publicar: { screen: Publicar },
    Display: { screen: Display },
    Header: { screen: Header },
    
 
},  
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: { 
                backgroundColor: "#C58882"
            },
            headerLeft: <Icon.Button  name="menu" size={30} color="white" backgroundColor="#C58882" onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }/>,
            headerRight: <Header />
            
        })
    }
);
  
const App = createAppContainer(StackRoutes);

export default App;