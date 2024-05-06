import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default function SingleFunction({ params }: { params: { id: string }}){
    // notFound()
    
    return(
        <>
            Inside Single Movie { params.id }
            <Link href="/movie"> Go Back</Link>
        </>
    )
}