import {useState, useEffect} from 'react';
import MarvelService from '../../services/service';

import Skeleton from '../skeleton/Skeleton';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';

import PropTypes from 'prop-types';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const service = new MarvelService();

    useEffect( () => {
        createCharacter();
    }, [props.id] )

    // componentDidUpdate(prevProps) {
    //     if (this.props.id !== prevProps.id) {
    //         this.createCharacter();
    //     }
    // }
    
    const createCharacter = () => {

        const {id} = props;

        if(!id) {
            return;
        }

        onLoading();

        service.getCharacter(id)   
        .then(res => onFinishedLoading(res))
        .catch(onError)
    }

    const onFinishedLoading = (char) => {
        setLoading(false);
        setChar(char);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const onLoading = () => {
        setLoading(true);
    }

    const skeleton = !(loading || char || error) ? <Skeleton/> : null;
    const errorMessage = error ? <Error/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <Content char={char}/> : null

    return (
        <div className="char__info">
            {skeleton}
            {content}
            {errorMessage}
            {spinner}
        </div>
    )

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