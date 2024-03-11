import React, { useState, useEffect, useRef } from "react";
import "./charList.css";
import MarvelService from "../../services/MarvelService";
// import CharCard from "../charCard/CharCard";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";
const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [charEnded, setCharEnded] = useState(false);

  const marvelServise = new MarvelService();

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

  const createCharList = (limit, offsetCard) => {
    marvelServise
      .getAllCharacters(limit, offsetCard)
      .then(onCharListLoaded)
      .catch(onError);
  };

  const onCharListLoading = () => {
    setLoading(true);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    setCharList((oldValue) => [...oldValue, ...newCharList]);
    setLoading(false);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
    // this.setState(({ offset, charList }) => ({
    //   charList: [...charList, ...newCharList],
    //   loading: false,
    //   newItemLoading: false,
    //   offset: offset + 9,
    //   charEnded: ended,
    // }));
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const arrRef = useRef([]);
  const focusOnItem = (id) => {
    // Я реализовал вариант чуть сложнее, и с классом и с фокусом
    // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
    // На самом деле, решение с css-классом можно сделать, вынеся персонажа
    // в отдельный компонент. Но кода будет больше, появится новое состояние
    // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

    // По возможности, не злоупотребляйте рефами, только в крайних случаях
    const i = arrRef.current.findIndex((item) => item.id == id);
    arrRef.current.forEach((item) => {
      if (item) {
        item.classList.remove("char__item_selected");
      }
    });
    arrRef.current[i].classList.add("char__item_selected");
    arrRef.current[i].focus();
  };

  const renderItems = (arr) => {
    const tempArr = arr.map((item) => {
      const { id, ...itemProps } = item;
      let notFoundStyle = {};
      if (itemProps.thumbnail.includes("image_not_available.jpg")) {
        notFoundStyle = { objectFit: "unset" };
      }
      return (
        <li
          className="char__item"
          onClick={() => {
            props.onCharSelected(id);
            focusOnItem(id);
          }}
          tabIndex={0}
          key={id}
          ref={(el) => arrRef.current.push(el)}
          id={id}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
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
    return <ul className="char__grid">{tempArr}</ul>;
  };

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(errorMessage || spinner) ? items : null;
  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => createCharList(9, offset)}
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
