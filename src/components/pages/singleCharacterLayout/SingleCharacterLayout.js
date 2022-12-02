import {Helmet} from "react-helmet";

import { Link } from "react-router-dom";
import './singleCharacterLayout.scss';

const SingleCharacterLayout = ({data}) => {

    const {name, description, thumbnail} = data;

    return (
        <>
            <Helmet>
                <title>{`${name} information page`}</title>
                <meta name="description" content={name} />
            </Helmet>
            <div className="single-comic">       
                <img src={thumbnail} alt={name} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
                <Link to="/" className="single-comic__back">Back to all</Link>
            </div>
        </>

    )
}

export default SingleCharacterLayout;