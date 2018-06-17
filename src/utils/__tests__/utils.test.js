import * as utils from '../../utils/utils';
import storeMock from "../../store/__mocks__/store";

jest.mock('../../store/store');

describe('Utils tests', () => {
    it('should parse response and return null when date_published field is not present', () => {
        const formattedResponse = utils.parseResponseData({date_published: 0});

        expect(formattedResponse.date_published).toBeNull();
    });

    it('should properly parse response and add date with time of publication to it', () => {
        const formattedResponse = utils.parseResponseData({date_published: '2016-09-30T07:00:12.000Z'});

        // 3 expects, that test only one output, to reduce coupling between test and various local date formats
        expect(formattedResponse.date_published).toContain('16');
        expect(formattedResponse.date_published).toContain('9');
        expect(formattedResponse.date_published).toContain('30');
    });

    it('should count tag occurrences in html code', () => {
        const map = utils.refreshTagStatistics('<div><div><p><span>Fake</span>Text</p></div></div>');
        const expectedResult = {
            div: 2,
            p: 1,
            span: 1,
        };

        Object.keys(map).forEach(key => expect(map[key]).toEqual(expectedResult[key]));
    });

    it('should return false when provided link is not proper', () => {
        const isLinkProper = utils.isImproperLink('www.google.pl');

        expect(isLinkProper).toBeFalsy();
    });

    it('should return true when provided link is proper', () => {
        const properLink = utils.isImproperLink(properUrl);
        const properSecureLink = utils.isImproperLink('https://www.google.pl');

        expect(properLink).toBeTruthy();
        expect(properSecureLink).toBeTruthy();
    });

    it('should add recently visited url to array which stores them', () => {
        const dataFromStore = utils.refreshRecentlyVisited(properUrl);

        expect(dataFromStore).toContain(properUrl);
    });

    it('should crop array size with recently visited urls to 5', () => {
        storeMock.fillUpArray();

        const dataFromStore = utils.refreshRecentlyVisited(properUrl);

        expect(dataFromStore).toHaveLength(5);
    });

    it('should create Date object from date string in recentVisit stored in localStorage', () => {
        const mappedArray = utils.parseDateForRecentlyVisitedFromLocalStorage([{date: '1970-01-13T10:15:41.824Z'}]);

        expect(mappedArray[0].date).toBeInstanceOf(Date);
    });
});

const properUrl = 'http://www.google.pl';