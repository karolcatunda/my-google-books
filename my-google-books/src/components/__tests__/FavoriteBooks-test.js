import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import React from 'react';
import FavoriteBooks from '../FavoriteBooks'

configure({ adapter: new Adapter() });

describe('<FavoriteBooks />', () => {
    const props = {
      token: 'Token123'
    };
  
    let wrapper;
    beforeEach(() =>{
      wrapper = shallow(<FavoriteBooks {...props} />);
    });
  
    describe('Smoke', () => {
      test('Compara o componente com o snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
});




