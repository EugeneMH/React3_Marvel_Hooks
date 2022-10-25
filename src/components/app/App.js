import {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

import Spinner from '../spinner/Spinner';

import './App.scss';


//I was training with dynamic imports. I know it's not necessary as this project is small
const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleCharLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));



const App = () => {

    // let location = useLocation();

    return (
        <Suspense fallback={<Spinner/>}>
            <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path="/" element={<MainPage className="page"/>}/>
                            <Route path="*" element={<Page404 className="page"/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/characters/:id" element={<SinglePage 
                                                                Component={SingleCharLayout} 
                                                                dataType='character'/>}/>
                            <Route path="/comics/:id" element={<SinglePage 
                                                                Component={SingleComicLayout} 
                                                                dataType='comic'/>}/>
                        </Routes> 
                    </main>
                </div>
            </Router>
        </Suspense>
    )
}

export default App;