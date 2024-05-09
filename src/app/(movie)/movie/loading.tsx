import cStyles from '../../styles/common.module.css'

export default function Loading() {
    return (
        <main className={`vh-100 d-flex justify-content-center align-items-center ${cStyles["page-background-color"]}`}>
            <div className={`${cStyles["h2-css"]}`}>
                Loading your movies...
            </div>
        </main>
    );
}