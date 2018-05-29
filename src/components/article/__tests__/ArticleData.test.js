import * as React from "react";
import ArticleData from '../ArticleData';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import * as actionTypes from '../../../store/actions/actionTypes';
import {fakeArticleData} from '../../../utils/__fixtures__/fakeData';

describe('ArticleData tests', () => {
    const mockStore = configureStore();

    let wrapper, store;

    beforeEach(() => {
        store = mockStore(fakeData);
        wrapper = shallow(<ArticleData store={store} data={fakeData.data}/>).dive();
    });

    it('renders correctly', () => {
        const component = renderer.create(
            <ArticleData store={store} data={fakeData.data}/>)
            .toJSON();

        expect(component).toMatchSnapshot();
    });

    it('should not render div with article data when modal is closed', () => {
        wrapper = shallow(
            <ArticleData store={store} data={fakeData.data} isModalClosedByUser={true}/>).dive();

        expect(wrapper.find('div.ArticleData')).toHaveLength(0);
    });

    it('should render all paragraphs for provided data', () => {
        expect(wrapper.find('p')).toHaveLength(7);
    });

    it('should dispatch CLOSE_MODAL action when user dismisses modal', () => {
        wrapper = shallow(<ArticleData store={store} data={fakeData.data}/>).dive();
        wrapper.find('#close').simulate('click');

        const actions = store.getActions();
        const expectedPayload = { type: actionTypes.CLOSE_MODAL };

        expect(actions).toEqual([expectedPayload]);
    });
});

const fakeData = {
    ...fakeArticleData
};