import './comicsList.css';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import { setContentCardList } from '../../utils/setContent';

import { Link } from 'react-router-dom';

const ComicsList = () => {
    const { getAllComics, process, setProcess } = useMarvelService();
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(520);
    const [newComicsLoading, setNewComicsLoading] = useState(false);

    useEffect(() => {
        loadComics(8);
    }, []);

    const loadComics = (limit, initial = true) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        // setNewComicsLoading(true);
        getAllComics(limit, offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'));
    };

    const onComicsListLoaded = newList => {
        setComicsList(oldList => [...oldList, ...newList]);
        setOffset(offset => offset + 8);
        setNewComicsLoading(false);
    };

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
                <li className="comics__item" id={id} key={id}>
                    <Link to={`/comics/${id}`}>
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
                    </Link>
                </li>
            );
        });
        return <ul className="comics__grid">{tempComicsList}</ul>;
    };

    return (
        <div className="comics__list">
            {setContentCardList(
                process,
                () => renderComisc(comicsList),
                newComicsLoading,
            )}
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
