import { Metadata } from "next";
import BrandMenu from '@/app/components/DB_Components/brand_display';
import Link from 'next/link';
import Image from 'next/image';
import MainNav from '@/app/components/Desing_Components/login_button';
import { MdCameraRoll } from "react-icons/md";
import BrandReco from '@/app/components/DB_Components/brand_recomend';
import SearchMenu from '@/app/components/Desing_Components/search_menu';

export const metadata: Metadata = {
    title: 'Configuracion de camaras',
    description: 'que fotografias toma esta configuracion de camara',
    keywords: 'camaras, sony, canon, nikon, configuracion'
}

const CounterPage = () => {

    return (
        <main>
            <div className="min-h-screen bg-black">

                <header className="sticky top-0 z-50 bg-black shadow-sm">
                    <div className="container mx-auto px-4 py-8 flex items-center">
                        <div className="mr-auto md:w-48 flex-shrink-0">

                            <div className="flex items-center">
                                <MdCameraRoll className="text-yellow-500 text-6xl " />
                                <span className="text-white text-3xl font-serif font-family:Times">FilmBay</span>
                            </div>

                        </div>

                        <div className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-300 rounded-md hidden lg:flex items-center">

                            <SearchMenu />

                        </div>

                        <div className="ml-auto md:w-48 hidden sm:flex flex-col place-items-end">
                            <span className="font-bold md:text-3">BUSCA TU CONFIGURACION IDEAL</span>
                            <span className="font-semibold text-sm text-yellow-400">Film Bay</span>
                        </div>

                        <nav className="contents">

                            <ul className="ml-12 xl:w-48 flex items-center justify-end space-x-4">

                                <MainNav />


                            </ul>
                        </nav>
                    </div>

                    <hr />

                </header>

                <section className=" bg-gray-500 py-2" style={{ backgroundImage: 'url("https://img.freepik.com/foto-gratis/camaras-casetes-pelicula-tablero-madera_23-2147852415.jpg?t=st=1714697926~exp=1714701526~hmac=f5bae521bf658fef9dbde29234b3861cb00ffbd45363e8cc0a34b3bd3219b378&w=1380")', backgroundSize: 'cover', backgroundPosition: 'center' }}>

                    <div className="container mx-auto px-4 flex flex-col lg:flex-row bg-transparent-20 rounded-2xl relative">
                        <div className="container mx-auto px-4 flex flex-col lg:flex-row rounded-2xl relative">
                            <div className="juice relative lg:w-2/3 rounded-xl bg-secondary-lite bg-cover p-8 md:p-16 m-4 bg-transparent">
                                <div className="shadow-xl rounded-lg mb-6 tracking-wide max-w-lg max-h-lg relative m-2 bg-black bg-opacity-90">
                                    <div className="relative">
                                        <div className="bg-white bg-opacity-75 p-4 rounded-lg shadow-xl">
                                            <iframe
                                                height={600}
                                                className="w-full h-full"
                                                src="https://www.youtube.com/embed/BuEE8NdV0dc?si=2uvhcuEspUFdES7h&amp;controls=0"
                                                title="YouTube video player"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                
                                            ></iframe>
                                        </div>

                                        <div className="px-4 py-2 z-10 relative mt-4 font-serif">
                                            <h2 className="font-bold text-xl text-white tracking-normal ml-2">Encuentra tu rig</h2>
                                            <p className="text-sm text-white px-2 mr-1 mb-4 mt-2">
                                            ¡Construye tu equipo perfecto en FilmBay! Encuentra las mejores herramientas 
                                            lentes, cámaras, y marcas líderes. ¡Explora y busca tu configuracion ideal!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className="juice2 mt-0 lg:mt-0 lg:ml-6 lg:w-1/3 rounded-xl bg-primary-lite bg-cover p-8 md:p-16 ">
                            <div className=' bg-yellow-50 bg-opacity-60 rounded-lg p-8 shadow-2xl'>
                                <BrandReco />
                            </div>
                        </div>
                    </div>


                </section>

                <section className="container mx-auto pt-12 bg-black" >

                    <div className="relative flex items-end font-bold">

                        <h2 className="text-2xl">MARCAS</h2>

                    </div>
                    <div className="mt-10">

                        <BrandMenu />

                    </div>
                </section>

                <footer className="mt-16 h-48">
                    <div className="container mx-auto py-5">
                        <a href="https://www.instagram.com/te.degato/">&copy; 2025 <span className="font-bold">zarcolini</span> All Rights Reserved</a>
                    </div>
                </footer>

            </div>
        </main>

    )
}


export default CounterPage;
