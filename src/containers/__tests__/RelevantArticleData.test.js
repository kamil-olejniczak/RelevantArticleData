import * as React from 'react';
import configureStore from 'redux-mock-store';
import {MemoryRouter} from 'react-router-dom';
import RelevantArticleData, {PureRelevantArticleData} from '../RelevantArticleData';
import {render, shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import Spinner from '../../components/ui/Spinner';
import {fakeArticleData, fakeRecentlyVisited} from '../../utils/__fixtures__/fakeData';

describe('DetailedRecentlyVisitedArticles tests', () => {
    const mockStore = configureStore();

    let wrapper, store;

    it('renders correctly', () => {
        store = mockStore(fakeData);
        const component = renderer.create(connectedComponentWithRouter(store)).toJSON();

        expect(component).toMatchSnapshot();
    });

    it('should not render spinner when data is not being resolved', () => {
        store = mockStore(fakeData);
        wrapper = render(connectedComponentWithRouter(store));

        expect(wrapper.find('.Spinner')).toHaveLength(0);
    });

    it('should render spinner when data is resolving', () => {
        const fakeStoreState = {article: {...fakeData.article, isDataBeingResolved: true}};
        store = mockStore(fakeStoreState);
        wrapper = render(connectedComponentWithRouter(store));

        expect(wrapper.find('.Spinner')).toHaveLength(1);
    });

    it('should not render article and stats when isArticleShown flag is false', () => {
        store = mockStore(fakeData);
        wrapper = render(connectedComponentWithRouter(store));

        expect(wrapper.find('.ArticleData')).toHaveLength(0);
    });

    it('should render article and stats when isArticleShown flag is true', () => {
        const fakeStoreState = {article: {...fakeData.article, isArticleShown: true}};
        store = mockStore(fakeStoreState);
        wrapper = render(connectedComponentWithRouter(store));

        expect(wrapper.find('.ArticleData')).toHaveLength(1);
    });

    it('should pass clearArticle function to Navbar component as prop', () => {
        const fakeProp = 'fakeProp';
        const fake = {article: {...fakeData.article, isArticleShown: true, clearArticle: fakeProp}};
        store = mockStore(fake);
        wrapper = shallow(pureComponentWithRouter(store, fake.article));

        const prop = wrapper.find(PureRelevantArticleData).dive().find('.Navbar li').at(0).prop('onClick');
        expect(prop).toEqual(fakeProp);
    });

});

const fakeData = {
    article: {
        isArticleShown: false,
        ...fakeRecentlyVisited,
        ...fakeArticleData,
    }
};
const connectedComponentWithRouter = (store, props) => (
    <MemoryRouter>
        <Provider store={store}>
            <RelevantArticleData {...props}/>
        </Provider>
    </MemoryRouter>
);
const pureComponentWithRouter = (store, props) => (
    <MemoryRouter>
        <PureRelevantArticleData {...props}/>
    </MemoryRouter>
);