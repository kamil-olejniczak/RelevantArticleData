import * as React from "react";
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import ArticleSearch from '../ArticleSearch';
import * as actionTypes from "../../store/actions/actionTypes";

describe('ArticleSearch tests', () => {
    const mockStore = configureStore();

    let wrapper, store;

    it('renders correctly', () => {
        store = mockStore(mockStoreWithoutErrorAndArticle);
        const component = renderer.create(<ArticleSearch store={store}/>).toJSON();

        expect(component).toMatchSnapshot();
    });

    it('should not render component when article is shown', () => {
        store = mockStore(mockStoreWithVisibleArticle);
        wrapper = shallow(<ArticleSearch store={store}/>).dive();

        expect(wrapper.find('.ArticleSearch')).toHaveLength(0);
    });

    it('should render component when article is not shown', () => {
        store = mockStore(mockStoreWithoutErrorAndArticle);
        wrapper = shallow(<ArticleSearch store={store}/>).dive();

        expect(wrapper.find('.ArticleSearch')).toHaveLength(1);
    });

    it('input should not have any class when error is false', () => {
        store = mockStore(mockStoreWithoutErrorAndArticle);
        wrapper = shallow(<ArticleSearch store={store}/>).dive();

        expect(wrapper.find('input').hasClass('reducedBottomMargin')).toBeFalsy();
    });

    it('input should have reducedBottomMargin when error is true', () => {
        store = mockStore(mockStoreWithError);
        wrapper = shallow(<ArticleSearch store={store}/>).dive();

        expect(wrapper.find('input').hasClass('reducedBottomMargin')).toBeTruthy();
    });

    it('should not render div with warning when error is false', () => {
        store = mockStore(mockStoreWithoutErrorAndArticle);
        wrapper = shallow(<ArticleSearch store={store}/>).dive();

        expect(wrapper.find('.warning')).toHaveLength(0);
    });

    it('should render div with warning when error is true', () => {
        store = mockStore(mockStoreWithError);
        wrapper = shallow(<ArticleSearch store={store}/>).dive();

        expect(wrapper.find('.warning')).toHaveLength(1);
    });


    it('should dispatch INIT_GET_ARTICLE action from searchForArticle method', () => {
        const fakeData = 'fakeValue';
        store = mockStore(mockStoreWithError);
        wrapper = shallow(<ArticleSearch store={store}/>).dive();

        wrapper.find('input').simulate('keydown', {key: 'Enter', target: {value: fakeData}});

        expect(store.getActions()).toEqual([{type: actionTypes.INIT_GET_ARTICLE, url: fakeData}]);
    });
});

const mockStoreWithVisibleArticle = {article: {isArticleShown: true, error: false}};
const mockStoreWithError = {article: {isArticleShown: false, error: true}};
const mockStoreWithoutErrorAndArticle = {article: {isArticleShown: false, error: false}};