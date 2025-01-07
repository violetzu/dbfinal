// App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopMenu from './components/TopMenu';
import Content from './components/Content';
import './App.css';

function App() {
  const [mainMenu, setMainMenu] = useState('Employee'); // 預設主選單
  const [subMenu, setSubMenu] = useState('search');     // 預設次選單

  const handleMainMenuClick = (menuKey) => {
    setMainMenu(menuKey);
    setSubMenu('search'); // 重置次選單為預設值
  };

  const handleSubMenuClick = (subKey) => {
    setSubMenu(subKey);
  };

  return (
    <div className="app">
      <Sidebar selected={mainMenu} onMenuClick={handleMainMenuClick} />
      <div className="main">
        <TopMenu
          mainMenu={mainMenu}
          selected={subMenu}
          onSubMenuClick={handleSubMenuClick}
        />
        <Content mainMenu={mainMenu} subMenu={subMenu} />
      </div>
    </div>
  );
}

export default App;
