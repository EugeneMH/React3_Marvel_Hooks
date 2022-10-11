import {Component} from 'react';
import MarvelService from '../../services/service';

import Skeleton from '../skeleton/Skeleton';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';

import PropTypes from 'prop-types';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    service = new MarvelService();

    componentDidMount() {
        this.createCharacter();
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.createCharacter();
        }
    }
    
    createCharacter() {

        const {id} = this.props;

        if(!id) {
            return;
        }

        this.onLoading();

        this.service.getCharacter(id)   
        .then(res => this.onFinishedLoading(res))
        .catch(this.onError)
    }

    onFinishedLoading = (char) => {
        this.setState({
            loading:false,
            char : char
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onLoading = () => {
        this.setState({
            loading: true
        })
    }

    render() {
        const {loading, char, error} = this.state;

        const skeleton = !(loading || char || error) ? <Skeleton/> : null;
        const errorMessage = error ? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <Content char={this.state.char}/> : null

        return (
            <div className="char__info">
                {skeleton}
                {content}
                {errorMessage}
                {spinner}
            </div>
        )
    }
}

const Content = ({char}) => {
    
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit':'cover'};

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit':'contain'};
    }
    
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>

            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "Unfortunately, we can't find the comics for this character"}
                {comics.map( (item, i) => {                
                    if (i < 10) {
                        return (
                            <li className="char__comics-item" key={i}>
                                {item.name}
                            </li>
                        )
                    } else return null;
                })}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    id: PropTypes.number
}

export default CharInfo;