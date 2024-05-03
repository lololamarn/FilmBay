import React from 'react';
import SidebarLayout from './Side_Bar/side_BarMenu';
import { MdCameraRoll } from 'react-icons/md';

const Page = () => {
    return (
        <div >
            <SidebarLayout />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl text-center text-white mb-6 font-serif">¡Bienvenido a FilmBay Administrador!</h1>
                <div className="flex items-center">
                    <MdCameraRoll className="text-yellow-500 text-8xl mr-4" />
                    <span className="text-white text-7xl font-serif">FilmBay</span>
                </div>
            </div>


        </div>
    );
};

export default Page;
