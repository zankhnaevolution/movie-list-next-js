import React from "react";

export default function SingleFunction({ params }: { params: { id: string }}){
    return(
        <>
            Inside Single Movie { params.id }
        </>
    )
}