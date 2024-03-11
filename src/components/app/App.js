/* eslint-disable default-case */
import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomCharacter from "../randomCharracter/RandomCharacter";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import vision from "../../resources/img/vision.png";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
// import MarvelService from "../../services/MarvelService";

const App = () => {
  const [selectedCardId, setSelectedCard] = useState(null);

  const onCharSelected = (id) => {
    setSelectedCard(id);
  };

  const curentPage = 0;
  const pageContent = (numPage) => {
    switch (numPage) {
      case 0: {
        return (
          <main>
            <RandomCharacter />
            <div className="char__content">
              <CharList onCharSelected={onCharSelected} />
              <ErrorBoundary>
                <CharInfo charId={selectedCardId} />
              </ErrorBoundary>

              {/* <h1>Helloo worls</h1> */}
            </div>
            <img className="bg-decoration" src={vision} alt="vision" />
          </main>
        );
      }
      case 1: {
        return (
          <main>
            <AppBanner />
            <ComicsList />
          </main>
        );
      }
      case 2: {
        return (
          <main>
            <AppBanner />
            <SingleComic />
          </main>
        );
      }
    }
  };

  return (
    <div className="app">
      <AppHeader />
      {pageContent(curentPage)}
    </div>
  );
};

export default App;
