import React, {useState, useEffect, useRef} from 'react';
import MarvelService from '../../services/service';

import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './charList.scss';

import PropTypes from 'prop-types';

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(180);
    const [loadingNewChars, setLoadingNewChars] = useState(true);
    const [charsCapReached, setCharsCap] = useState(false);

    //this module was initially created with an intention to add pagination - on click of the button, the list of the character had to be expanded.
    //but in order to have some more practice I added pagination on scroll, so now it has both listeners

    const service = new MarvelService();

    const newCharsOnScroll = () => {
        if (window.scrollY + document.documentElement.clientHeight >= document.body.scrollHeight) {
            setLoadingNewChars(true);
        }
    }

    useEffect(() => {
        if (loadingNewChars && !charsCapReached) {
            requestCharacters();
        }
    }, [loadingNewChars]);

    useEffect(() => {
        window.addEventListener('scroll', newCharsOnScroll)
        return () => {
            window.removeEventListener('scroll', newCharsOnScroll);
        }
    })

    const requestCharacters = () => {
        // setLoadingNewChars(true);
        service.getAllCharacters(offset)
            .then(res => onFinishedLoading(res))
            .catch(onError)
    }

    const onFinishedLoading = (newCharacters) => {

        let ended = false;
        if (newCharacters.length < 9) ended = true;

        setChars(chars => [...chars, ...newCharacters]);
        setLoading(false);
        setOffset(offset => offset + 9);
        setLoadingNewChars(false);
        setCharsCap(ended);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
        setLoadingNewChars(false);
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
                tabIndex={0}
                key={item.id}
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

    const spinner = loading ? <Spinner/> : null;
    const errorBlock = error ? <Error/> : null;
    const content = !(loading || error) ? createContent(chars) : null;

    return (
        <div className="char__list">
            {spinner}
            {errorBlock}
            {content}
            <button className="button button__main button__long"
                    onClick={() => requestCharacters(offset)}
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