'use client'

import React from "react";
import { usePathname } from 'next/navigation'

export default function Layout({children} : {children: React.ReactDOM}){
    const pathName = usePathname();
    return(
        <>
            <p>
                You are in authentication pages {pathName}
            </p>
            {children}
        </>
    )
}