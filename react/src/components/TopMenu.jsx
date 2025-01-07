// TopMenu.jsx
import React from 'react';
import { menuConfig } from '../menuConfig';

function TopMenu({ mainMenu, selected, onSubMenuClick }) {
  const subMenus = menuConfig[mainMenu]?.subMenu || [];

  return (
    <div className="top-menu">
      {subMenus.map((sub) => (
        <div
          key={sub.key}
          className={`sub-menu-item ${sub.key === selected ? 'active' : ''}`}
          onClick={() => onSubMenuClick(sub.key)}
        >
          {sub.label}
        </div>
      ))}
    </div>
  );
}

export default TopMenu;
