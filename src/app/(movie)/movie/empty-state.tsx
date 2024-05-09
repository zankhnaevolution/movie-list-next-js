import Link from 'next/link';
import cStyles from '../../styles/common.module.css'

export default function EmptyState() {
    return (
        <main className={`vh-100 d-flex align-items-center justify-content-center flex-column gap-2 ${cStyles["page-background-color"]}`}>
            <div className={`${cStyles["h2-css"]} ${'empty-state-heading'}`}>
                Your movie list is empty
            </div>
            <div>
                <Link href={"/movie/create"}>
                    <button className={`btn ${cStyles["body-regular"]}`} style={{
                        textDecoration: "none",
                        backgroundColor: "#2BD17E",
                        color: 'white'
                    }}>
                        Add a new movie
                    </button>
                </Link>
            </div>
        </main>
    );
}