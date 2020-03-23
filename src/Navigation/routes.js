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
import Camisas from '../telas/guarda-roupas/camisas'
import Calças from '../telas/guarda-roupas/calças'
import Sapatos from '../telas/guarda-roupas/sapatos'

import DrawerScreen from './drawerRoutes'

const DrawerRoutes = createDrawerNavigator({
 
    
    Login: Login ,
    MenuPrincipal: MainMenu,
    GuardaRoupa: GuardaRoupa, 
    Perfil: Perfil,
    Sobre: Sobre,
    Ajuda: Ajuda, 

    MainMenu: MainMenu,
    Looks: Looks ,
    ComporLook: ComporLook,
    Calendar: Calendar,

    Camisas: Camisas,
    Sapatos: Sapatos,
    Calças: Calças



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
    Camisas: { screen: Camisas },
    Calças: { screen: Calças },
    Sapatos: { screen: Sapatos },
 
},  
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: { 
                backgroundColor: "#C58882"
            },
            headerLeft: <Icon.Button  name="menu" size={30} color="white" backgroundColor="#C58882" onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }/>,
        })
    }
);
  
const App = createAppContainer(StackRoutes);

export default App;