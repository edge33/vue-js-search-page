import axios from 'axios';
import * as data from '../../../data/data.json';
import MockAdapter from 'axios-mock-adapter';
import {SearchQueryInputModel} from '../../common/SearchQueryInputModel';
import {mapSearchResults, SearchResultsModel} from '../../models/Search/SearchResultsModel';

const mock = new MockAdapter(axios);


export function getSearchResults(searchUrl: string, searchQuery: SearchQueryInputModel): Promise<SearchResultsModel> {
    mock.onPost(searchUrl, searchQuery).reply(200, data)
    return new Promise((resolve, reject) => {
        axios.post(searchUrl, searchQuery)
            .then((response) => {
                const result = mapSearchResults(response.data.default);
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
