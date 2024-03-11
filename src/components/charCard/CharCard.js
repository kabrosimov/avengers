import "./charCard.css";
// import { useRef } from "react";
// import abyss from "../../resources/img/abyss.jpg";/
const CharCard = ({ data, selectCard }) => {
  const { name, thumbnail } = data;
  let notFoundStyle = {};
  // let ref = useRef(0);
  if (thumbnail.includes("image_not_available.jpg")) {
    notFoundStyle = { objectFit: "unset" };
  }

  return (
    <li className="char__item" onClick={selectCard}>
      <img src={thumbnail} alt={name} style={notFoundStyle} />
      <div className="char__name">{name}</div>
    </li>
  );
};

export default CharCard;
