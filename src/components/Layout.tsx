import React from 'react';
import Header from "@/components/Header";
import {NextComponentType, NextPageContext} from "next/dist/shared/lib/utils";

const Layout = ({children}: any) => {
    return (
        <>
            <Header/>
            {children}
        </>
    );
};

export default Layout;