import React, { useState, useEffect, useRef, useMemo } from 'react';
import './charList.css';
import useMarvelService from '../../services/MarvelService';
// import CharCard from "../charCard/CharCard";
// import ErrorMessage from '../errorMessage/ErrorMessage';
// import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import setContent from '../../utils/setContent';
// import Spinner from '../spinner/Spinner';
import { setContentCardList } from '../../utils/setContent';

// const setContent = (process, Component, newItemLoading) => {
//     switch (process) {
//         case 'waiting':
//             return <Spinner />;
//         // break;
//         case 'loading':
//             return newItemLoading ? <Component /> : <Spinner />;
//         // break;
//         case 'confirmed':
//             return <Component />;
//         // break;
//         case 'error':
//             return <ErrorMessage />;
//         // break;
//         default:
//             throw new Error('Unexpected process state');
//     }
// };

const CharList = props => {
    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);

    // const marvelServise = new MarvelService();
    const { getAllCharacters, process, setProcess } = useMarvelService();

    useEffect(() => {
        createCharList(9);
        // window.addEventListener("scroll", scrollHandler);
        // return () => {
        //   window.removeEventListener("scroll", scrollHandler);
        // };
    }, []);

    // const scrollHandler = (e) => {
    //   if (
    //     window.scrollY + document.documentElement.clientHeight >=
    //     document.documentElement.scrollHeight
    //   ) {
    //     createCharList(9, offset);
    //   }
    // };

    const createCharList = (limit, offsetCard, initial = true) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(limit, offsetCard)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    };

    const onCharListLoaded = newCharList => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        setCharList(oldValue => [...oldValue, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    };

    const arrRef = useRef([]);
    const focusOnItem = i => {
        // Я реализовал вариант чуть сложнее, и с классом и с фокусом
        // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
        // На самом деле, решение с css-классом можно сделать, вынеся персонажа
        // в отдельный компонент. Но кода будет больше, появится новое состояние
        // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        // console.log(arrRef);
        // const i = arrRef.current.findIndex(item => item.id == id);
        arrRef.current.forEach(item => {
            if (item) {
                item.classList.remove('char__item_selected');
            }
        });
        arrRef.current[i].classList.add('char__item_selected');
        arrRef.current[i].focus();
    };

    const renderItems = arr => {
        const tempArr = arr.map((item, i) => {
            const { id, ...itemProps } = item;
            let notFoundStyle = {};
            if (itemProps.thumbnail.includes('image_not_available.jpg')) {
                notFoundStyle = { objectFit: 'unset' };
            }
            return (
                <CSSTransition key={id} timeout={1000} classNames="my-node">
                    <li
                        className="char__item"
                        onClick={() => {
                            props.onCharSelected(id);
                            focusOnItem(i);
                        }}
                        tabIndex={0}
                        key={id}
                        ref={el => (arrRef.current[i] = el)}
                        // ref={el => (el ? arrRef.current.push(el) : null)}
                        id={id}
                        onKeyDown={e => {
                            if (e.key === ' ' || e.key === 'Enter') {
                                props.onCharSelected(item.id);
                                focusOnItem(id);
                            }
                        }}
                    >
                        <img
                            src={itemProps.thumbnail}
                            alt={itemProps.name}
                            style={notFoundStyle}
                        />

                        <div className="char__name">{itemProps.name}</div>
                    </li>
                </CSSTransition>

                // <CharCard
                //   key={id}
                //   id={id}
                //   data={itemProps}
                //   selectCard={() => this.props.onCharSelected(id)}
                //   ref={this.setRefs}
                //   // setFocus={() => this.setRefs(ref)}
                // />
            );
        });
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>{tempArr}</TransitionGroup>
            </ul>
        );
    };

    // const items = renderItems(charList);

    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading && !newItemLoading ? <Spinner /> : null;
    // const content = !(errorMessage || spinner) ? items : null;

    const elements = useMemo(() => {
        return setContentCardList(
            process,
            () => renderItems(charList),
            newItemLoading,
        );
    }, [process]);

    return (
        <div className="char__list main">
            {elements}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: charEnded ? 'none' : 'block' }}
                onClick={() => createCharList(9, offset, false)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
