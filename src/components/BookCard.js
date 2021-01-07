import axios from 'axios'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Image, Layer, Text } from 'grommet'
import { Alert, Star } from 'grommet-icons'
import React, { useEffect, useState } from 'react'

/**
 * BookCard renders a Card component to show the sumarized or full info
 * about the books based on the context (in this case search page or favorites page)
 * 
 * @param {String} token User's token
 * @param {Object} book An book object from Google Books API
 * @param {boolean} favoriteBooks A boolean if the book was favorite or not
 * 
 */
export default function BookCard(props) {
  const token = props?.token
  const book = props?.book
  const favoriteBooks = props?.favoriteBooks
  
  const yellowColor = '#ffcc00'
  const defaultColor = '#e0e0eb'

  const [bookDetailsLayerVisible, setBookDetailsLayerVisible] = useState(false)
  const [bookFavoriteColor, setBookFavoriteColor] = useState(defaultColor)
  const [showErrorLayer, setShowErrorLayer] = useState(false);
  const [error, setError] = useState('')

  useEffect(() => {
    if (favoriteBooks) setBookFavoriteColor(yellowColor)
  }, [favoriteBooks])

  async function addBookToFavorite(volumeID) {
    axios({
      method: 'post',
      url: `https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/addVolume?volumeId=${volumeID}`,
      headers: {
          Authorization: `Bearer ${token}` 
      }
    })
    .then(() => {
      setBookFavoriteColor(yellowColor)
    }).catch(e => {
      setError(e?.response?.data?.error?.message);
      setShowErrorLayer(true);
    })
  }

  const { volumeInfo, searchInfo, id } = book
  const { title, authors, publishedDate, imageLinks } = volumeInfo

  const regex = /(<([^>]+)>)/ig

  return(
    <Card background="light-1" width='medium'>
      <CardHeader pad="large" direction='row' alignContent='start'>
        <Image src={imageLinks?.smallThumbnail} />
        <Box direction='column' width='large'>
          <Text>Título: {title}</Text>
        </Box>
        <Button
          icon={<Star color={bookFavoriteColor} size='40px'/>}
          style={{ marginBottom: '160px' }}
          onClick={() => favoriteBooks ? undefined : addBookToFavorite(id)}
        />
      </CardHeader>

      <CardFooter
        pad={{horizontal: "small"}}
        background="light-2"
        height='4rem'
        justify='center'
      >
        <Button hoverIndicator onClick={() => setBookDetailsLayerVisible(true)}> Ver Mais Detalhes </Button>
        {
          bookDetailsLayerVisible &&
          <Box>
            <Layer margin='small' style={{ width: '30%' }} onEsc={() => {
                setBookDetailsLayerVisible(false);
              }}
            >
            <Box>
              <Card background="light-1">
                <CardHeader pad="medium" direction='row' alignContent='start'>
                  <Image src={imageLinks?.smallThumbnail} />
                  <Box direction='column' width='xlarge'>
                    <Text>Título: {title}</Text>
                    <Text>Autor: {authors.join()}</Text>
                    <Text>Ano: {publishedDate}</Text>
                  </Box>
                    <Button
                      icon={<Star color={bookFavoriteColor}
                      size='40px'/>}
                      style={{ marginBottom: '160px' }}
                      onClick={() => favoriteBooks ? undefined : addBookToFavorite(id)}
                    />
                </CardHeader>

                <CardBody pad="medium" >
                  {searchInfo?.textSnippet.replace(regex, '').replace(/&nbsp;/g, '').toString()}
                </CardBody>

                <CardFooter pad={{horizontal: "small"}} background="light-2" height='4rem' justify='center'>   
                  <Button
                    style={{ marginRight: '12rem' }}
                    hoverIndicator
                    onClick={() => window.location.href = `https://books.google.com.br/books?id=${id}`}
                  >
                    Ler Livro No Google Books
                  </Button>
                  <Button hoverIndicator onClick={() => setBookDetailsLayerVisible(false)}> Fechar </Button>
                </CardFooter>

              </Card>
            </Box>
            </Layer>
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
      </CardFooter>
    </Card>
  )
}