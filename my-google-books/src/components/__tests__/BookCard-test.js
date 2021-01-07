import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import React from 'react';
import BookCard from '../BookCard'
import { GOOGLE_BOOKS_MOCK } from '../__mocks__/mocks'
import { Button, CardFooter, CardHeader, Layer } from 'grommet';
import { Star } from 'grommet-icons';

configure({ adapter: new Adapter() });

describe('<BookCard />', () => {
    const props = {
      token: 'Token123',
      book: GOOGLE_BOOKS_MOCK,
      favoriteBooks: false
    };
  
    let wrapper;
    beforeEach(() =>{
      wrapper = shallow(<BookCard {...props} />);
    });
  
    describe('Smoke', () => {
      test('Compara o componente com o snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  
    describe('Casos de uso', () => {
      test('Verifica se o livro é marcado com a cor amarela pois esta favoritado', () => {
        let newProps = Object.assign({}, props);
        newProps.favoriteBooks = true

        wrapper = shallow(<BookCard {...newProps} />);
        expect(wrapper.find(CardHeader).find(Button).prop('icon')).toMatchObject(<Star color="#e0e0eb" size="40px" />)
        expect(wrapper.find(Layer).exists()).toBeFalsy()
      });
  
      test('Verifica se ao clicar para ver mais detalhes o componente é renderizado corretamente', () => {
        expect(wrapper.find(Layer).exists()).toBeFalsy()

        wrapper.find(CardFooter).find(Button).simulate('click')
        expect(wrapper.find(Layer).exists()).toBeTruthy()
      });

      test('Verifica se os detalhes de um livro sao fechados quando o usuario clicar em Fechar', () => {
        wrapper.find(CardFooter).find(Button).simulate('click')
        expect(wrapper.find(Layer).exists()).toBeTruthy()

        wrapper.find(Layer).find(CardFooter).find(Button).at(1).simulate('click')
        expect(wrapper.find(Layer).exists()).toBeFalsy()
      });
    });
  });




