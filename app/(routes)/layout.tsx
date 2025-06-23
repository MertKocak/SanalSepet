import React from 'react'
import Footer from './_components/Footer';
import Navbar from './_components/Menu/Navbar';

interface RoutesLayoutProps {
    children: React.ReactNode;
}

/***
    * ff6700
    * 202020
    * f8f9fa
    */

const RoutesLayout = ({ children }: RoutesLayoutProps) => {
    return (
        <div style={{backgroundColor: "#fffeff"}}>
            <Navbar />
            <div className='min-h-screen'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default RoutesLayout