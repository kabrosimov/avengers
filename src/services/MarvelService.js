class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=729ed46a2ec85822982244f81ac50328";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (limit, offset) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=${limit}&offset=${offset}&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    let validDescr = char.description;
    if (validDescr.length === 0) {
      validDescr = "Description not found";
    }
    if (validDescr.length > 215) {
      validDescr = validDescr.slice(0, 215) + "...";
    }
    return {
      id: char.id,
      name: char.name,
      fullDescription: char.description,
      description: validDescr,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
}

export default MarvelService;
