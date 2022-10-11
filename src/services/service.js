

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=ee5953dc31f3d6f456feeaafb26f8003';
    _baseOffset = 180;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) throw new Error(`Could not fetch${url}, status ${res.status}`);

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {

        let charDescription = char.description ? char.description : "Unfortunately, we can't find the description of this character"; 

        if (charDescription.length >= 200) {
            charDescription = charDescription.slice(0, 200) + '...';
        }

        return {
            comics: char.comics.items,
            id: char.id,
            name: char.name,
            description: charDescription,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }

}

export default MarvelService;