import { useState, useEffect } from 'react';
import useMarvelService from '../services/MarvelService';
import { useParams } from 'react-router-dom';
// import ErrorMessage from '../components/errorMessage/ErrorMessage';
// import Spinner from '../components/spinner/Spinner';
import AppBanner from '../components/appBanner/AppBanner';
import setContent from '../utils/setContent';

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState();
    const {
        // loading,
        // error,
        clearError,
        getComic,
        getCharacterByName,
        process,
        setProcess,
    } = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();
        switch (dataType) {
            case 'comic':
                getComic(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacterByName(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
        }
    };
    const onDataLoaded = somedata => {
        setData(somedata);
    };
    return (
        <>
            <AppBanner />
            {/* {errorMessage}
            {spinner}
            {content} */}
            <div style={{ marginTop: '50px' }}>
                {setContent(process, Component, data)}
            </div>
        </>
    );
};
export default SinglePage;
