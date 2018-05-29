import {shallow} from 'enzyme';
import TagStatistics from "../TagStatistics";
import React from 'react';
import renderer from 'react-test-renderer';
import {fakeSortedTagStatistics, fakeTagStatistics} from "../../../utils/__fixtures__/fakeData";

describe('TagStatistics tests', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<TagStatistics tagStats={fakeTagStatistics}/>);
    });

    it('renders correctly', () => {
        const component = renderer.create(<TagStatistics tagStats={fakeTagStatistics}/>).toJSON();

        expect(component).toMatchSnapshot();
    });

    it('should render 11 table rows, including table header', () => {
        expect(wrapper.find('tr')).toHaveLength(11);
    });

    it('should order tags by frequency of their occurrences', () => {
        const rows = wrapper.find('tr');
        const rowColumns = rows.find('td').map(column => column.text());

        rowColumns.forEach((column, index) => {
            expect(column).toEqual(fakeSortedTagStatistics[index]);
        });
    });
});