import { useState, useEffect } from "react";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import PropTypes from "prop-types";

import "./charInfo.css";

import MarvelService from "../../services/MarvelService";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  // useEffect(() => {
  //   updateChar();
  // }, []);

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    onCharLoading();
    marvelService.getCharacter(charId).then(onCharLoaded).catch(onError);

    // this.foo.bar = 0;
  };
  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
    // this.setState({ char, loading: false });
  };
  const onError = () => {
    setLoading(false);
    setError(true);
  };
  const onCharLoading = () => {
    setLoading(true);
  };

  const skeleton = !(error || loading || char) ? <Skeleton /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(errorMessage || spinner || !char) ? (
    <View char={char} />
  ) : null;
  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, fullDescription, thumbnail, homepage, wiki, comics } = char;
  let notFoundStyle = {};
  if (thumbnail.includes("image_not_available.jpg")) {
    notFoundStyle = { objectFit: "unset" };
  }
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} style={notFoundStyle} alt={name} />
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
      <div className="char__descr">{fullDescription}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There is no comics whith this character"}
        {comics.map((item, i) => {
          if (i >= 10) {
            return;
          }
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};
CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
