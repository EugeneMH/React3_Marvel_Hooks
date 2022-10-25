import useHttp from "../hooks/http.hook";

const useMarvelService = () => {

    const {loading, error, request, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=ee5953dc31f3d6f456feeaafb26f8003';
    const _baseOffset = 180;

    
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(comics => _transformComics(comics));
    }

    const getCharacterByName = async (name) => {
        try {
            const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
            return _transformCharacter(res.data.results[0], false);
        } catch (e) {
           return 'not found';
        }
    }

    const _transformCharacter = (char, limitLetters = true) => {

        let charDescription = char.description ? char.description : "Unfortunately, we can't find the description of this character"; 

        if (charDescription.length >= 200 && limitLetters) {
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

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            name: comics.title,
            description: comics.description ? comics.description : 'There is no description of this comic' ,
            pageCount: comics.pageCount ?  `${comics.pageCount} pages` : 'No information about the number of the pages',
            url: comics.urls[0].url,
            price: comics.prices[0].price,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-rus'
        }
    }

    return {loading, error, getAllCharacters, getCharacter, getAllComics, clearError, getComic, getCharacterByName}

}

export default useMarvelService;