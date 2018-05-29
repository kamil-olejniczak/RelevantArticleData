import * as React from 'react';
import DetailedRecentlyVisitedArticles from '../DetailedRecentlyVisitedArticles';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {MemoryRouter} from 'react-router-dom';
import {mount, render} from 'enzyme';
import * as actionTypes from '../../store/actions/actionTypes';
import {fakeRecentlyVisited, firstRecentlyVisitedSite} from '../../utils/__fixtures__/fakeData';

describe('DetailedRecentlyVisitedArticles tests', () => {
    const mockStore = configureStore();

    let wrapper, store;

    it('renders correctly', () => {
        store = mockStore(fakeData);
        const component = renderer.create(componentWithRouter(store)).toJSON();

        expect(component).toMatchSnapshot();
    });

    it('should not render component when recentlyVisited array is empty', () => {
        store = mockStore({article: {recentlyVisited: []}});
        wrapper = render(componentWithRouter(store));

        expect(wrapper.find('.DetailedRecentlyVisitedArticles')).toHaveLength(0);
    });

    it('should render component when recentlyVisited array has proper data', () => {
        store = mockStore(fakeData);
        wrapper = render(componentWithRouter(store));

        expect(wrapper.find('.DetailedRecentlyVisitedArticles')).toHaveLength(1);
    });

    it('should not render horizontal line when there is only one element in recentlyVisited array', () => {
        store = mockStore({article: {recentlyVisited: [firstRecentlyVisitedSite]}});
        wrapper = render(componentWithRouter(store));

        expect(wrapper.find('hr')).toHaveLength(0);
    });

    it('should render horizontal line when there is more than one element in recentlyVisited array', () => {
        store = mockStore(fakeData);
        wrapper = render(componentWithRouter(store));

        expect(wrapper.find('hr')).toHaveLength(1);
    });

    it('should dispatch INIT_RELOAD_ARTICLE action from reloadPreviouslyVisitedArticle method', () => {
        store = mockStore(fakeData);
        wrapper = mount(componentWithRouter(store, {history: []}));

        wrapper.find('.link').first().simulate('click');

        expect(store.getActions()).toEqual([
            {type: actionTypes.INIT_RELOAD_ARTICLE, url: fakeData.article.recentlyVisited[0].url}
        ]);
    });
});

const fakeData = {
    article: {
        ...fakeRecentlyVisited
    }
};
const componentWithRouter = (store, props) => (
    <MemoryRouter>
        <DetailedRecentlyVisitedArticles store={store} {...props}/>
    </MemoryRouter>
);