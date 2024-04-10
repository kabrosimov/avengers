// import { createRef } from 'react';
import { useHttp } from '../hooks/http.hook';
import md5 from 'blueimp-md5';

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=729ed46a2ec85822982244f81ac50328';

    const getHash = timeStamp => {
        return md5(
            timeStamp +
                '9c2cf35b20d6ae9479b9de1b86c6cb6b591333a4' +
                '729ed46a2ec85822982244f81ac50328',
        );
    };

    const getAllCharacters = async (limit, offset) => {
        const res = await request(
            `${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`,
        );
        // console.log(res.data.results[0]);
        if (res) {
            return res.data.results.map(_transformCharacter);
        }
    };

    const getAllComics = async (limit, offset) => {
        const res = await request(
            `${_apiBase}comics?&limit=${limit}&offset=${offset}&${_apiKey}`,
        );
        // console.log(res.data.results[0]);
        if (res) {
            return res.data.results.map(_transformComics);
        }
    };
    const getComic = async id => {
        const timeStamp = +new Date();
        const hash = getHash(timeStamp);
        const res = await request(
            `${_apiBase}comics/${id}?${timeStamp}&${_apiKey}&${hash}`,
        );
        return _transformComics(res.data.results[0]);
    };

    // https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=0&apikey=729ed46a2ec85822982244f81ac50328

    const getCharacter = async id => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        if (res) {
            return _transformCharacter(res.data.results[0]);
        }
    };
    const getCharacterByName = async name => {
        // const timeStamp = +new Date();
        // const hash = getHash(timeStamp);
        const res = await request(
            `${_apiBase}characters?name=${name}&${_apiKey}`,
        );
        if (res) {
            return _transformCharacter(res.data.results[0]);
        }
    };

    const _transformCharacter = char => {
        if (char) {
            let validDescr = char.description;
            if (validDescr.length === 0) {
                validDescr = 'Description not found';
            }
            if (validDescr.length > 215) {
                validDescr = validDescr.slice(0, 215) + '...';
            }
            return {
                id: char.id,
                name: char.name,
                fullDescription: char.description,
                description: validDescr,
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                comics: char.comics.items,
            };
        } else return { name: '' };
    };
    const _transformComics = comics => {
        // let validDescr = char.description;
        // if (validDescr.length === 0) {
        //   validDescr = "Description not found";
        // }
        // if (validDescr.length > 215) {
        //   validDescr = validDescr.slice(0, 215) + "...";
        // }
        // console.log(comics);
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount
                ? `${comics.pageCount} pages`
                : 'No information about the number of pages',
            thumbnail: comics.thumbnail
                ? comics.thumbnail.path + '.' + comics.thumbnail.extension
                : null,
            homepage: comics.url ? comics.urls[0].url : null,
            price:
                comics.price && comics.prices[0].price
                    ? `${comics.prices[0].price}$`
                    : 'not available',
            language: comics.textObjects.language || 'en-us',
        };
    };

    return {
        loading,
        error,
        clearError,
        getAllCharacters,
        getCharacter,
        getAllComics,
        getComic,
        getCharacterByName,
    };
};

export default useMarvelService;

// console.log(new Date().getTime());
