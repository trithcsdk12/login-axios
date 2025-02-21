// src/layouts/MainLayout.js
import React from 'react';
import Nav from '../views/nav/nav';

export default function MainLayout({ children }) {
  return (
    <div>
      <Nav />
      <div>{children}</div>
    </div>
  );
}
