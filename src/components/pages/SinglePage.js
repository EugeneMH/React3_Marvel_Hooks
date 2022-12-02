import AppBanner from '../appBanner/AppBanner';

import setContent from '../../utils/setContent';

import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/service';
import { useEffect, useState } from 'react';

const SinglePage = ({Component, dataType}) => {

    const {id} = useParams();

    const { process, setProcess, clearError, getCharacterByName, getComic} = useMarvelService();
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
                .then(() => setProcess('confirmed'));
                break;
            case 'comic': 
                getComic(id).then(res => setData(res))
                .then(() => setProcess('confirmed'));
            }
        
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;