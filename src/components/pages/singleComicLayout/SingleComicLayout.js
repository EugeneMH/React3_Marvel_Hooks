import {Helmet} from "react-helmet";

import './singleComicLayout.scss';

import { Link } from 'react-router-dom';

const SingleComicLayout = ({data}) => {

    const {name, description, thumbnail, pageCount, language, price} = data;

    return (
        <>
            <Helmet>
                <title>{`${name} comic book`}</title>
                <meta name="description" content={name} />
            </Helmet>
            <div className="single-comic">       
                <img src={thumbnail} alt={name} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        </>
    )
}

export default SingleComicLayout;