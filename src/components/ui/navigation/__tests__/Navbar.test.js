import renderer from 'react-test-renderer';
import * as React from "react";
import withNavbar from "../Navbar";
import {shallow} from 'enzyme';
import {Link, MemoryRouter} from 'react-router-dom';

const fakeFunction = jest.fn();
const FakeComponent = () => (
    <div>Hello</div>
);

describe('Navbar tests', () => {
    const Navbar = withNavbar(FakeComponent);
    const navbarWithFunction = (<Navbar clearArticle={fakeFunction}/>);
    let wrapper;

    it('renders correctly', () => {
        const component = renderer.create(
            <MemoryRouter>
                {navbarWithFunction}
            </MemoryRouter>
        ).toJSON();

        expect(component).toMatchSnapshot();
    });

    it('should render li tag to clear article data when clearArticle method is passed as prop', () => {
        wrapper = shallow(navbarWithFunction);

        expect(wrapper.find('li')).toHaveLength(2);
    });

    it('should render Link to "/" when clearArticle method is not provided', () => {
        wrapper = shallow(<Navbar/>);

        expect(wrapper.find(Link)).toHaveLength(2);
    });

    it('should spread props on wrapped component', () => {
        const propName = 'fakeProp';
        const expectedProp = {[propName]: '123456'};
        wrapper = shallow(<Navbar {...expectedProp}/>);

        expect(wrapper.find(FakeComponent).prop(propName)).toContain(expectedProp[propName]);
    });
});