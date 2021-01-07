import React, { useEffect, useState } from 'react'
import { Box, Button, Layer, Text } from 'grommet'
import axios from 'axios'
import _ from 'lodash'
import BookCard from './BookCard'
import { Alert } from 'grommet-icons'

/**
 * FavoriteBooks renders components related with
 * the user's favorite books.
 * 
 * @param {String} token User's token
 * 
 */
export default function FavoriteBooks(props) {
  const token = props?.token;

  const [error, setError] = useState('')
  const [favoriteBooks, setFavoriteBooks] = useState('');
  const [showErrorLayer, setShowErrorLayer] = useState(false);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://www.googleapis.com/books/v1/mylibrary/bookshelves',
      headers: {
          Authorization: `Bearer ${token}` 
      }
    })
    .then(response => {
      const favoriteBooksID = response?.data?.items.filter(favoriteBook => favoriteBook?.title === 'Favorites')[0];
      getFavoritesBooks(favoriteBooksID?.id);
    }).catch(e => {
      setError(e?.response?.data?.error?.message);
      setShowErrorLayer(true);
    });
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  async function getFavoritesBooks(bookshelfID) {
    axios({
      method: 'get',
      url: `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${bookshelfID}/volumes`,
      headers: {
          Authorization: `Bearer ${token}` 
      }
    })
    .then(response => {
      const favoriteBooks = response?.data?.items;
      setFavoriteBooks(favoriteBooks);
    }).catch(e => {
      setError(e?.response?.data?.error?.message);
      setShowErrorLayer(true);
    });
  };

  return(
    <Box fill style={{ marginTop: '3rem', marginLeft:'4%' }}>
      {
        _.isEmpty(favoriteBooks)
        ?
          <Text>Você ainda não tem livros favoritos :( </Text>
        :
          <Box gap='medium'>
            {
              favoriteBooks.map(book => {
                return <BookCard book={book} token={token} favoriteBooks />
              })
            }
          </Box>
      }
      {
        showErrorLayer &&
        <Layer onEsc={() => {
          setShowErrorLayer(false);
          }}
        >
          <Box pad='medium'>
            <Text><Alert color='red' style={{ marginRight: '1rem' }} />{error}</Text>
            <Button
              style={{ marginTop: '2rem' }}
              alignSelf='end'
              hoverIndicator
              onClick={() => setShowErrorLayer(false)}
            >
              Fechar
            </Button>
          </Box>
        </Layer>
        }
    </Box>
  );
};