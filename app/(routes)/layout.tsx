import React from 'react'
import Footer from './_components/Footer';
import Navbar from './_components/Menu/Navbar';

interface RoutesLayoutProps {
    children: React.ReactNode;
}

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