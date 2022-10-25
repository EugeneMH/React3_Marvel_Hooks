import {useState} from 'react';
import {Helmet} from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";    
import CharSearch from '../charSearch/CharSearch';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [charSelectedId, setChar] = useState(null);

    const onSelectChar = (id) => {
        setChar(id)
    }

    return (
        <>
            <Helmet>
                <title>Marvel information portal</title>
                <meta name="description" content="Marvel information portal" />
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onSelectChar={onSelectChar}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <div style={{position: '-webkit-sticky',
                                position: 'sticky',
                                top:'0px'}}>
                        <ErrorBoundary>
                            <CharInfo id={charSelectedId}/>
                            <CharSearch/>
                        </ErrorBoundary> 
                    </div>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;