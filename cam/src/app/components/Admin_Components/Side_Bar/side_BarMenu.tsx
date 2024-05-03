import React from 'react';

const SidebarLayout = () => {
  return (
    <div id="sidebar" className="lg:block hidden bg-gray-800 w-64 h-screen fixed rounded-none border-none">
      <div className="p-4 space-y-4">
        <a href="/dashboard/mainpage" aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-gray-600 to-gray-800">
          <i className="fas fa-home text-white"></i>
          <span className="-mr-1 font-medium">INICIO</span>
        </a>
        <a href="/components/Admin_Components/Brand_Components/" className="px-4 py-3 flex items-center space-x-4 rounded-md text-white group">
          <i className="fas fa-gift"></i>
          <span>MARCAS</span>
        </a>
        <a href="/components/Admin_Components/Camera_Components/" className="px-4 py-3 flex items-center space-x-4 rounded-md text-white group">
          <i className="fas fa-store"></i>
          <span>CAMARAS</span>
        </a>
        <a href="/components/Admin_Components/Lens_Components/" className="px-4 py-3 flex items-center space-x-4 rounded-md text-white group">
          <i className="fas fa-wallet"></i>
          <span>LENTES</span>
        </a>
        <a href="/components/Admin_Components/Media_Components/" className="px-4 py-3 flex items-center space-x-4 rounded-md text-white group">
          <i className="fas fa-exchange-alt"></i>
          <span>MEDIA</span>
        </a>
      </div>
    </div>
  );
};

export default SidebarLayout;
