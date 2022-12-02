import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '../skeleton/Skeleton'
import Error from '../error/Error';
import './comicsList.scss';

import useMarvelService from '../../services/service';

const setListContent = (process, Component, loadingNewComics, skeleton) => {
    switch (process) {
        case 'waiting': 
            return skeleton;
        case 'loading':
            return loadingNewComics ? <><Component/>{skeleton}</> : skeleton;
        case 'error':
            return <Error/>;
        case 'confirmed':
            return <Component/>;
        default: 
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {

    const [comicsCapReached, setComicsCap] = useState(false);
    const [loadingNewComics, setLoadingNewComics] = useState(false);
    const [comics, setComics] = useState([])
    const [offset, setOffset] = useState(10)

    const {process, setProcess, getAllComics, clearError} = useMarvelService();

    useEffect(() => {
        requestComics(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const requestComics = (offset, initial) => {
        clearError();
        initial ? setLoadingNewComics(false) : setLoadingNewComics(true);

        getAllComics(offset)
        .then(res => {
            onFinishedLoading(res)})
        .then(() => setProcess('confirmed'))
    }

    const onFinishedLoading = (newComics) => {
        let ended = false;
        if (newComics.length < 8) ended = true;

        setComics(comics => [...comics, ...newComics]);
        setOffset(offset => offset + 8);
        setLoadingNewComics(false);
        setComicsCap(ended);
    }

    const createContent = (arrComics) => {

        return arrComics.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.thumbnail} className="comics__item-img"/>
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{item.price + '$'}</div>
                    </Link>
                </li>
            )
        })
    }

    const createLoading = () => {
        return [...Array(8)].map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Skeleton/>
                </li>
            )
        })
    }

    const loading = createLoading();
    
    return (
        <>

            <div className="comics__list">   
                <ul className="comics__grid">
                {setListContent(process, () => createContent(comics), loadingNewComics, loading)}
                </ul>
                <button className="button button__main button__long" disabled={loadingNewComics}>
                    <div className="inner" 
                    onClick={() => requestComics(offset, false)}
                    style={{'display' : comicsCapReached ? 'none' : 'block'}}>load more</div>
                </button>
            </div>
        </>
    )
}

export default ComicsList;