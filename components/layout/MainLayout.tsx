import React from 'react'
import { ToastContainer } from 'react-toastify';
import { Header } from './Header';
import { Footer } from './Footer';

export const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
            <ToastContainer position='bottom-right' theme='light' />
        </div>
    )
}
