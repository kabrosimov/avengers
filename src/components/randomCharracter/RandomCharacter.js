import { useState, useEffect } from 'react';

import './randomCharacters.css';

import mjolnir from '../../resources/img/mjolnir.png';
// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const RandomCharacter = () => {
    const [char, setChar] = useState({});
    const { clearError, getCharacter, process, setProcess } =
        useMarvelService();

    useEffect(() => {
        updateRandomChar();
    }, []);

    const onCharLoaded = char => {
        setChar(char);
    };

    const updateRandomChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    };

    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading ? <Spinner /> : null;
    // const content = !(errorMessage || spinner) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {/* {errorMessage}
            {spinner}
            {content} */}
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button
                    className="button button__main"
                    onClick={updateRandomChar}
                >
                    <div className="inner">try it</div>
                </button>
                <img
                    src={mjolnir}
                    alt="mjolnir"
                    className="randomchar__decoration"
                />
            </div>
        </div>
    );
};

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki } = data;
    let notFoundStyle = {};
    if (thumbnail && thumbnail.includes('image_not_available.jpg')) {
        notFoundStyle = { objectFit: 'contain' };
    }

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={notFoundStyle}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomCharacter;
