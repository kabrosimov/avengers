import './comicsList.css';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { Link } from 'react-router-dom';

const ComicsList = () => {
    const { loading, error, getAllComics } = useMarvelService();
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(520);
    const [newComicsLoading, setNewComicsLoading] = useState(false);

    useEffect(() => {
        loadComics(8);
    }, []);

    const loadComics = (limit, initial = true) => {
        // setNewComicsLoading(!initial);
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        // setNewComicsLoading(true);
        getAllComics(limit, offset).then(onComicsListLoaded);
    };

    const onComicsListLoaded = newList => {
        setComicsList(oldList => [...oldList, ...newList]);
        setOffset(offset => offset + 8);
        setNewComicsLoading(false);
        // console.log(comicsList);
    };
    // const arrRef = useRef([]);

    const renderComisc = arr => {
        const tempComicsList = arr.map(item => {
            const { id, price, ...itemProps } = item;
            let thumbStyle = {};
            if (
                itemProps.thumbnail &&
                itemProps.thumbnail.includes('image_not_available.jpg')
            ) {
                thumbStyle = { objectFit: 'fill' };
            }

            return (
                <li
                    className="comics__item"
                    // tabIndex={0}
                    id={id}
                    key={id}
                    // ref={(el) => arrRef.current.push(el)}
                    // onClick={() => }
                >
                    <Link to={`/comics/${id}`}>
                        {/* <a href={itemProps.homepage}> */}
                        <img
                            style={thumbStyle}
                            src={itemProps.thumbnail}
                            alt={itemProps.title}
                            className="comics__item-img"
                        />
                        <div className="comics__item-name">
                            {itemProps.title}
                        </div>
                        <div className="comics__item-price">
                            {price ? `${price}$` : null}
                        </div>
                        {/* </a> */}
                    </Link>
                </li>
            );
        });
        return <ul className="comics__grid">{tempComicsList}</ul>;
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newComicsLoading ? <Spinner /> : null;
    const content = renderComisc(comicsList);

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {content}
            <button
                className="button button__main button__long"
                onClick={() => loadComics(8, false)}
                disabled={newComicsLoading}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
