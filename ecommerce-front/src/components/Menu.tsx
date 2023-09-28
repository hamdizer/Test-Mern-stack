// src/components/Menu.tsx
import React from 'react';

const Menu = () => {
  const menuItems = [
    { id: 1, title: 'Register', link: '/register' },
    { id: 2, title: 'Login', link: '/login' },
  ];

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex justify-end space-x-4">
        {menuItems.map((item) => (
          <li key={item.id}>
            <a href={item.link} className="hover:text-gray-400">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;