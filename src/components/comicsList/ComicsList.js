import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '../skeleton/Skeleton'
import Error from '../error/Error';

import './comicsList.scss';

import useMarvelService from '../../services/service';

const ComicsList = () => {

    const [comicsCapReached, setComicsCap] = useState(false);
    const [loadingNewComics, setLoadingNewComics] = useState(false);
    const [comics, setComics] = useState([])
    const [offset, setOffset] = useState(10)

    const {loading, error, getAllComics, clearError} = useMarvelService();

    useEffect(() => {
        requestComics(offset, true);
    }, [])

    const requestComics = (offset, initial) => {
        clearError();
        initial ? setLoadingNewComics(false) : setLoadingNewComics(true);

        getAllComics(offset)
        .then(res => {
            onFinishedLoading(res)})
        .catch(setLoadingNewComics(false))
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

    const content = createContent(comics);
    const skeleton = loading ? createLoading() : null;
    const errorMessage = error && !loading ? <Error/> : null;
    

    return (
        <>
            {errorMessage}
            <div className="comics__list">   
                <ul className="comics__grid">
                    {content}
                    {skeleton}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner" 
                    onClick={() => requestComics(offset, false)}
                    disabled={loadingNewComics}
                    style={{'display' : comicsCapReached ? 'none' : 'block'}}>load more</div>
                </button>
            </div>
        </>
    )
}

export default ComicsList;