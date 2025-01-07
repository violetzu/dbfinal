// Sidebar.jsx
import React from 'react';
import { menuConfig } from '../menuConfig';

function Sidebar({ selected, onMenuClick }) {
  const menus = Object.entries(menuConfig);

  return (
    <div className="sidebar">
      {menus.map(([key, value]) => (
        <div
          key={key}
          className={`menu-item ${key === selected ? 'active' : ''}`}
          onClick={() => onMenuClick(key)}
        >
          {value.label} {/* 顯示配置中的 label */}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;

