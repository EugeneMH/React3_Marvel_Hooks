import {Helmet} from "react-helmet";

import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import ComicsList from '../comicsList/ComicsList';
import AppBanner from '../appBanner/AppBanner';

import { Routes, Route } from 'react-router-dom';

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <title>Marvel Comics list</title>
                <meta name="description" content="List of Marvel Comics" />
            </Helmet>
            <AppBanner/>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<ComicsList/>}/>
                </Routes>
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;