import React, {useState, useEffect, useRef} from 'react';
import useMarvelService from '../../services/service';

import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './charList.scss';

import PropTypes from 'prop-types';

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(180);
    const [loadingNewChars, setLoadingNewChars] = useState(true);
    const [charsCapReached, setCharsCap] = useState(false);


    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        requestCharacters(offset, true);   
    }, []);

    const requestCharacters = (offset, initial) => {
        initial ? setLoadingNewChars(false) : setLoadingNewChars(true)
 
        getAllCharacters(offset)
            .then(res => onFinishedLoading(res))
            .catch(setLoadingNewChars(false))
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
                <CSSTransition  
                timeout={500} 
                classNames="my-node">
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
                </CSSTransition>
            )
        })

        return (
            <ul className="char__grid" >
                <TransitionGroup component={null}>
                    {blocks}
                </TransitionGroup>
            </ul>
        )
    }

    const spinner = loading && !loadingNewChars ? <Spinner/> : null;
    const errorBlock = error ? <Error/> : null;
    const content = createContent(chars);

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