import React, {useState, useEffect, useRef, useMemo} from 'react';
import useMarvelService from '../../services/service';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './charList.scss';

import PropTypes from 'prop-types';

const setListContent = (process, Component, loadingNewChars) => {
    switch (process) {
        case 'waiting': 
            return <Spinner/>;
        case 'loading':
            return loadingNewChars ? <Component/> : <Spinner/>;
        case 'error':
            return <Error/>;
        case 'confirmed':
            return <Component/>;
        default: 
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {

    const {getAllCharacters, process, setProcess} = useMarvelService();

    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(180);
    const [loadingNewChars, setLoadingNewChars] = useState(true);
    const [charsCapReached, setCharsCap] = useState(false);

    useEffect(() => {
        requestCharacters(offset, true);   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const requestCharacters = (offset, initial) => {
        initial ? setLoadingNewChars(false) : setLoadingNewChars(true)
 
        getAllCharacters(offset)
            .then(res => onFinishedLoading(res))
            .then(() => setProcess('confirmed'))
    }

    const onFinishedLoading = (newCharacters) => {

        let ended = false;
        if (newCharacters.length < 9) ended = true;

        setChars(chars => [...chars, ...newCharacters]);
        setOffset(offset => offset + 9);
        setLoadingNewChars(false);
        setCharsCap(ended);
    }

    const refsItems = useRef([]);

    const focusOnItem = (id) => {
       refsItems.current.forEach(item => {
           item.classList.remove('char__item_selected');
       })
       refsItems.current[id].classList.add('char__item_selected');
       refsItems.current[id].focus();
    }

    const createContent = (arr) => {

        const blocks = arr.map((item, i) => {

            let imgStyles = {'objectFit':'cover'};

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ) {
                imgStyles = {'objectFit':'unset'}
            }
            
            return (
                <li className="char__item" 
                key={item.id}
                tabIndex={0}
                ref={el => refsItems.current[i] = el}
                onClick={() => {
                    props.onSelectChar(item.id);
                    focusOnItem(i)
                    }}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        props.onSelectChar(item.id);
                        focusOnItem(i);
                    }
                }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyles}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid" >
                {blocks}
            </ul>
        )
    }

    const content = useMemo(() => {
        return setListContent(process, () => createContent(chars), loadingNewChars)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [process])

    return (
        <div className="char__list">
            {content}
            <button className="button button__main button__long"
                    onClick={() => requestCharacters(offset, false)}
                    disabled={loadingNewChars}
                    style={{'display' : charsCapReached ? 'none' : 'block'}}
                    tabIndex={0}>
                <div className="inner">load more</div>
            </button>
        </div>
        )
}

CharList.propTypes = {
    onSelectChar: PropTypes.func.isRequired
}

export default CharList;