import AppBanner from '../appBanner/AppBanner';

import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/service';
import { useEffect, useState } from 'react';

const SinglePage = ({Component, dataType}) => {

    const {id} = useParams();

    const {loading, error, clearError, getCharacterByName, getComic} = useMarvelService();
    const [data, setData] = useState([]);

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();
        
        // eslint-disable-next-line default-case
        switch (dataType) {
            case 'character':
                getCharacterByName(id).then(res => setData(res))
                break;
            case 'comic': 
                getComic(id).then(res => setData(res));
            }
        
    }

    const content = !loading && !error ? <Component data={data}/> : null;
    const loadingMessage = loading && !error ? <Spinner/> : null;
    const errorMessage = !loading && error ? <Error/> : null;

    return (
        <>
            <AppBanner/>
            {content}
            {loadingMessage}
            {errorMessage}
        </>
    )
}

export default SinglePage;