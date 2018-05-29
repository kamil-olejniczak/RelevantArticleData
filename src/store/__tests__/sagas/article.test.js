import {cloneableGenerator} from 'redux-saga/utils';
import {getArticleSaga, reloadArticleSaga} from '../../sagas/article';
import {ERROR_OCCURRED, INIT_SAVE_DATA, INVALID_URL, RELOAD_ARTICLE} from '../../actions/actionTypes';
import axios from '../../__mocks__/axios';

jest.mock('axios');

/**
 * Comments with line numbers, are unnecessary, they are here just for easier future test reexamine
 */
describe('Article saga tests', () => {
    it('checkForImproperLink should put action with INVALID_URL type', () => {
        const gen = cloneableGenerator(getArticleSaga)({url: fakeImproperUrl});
        const valueFromPutInGenerator = gen.next().value.PUT; // yield on line #63

        expect(valueFromPutInGenerator.action).toEqual({type: INVALID_URL});
    });

    it('fetchArticle should put INIT_SAVE_DATA action', () => {
        const gen = cloneableGenerator(reloadArticleSaga)({url: fakeProperUrl});
        gen.next(); // yield on line #29
        gen.next(); // yield on line #38
        const valueFromPutInGenerator = gen.next(fakeResponse).value.PUT;

        expect(valueFromPutInGenerator.action.type).toEqual(INIT_SAVE_DATA);
    });

    it('checkForSuccessfulResponse should put RELOAD_ARTICLE action when was called by reloadArticleSaga', () => {
        const gen = cloneableGenerator(reloadArticleSaga)({url: fakeProperUrl});
        gen.next(); // yield on line #29
        gen.next(); // yield on line #38
        gen.next(fakeResponse); // pass data to return from yield on line #38, yield on line #56
        const valueFromPutInGenerator = gen.next().value.PUT; // yield on line #25

        expect(valueFromPutInGenerator.action.type).toEqual(RELOAD_ARTICLE);
    });

    it('checkForSuccessfulResponse should put ERROR_OCCURRED when response comes with error', () => {
        const gen = cloneableGenerator(reloadArticleSaga)({url: fakeProperUrl});
        gen.next(); // yield on line #29
        gen.next(); // yield on line #38
        // throw error to return from yield on line #38, yield on line #23
        const valueFromPutInGenerator = gen.throw('ERROR: Execute Order 66').value.PUT;

        expect(valueFromPutInGenerator.action.type).toEqual(ERROR_OCCURRED);
    });
});

const fakeImproperUrl = 'www.www.ww';
const fakeProperUrl = 'http://www.www.ww';
const fakeResponse = {
    data: {
        content: '<div><p>Fake paragraph</p></div>',
        title: 'some title',
        url: 'https://docs.oracle.com/cd/E13150_01/jrockit_jvm/jrockit/geninfo/diagnos/garbage_collect.html',
        "date_published": "2016-09-30T07:00:12.000Z",
        "lead_image_url": "https://www.wired.com/wp-content/uploads/2016/09/Rosetta_impact-1-1200x630.jpg",
        "dek": "Time to break out the tissues, space fans.",
        "domain": "www.wired.com",
        "excerpt": "Time to break out the tissues, space fans.",
        "word_count": 1031,
        "direction": "ltr",
        "total_pages": 1,
        "rendered_pages": 1,
        "next_page_url": null
    }
};