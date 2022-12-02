import Error from "../error/Error"
import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <>
            <Error/>
            <p style={{textAlign: 'center', fontWeight: 'bold', fontSize:'24px'}}>This page does not exist</p>
            <Link
            style={{display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize:'24px', textDecoration: 'underline', marginTop: '15px'}}
            to='/'
            >Return to the main page</Link>
        </>
    )
}

export default Page404;