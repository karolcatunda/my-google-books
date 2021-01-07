import React, { useEffect, useState } from 'react';
import { Box, Button, Text, TextInput, Grid, Nav, Sidebar, Layer } from 'grommet'
import { useLocation } from 'react-router';
import { Alert, Bookmark, FormSearch, Search } from 'grommet-icons';
import axios from 'axios'
import queryString from 'query-string'
import _ from 'lodash'
import BookCard from '../components/BookCard';
import FavoriteBooks from '../components/FavoriteBooks';

/**
 * Home renders a header, sidebar and main layers.
 * It is also responsible to capture the token to be used
 * to add a favorite book and to show the user's favorite ones
 */
export default function Home() {
  const location = useLocation();

  const [text, setText] = useState('');
  const [token, setToken] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('')
  const [totalBooks, setTotalBooks] = useState('');
  const [showSearch, setShowSearch] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showErrorLayer, setShowErrorLayer] = useState(false);

  const codeID = queryString.parse(location.search)?.code;
  const clientID = '855994734142-cdenn2tt65qi4qc6v6u5pih33dcn5ru2.apps.googleusercontent.com';
  const clientSecret = 'yxc-OtQ5X_8RTvtedmy0P2zk';
  const GENERIC_ERROR_MSG = 'Um erro inesperado aconteceu. Tente logar novamente.'

  useEffect(() => {
    axios({
        method: 'post',
        url: 'https://oauth2.googleapis.com/token',
        data: queryString.stringify({
          code: codeID,
          client_id: clientID,
          client_secret: clientSecret,
          redirect_uri: 'http://localhost:3000/home',
          grant_type: 'authorization_code'
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
    })
      .then(response => {
        setToken(response.data.access_token);
      }).catch(e => {
        setError(GENERIC_ERROR_MSG);
        setShowErrorLayer(true);
      });
  }, [codeID]);

  async function searchBooks(index) {
    axios({
      method: 'get',
      url: `https://www.googleapis.com/books/v1/volumes?q=${text}&startIndex=${index}&maxResults=20`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => {
        setBooks(resp?.data?.items);
        setTotalBooks(resp?.data.totalItems);
      }).catch(e => {
        setError(e?.response?.data?.error?.message);
        setShowErrorLayer(true);
      });
  };

  const pageNumbers = [];
  let startIndexCount = 0
  const itemsPerPage = 20

  for (let paginationNumber = 1; paginationNumber <= Math.ceil(totalBooks / itemsPerPage); paginationNumber++) {
    if (paginationNumber !== 1) startIndexCount = startIndexCount + itemsPerPage
    const pagination = {
      number: paginationNumber,
      startIndex: startIndexCount
    };

    pageNumbers.push(pagination);
  }

  function showSearchBookLayer() {
    setShowSearch(true);
    setShowFavorites(false);
  }

  function showFavoriteLayer() {
    setShowSearch(false);
    setShowFavorites(true);
  }

  return (
    <Grid
      rows={['70px', 'auto']}
      columns={['min-content', 'auto']}
      style={{ minHeight: '100vh' }}
      areas={[
        { name: 'header', start: [0, 0], end: [1, 1] },
        { name: 'sidebar', start: [0, 1], end: [0, 1] },
        { name: 'main', start: [1, 1], end: [1, 1] },
      ]}
    >

      <Box gridArea="header" background="brand" direction='row' justify='center' align='center'>
        <Box
          height='40px'
          width='40px'
          background={`url(${process.env.PUBLIC_URL}/book-icon.png)`}
          style={{ marginRight: '0.5rem' }}
        />
        <Text>Meu Google Books</Text>
      </Box>

      <Box gridArea="sidebar" background="white" size='small'>
        <Sidebar round='small'>
          <Nav gap='medium' width='15rem'>
            <Box
              direction='row'
              style={{ padding: '7px' }}
            >
              <Button onClick={() => showSearchBookLayer()}>
                <Search color='blue' />
                <Text
                  size={'medium'}
                  style={{ whiteSpace: 'nowrap' }}
                  margin={{ left: 'small', right: 'small' }}
                  weight={'normal'}
                >
                  Pesquisar Livros
                </Text>
              </Button>
            </Box>
            <Box
              direction='row'
              style={{ padding: '7px' }}
            >
              <Button onClick={() => showFavoriteLayer()}>
                <Bookmark color='yellow' />
                <Text
                  size={'medium'}
                  style={{ whiteSpace: 'nowrap' }}
                  margin={{ left: 'small', right: 'small' }}
                  weight={'normal'}
                >
                  Meus Livros Favoritos
                </Text>
              </Button>
            </Box>
          </Nav>
        </Sidebar>
      </Box>

      <Box gridArea="main" background="light-2">
        {
          showSearch &&
          <Box>
            <Box direction='row' width='large' pad='medium'>
              <TextInput
                style={{ marginTop: '0.4rem', marginLeft: '0.5rem' }}
                size='medium'
                placeholder='Ex.: Star Wars, Luke Skywalker, George Lucas...'
                value={text}
                onChange={event => setText(event.target.value)}
              />
              <Button icon={<FormSearch size='40px' />} onClick={() => searchBooks(0)} />
            </Box>
            {
              !_.isEmpty(books) &&
                <Box gap='medium' style={{ marginLeft: '4rem' }}>
                  {
                    books.map(book => {
                      return <BookCard book={book} token={token} />
                    })
                  }
                </Box>
            }
            <Box direction='row' style={{ marginTop: '2rem', marginLeft: '1rem' }}>
              {
                !_.isEmpty(books) &&
                  pageNumbers.map(paginationNumber => {
                    const { number, startIndex } = paginationNumber
                    return <Button style={{ marginRight: '1rem' }} onClick={() => searchBooks(startIndex)}>{number}</Button>
                  })
              }
            </Box>
          </Box>
        }
        {
          showFavorites &&
          <FavoriteBooks token={token} />
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
    </Grid>
  );
};