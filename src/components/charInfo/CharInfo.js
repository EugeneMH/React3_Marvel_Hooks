/* eslint-disable no-unreachable */
import {useState, useEffect} from 'react';
import useMarvelService from '../../services/service';

import { Link } from 'react-router-dom';

import setContent from '../../utils/setContent';

import './charInfo.scss';

import PropTypes from 'prop-types';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {process, setProcess, getCharacter, clearError} = useMarvelService();

    useEffect( () => {  
        createCharacter();
        // eslint-disable-next-line
    }, [props.id] )
    
    const createCharacter = () => {
        
        const {id} = props;

        if(!id) {
            return;
        }

        clearError();
        getCharacter(id)   
        .then(res => onFinishedLoading(res))
        .then(() => setProcess('confirmed'))
    }

    const onFinishedLoading = (char) => {
        setChar(char);
    }

    return (
        <>
            <div className="char__info">
                {setContent(process, Content, char)}
            </div>

        </>
    )

}

const Content = ({data}) => {
    
    const {name, description, thumbnail, homepage, wiki, comics} = data;

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
                    
                    const filteredComicID = item.resourceURI.replace(/\D/g, '').slice(1);    
                
                    if (i < 10) {
                        return (
                            <Link className="char__comics-item" key={i} to={`/comics/${filteredComicID}`}>
                                {item.name}
                            </Link>
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