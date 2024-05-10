'use client'

import cStyles from '../../styles/common.module.css'

export default function Loading() {
    return (
        <main className={`vh-100 d-flex justify-content-center align-items-center ${cStyles["page-background-color"]}`}>
            <div className="spinner-border" style={{
                width: "5rem",
                height: "5rem"
            }}>
                <span className="sr-only"></span>
            </div>
        </main>
    );
}
