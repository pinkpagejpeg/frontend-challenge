export interface ICatsState {
    favorite: IFavorite[]
    catsLoading: boolean,
    catsError: string | null | undefined,
}

export interface ICat {
    id: string,
    width: number,
    height: number,
    url: string,
    breeds: IBreed[],
    favourite: {}
}

interface IBreed {
    weight: {
        imperial: string,
        metric: string
    },
    id: string,
    name: string,
    temperament: string,
    origin: string,
    country_codes: string,
    country_code: string,
    life_span: string,
    wikipedia_url: string
}

export interface IFavorite {
    id: string,
    img: string
}