import * as React from "react";
import RecentlyVisitedArticles from "../RecentlyVisitedArticles";
import renderer from 'react-test-renderer';
import {Link, MemoryRouter} from 'react-router-dom';
import {render, shallow} from 'enzyme';
import {firstRecentlyVisitedSite, secondRecentlyVisitedSite} from '../../../utils/__fixtures__/fakeData';

describe('RecentlyVisitedArticles tests', () => {
    let wrapper;
    const getAnchorContent = () => wrapper.find('a').first().html();
    const componentWithData = data => (
        <RecentlyVisitedArticles recentlyVisited={data} clearData={fakeData.clearData}/>
    );
    const routerOverComponent = data => (
        <MemoryRouter>
            {componentWithData(data)}
        </MemoryRouter>
    );

    beforeEach(() => {
        wrapper = shallow(componentWithData(fakeData.recentlyVisitedImproper));
    });

    it('renders correctly', () => {
        const component = renderer.create(routerOverComponent(fakeData.recentlyVisitedImproper)).toJSON();

        expect(component).toMatchSnapshot();
    });

    it('should render links to articles with their titles', () => {
        expect(wrapper.find('a')).toHaveLength(2);
        expect(wrapper.find(Link)).toHaveLength(2);
    });

    it('should use function to clear local storage when clicking on span', () => {
        const wrapper = shallow(componentWithData(fakeData.recentlyVisitedImproper));

        wrapper.find('#resetStats').simulate('click');

        expect(fakeFunction).toHaveBeenCalled();
    });

    it('should render \'Link to long, click here to follow it.\', when url is to long', () => {
        expect(getAnchorContent()).toContain('Url: Link to long, click here to follow it.');
    });

    it('should render proper url when its length is smaller or equal 40 chars', () => {
        wrapper = shallow(componentWithData(fakeData.recentlyVisitedProper));
        const expectedContent = 'Url: ' + fakeData.recentlyVisitedProper[0].url

        expect(getAnchorContent()).toContain(expectedContent);
    });

    /* there is a bug with shallow, wrapping component in <MemoryRouter> doesn't get rid of
    'Invariant Violation: You should not use <Link> outside a <Router>'
    Using render instead of shallow replaces Link with <a> tag */
    it('should render \'Title to long, show detailed statistics.\', when title is to long', () => {
        wrapper = render(routerOverComponent(fakeData.recentlyVisitedImproper));

        expect(getAnchorContent()).toContain('Title: Title to long, show detailed statistics.');
    });

    it('should render proper title when its length is smaller or equal 40 chars', () => {
        wrapper = render(routerOverComponent(fakeData.recentlyVisitedProper));

        const expectedContent = 'Title: ' + fakeData.recentlyVisitedProper[0].title;
        expect(getAnchorContent()).toContain(expectedContent);
    });
});

const fakeFunction = jest.fn();
const fakeData = {
    recentlyVisitedProper: [firstRecentlyVisitedSite, secondRecentlyVisitedSite],
    recentlyVisitedImproper: [
        {
            ...firstRecentlyVisitedSite,
            title: 'SomeTitle, to long to be displayed in div, additional length',
            url: 'SomeUrl, to long to be displayed in div, additional length',
        },
        {
            ...secondRecentlyVisitedSite,
            title: 'SomeTitle2, to long to be displayed in div, additional length',
            url: 'SomeUrl2, to long to be displayed in div, additional length',
        }
    ],
    clearData: fakeFunction
};
