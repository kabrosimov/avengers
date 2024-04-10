import { useState } from 'react';
import { Helmet } from 'react-helmet';
import RandomCharacter from '../components/randomCharracter/RandomCharacter';
import CharList from '../components/charList/CharList';
import CharInfo from '../components/charInfo/CharInfo';
import CharSearch from '../components/charSearch/CharSearch';

import vision from '../resources/img/vision.png';

// import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';

const MainPage = () => {
    const [selectedCardId, setSelectedCard] = useState(null);

    const onCharSelected = id => {
        setSelectedCard(id);
    };
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Custom marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <RandomCharacter />
            <div className="char__content">
                <CharList onCharSelected={onCharSelected} class_name="main" />
                <div style={{ position: 'sticky', top: '40px' }}>
                    <ErrorBoundary>
                        <CharInfo
                            charId={selectedCardId}
                            // class_name="sidebar"
                        />

                        <CharSearch />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={vision} alt="vision" />
        </>
    );
};

export default MainPage;
