import React from 'react';
import './App.css';
import './components/SideMenu'
import SideMenu from './components/SideMenu';
import MenuTop from './components/MenuTop';
import { ModalProvider } from './components/context/ModalProvider';
import SubMenus from './components/SubMenus';
import CanvasPro from './components/CanvasPro';
import { LoadingProvider } from './components/providers/LoadingContext';
import { LoadingComponent } from './components/providers/LoadingComponent';
import MenuCanvas from './components/MenuCanvas';
function App() {
  return (
    <div className="App">
      <ModalProvider>
      <MenuTop/>
      
      <SideMenu></SideMenu>
      <LoadingProvider> 
        {/*<LoadingComponent></LoadingComponent>*/}
        <SubMenus/>
        
        
        </LoadingProvider>
       <CanvasPro/> 
     <MenuCanvas></MenuCanvas>

      
     
      
      </ModalProvider>
      

    </div>
  );
}

export default App;

