


import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from './src/navigation/AppNavigation';
import { Provider as StoreProvider } from 'react-redux'
// import store from './src/store/index'

// modify the App component
export default function App() {
  return (
    // <StoreProvider store={store}>
    //    <StatusBar   barStyle={'dark-content'} />
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    // </StoreProvider>
  )
}