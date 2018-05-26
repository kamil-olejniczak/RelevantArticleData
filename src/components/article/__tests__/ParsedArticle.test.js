import React from 'react';
import renderer from 'react-test-renderer';
import ParsedArticle from "../ParsedArticle";
import {shallow} from 'enzyme'

describe('ParsedArticle tests', () => {
    it('renders correctly', () => {
        const component = renderer.create(<ParsedArticle content={fakeData}/>).toJSON();

        expect(component).toMatchSnapshot();
    });

    it('should render provided html code', () => {
        const wrapper = shallow(<ParsedArticle content={fakeData}/>);

        expect(wrapper.find('div').prop('dangerouslySetInnerHTML')).toEqual({__html: fakeData});
    });
});

const fakeData = '<div><p>Fake Data</p></div>';
