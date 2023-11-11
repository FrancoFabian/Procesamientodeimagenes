import React from 'react';
import './App.css';
import './components/SideMenu'
import SideMenu from './components/SideMenu';
import MenuTop from './components/MenuTop';
import { ModalProvider } from './components/context/ModalProvider';
import SubMenus from './components/SubMenus';
import CanvasPro from './components/CanvasPro';
function App() {
  return (
    <div className="App">
      <ModalProvider>
      <MenuTop/>
      <SideMenu></SideMenu>
      <SubMenus/>
      
      </ModalProvider>
      

    </div>
  );
}

export default App;

