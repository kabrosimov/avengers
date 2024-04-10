import { useState, useEffect } from 'react';
import useMarvelService from '../services/MarvelService';
import { useParams } from 'react-router-dom';
import { ErrorMessage } from 'formik';
import Spinner from '../components/spinner/Spinner';
import AppBanner from '../components/appBanner/AppBanner';

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState();
    const { loading, error, clearError, getComic, getCharacterByName } =
        useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();
        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacterByName(id).then(onDataLoaded);
        }
    };
    const onDataLoaded = somedata => {
        setData(somedata);
    };
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? (
        <div style={{ marginTop: '50px' }}>
            <Spinner />
        </div>
    ) : null;
    const content = !(loading || error || !data) ? (
        <Component data={data} />
    ) : null;
    // console.log(Component);
    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};
export default SinglePage;
