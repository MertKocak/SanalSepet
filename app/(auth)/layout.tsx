import Logo from '@/components/Logo'
import React from 'react'


interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayoutProps = ({ children }: AuthLayoutProps) => {
    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <Logo></Logo>
            {children}
        </div>
    )
}

export default AuthLayoutProps