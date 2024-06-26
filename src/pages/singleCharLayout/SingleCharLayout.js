import './singleCharLayout.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SingleCharLayout = ({ data }) => {
    const { name, fullDescription, thumbnail } = data;
    return (
        <>
            <Helmet>
                <meta name="description" content={`About ${name} `} />
                <title>{name}</title>
            </Helmet>
            <div className="single-comic">
                <img src={thumbnail} alt={name} className="single-comic__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{fullDescription}</p>
                </div>
                <Link to={'/'} className="single-comic__back">
                    Back to all
                </Link>
            </div>
        </>
    );
};

export default SingleCharLayout;
