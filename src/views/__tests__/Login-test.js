import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import React from 'react';
import Login from '../Login'

configure({ adapter: new Adapter() });

describe('<Login />', () => {

    let wrapper;
    beforeEach(() =>{
      wrapper = shallow(<Login />);
    });
  
    describe('Smoke', () => {
      test('Compara o componente com o snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
});