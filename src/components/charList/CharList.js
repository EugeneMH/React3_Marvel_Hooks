import React, {Component} from 'react';
import MarvelService from '../../services/service';

import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './charList.scss';

import PropTypes from 'prop-types';

class CharList extends Component {
    state = {
        chars : [],
        loading: true,
        error: false,
        offset: 180,
        loadingNewChars: false,
        charsCapReached: false,
        bottomReached: false,
    }
    //this module was initially created with an intention to add pagination - on click of the button, the list of the character had to be expanded.
    //but in order to have some more practice I added pagination on scroll, so now it has both listeners

    service = new MarvelService();

    componentDidMount() {
        this.requestCharacters();
        window.addEventListener('scroll', this.checkIfBottom)
        window.addEventListener('scroll', this.newCharsOnScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.newCharsOnScroll);
        window.removeEventListener('scroll', this.newCharsOnScroll);
    }

    newCharsOnScroll = () => {
        const {bottomReached, loadingNewChars, charsCapReached} = this.state;

        if (bottomReached && !loadingNewChars && !charsCapReached) {
            this.requestCharacters(this.state.offset);
        }
    }

    checkIfBottom = () => {
        if (window.scrollY + document.documentElement.clientHeight >= document.body.scrollHeight) {
            this.setState({
                bottomReached: true
            })
        }
    }

    requestCharacters(offset) {
        this.onLoading();
        this.service.getAllCharacters(offset)
            .then(res => this.onFinishedLoading(res))
            .catch(this.onError)
    }

    onLoading = () => {
        this.setState({
            loadingNewChars: true
        })
    }

    onFinishedLoading = (newCharacters) => {

        let ended = false;
        if (newCharacters.length < 9) ended = true;

        this.setState(({chars, offset}) => ({
            chars: [...chars, ...newCharacters],
            loading: false,
            offset : offset + 9,
            loadingNewChars: false,
            charsCapReached: ended,
            bottomReached: false
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }


    refsItems = [];
    
    setRef = (elem) => {
        this.refsItems.push(elem);
    };

    focusOnItem = (i) => {
       this.refsItems.forEach(item => {
           item.classList.remove('char__item_selected');
       })
       this.refsItems[i].classList.add('char__item_selected');
       this.refsItems[i].focus();
    }

    createContent() {
        const blocks = this.state.chars.map((item, i) => {

            let imgStyles = {'objectFit':'cover'};

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ) {
                imgStyles = {'objectFit':'unset'}
            }

            return (
                <li className="char__item" 
                tabIndex={0}
                key={item.id}
                ref={this.setRef}
                onClick={() => {
                    this.props.onSelectChar(item.id);
                    this.focusOnItem(i)
                    }}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        this.props.onSelectChar(item.id);
                        this.focusOnItem(i);
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

    render() {

        const {loading, error, offset, loadingNewChars, charsCapReached} = this.state

        const spinner = loading ? <Spinner/> : null;
        const errorBlock = error ? <Error/> : null;
        const content = !(loading || error) ? this.createContent() : null;

        return (
            <div className="char__list">
                {spinner}
                {errorBlock}
                {content}
                <button className="button button__main button__long"
                        onClick={() => this.requestCharacters(offset)}
                        disabled={loadingNewChars}
                        style={{'display' : charsCapReached ? 'none' : 'block'}}
                        tabIndex={0}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onSelectChar: PropTypes.func.isRequired
}

export default CharList;