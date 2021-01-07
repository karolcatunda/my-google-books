import React, { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'
import axios from 'axios'
import _ from 'lodash'
import BookCard from './BookCard'

export default function FavoriteBooks(props) {
  const token = props?.token
  const [favoriteBooks, setFavoriteBooks] = useState('')
  const [error, setError] = useState('')
  const [displayErrorLayer, setDisplayErrorLayer] = useState(false)

  useEffect(() => {
      axios({
          method: 'get',
          url: 'https://www.googleapis.com/books/v1/mylibrary/bookshelves',
          headers: {
              Authorization: `Bearer ${token}` 
          }
      })
      .then(response => {
          const favoriteBooksID = response?.data?.items.filter(favoriteBook => favoriteBook?.title === 'Favorites')[0]
          getFavoritesBooks(favoriteBooksID?.id)
      }).catch(e => {
          setError(e?.response?.data?.error?.message)
          setDisplayErrorLayer(true)
      })
  }, [token])

  async function getFavoritesBooks(bookshelfID) {
      axios({
          method: 'get',
          url: `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${bookshelfID}/volumes`,
          headers: {
              Authorization: `Bearer ${token}` 
          }
      })
      .then(response => {
          const favoriteBooks = response?.data?.items
          setFavoriteBooks(favoriteBooks)
      }).catch(e => {
          
      })
  }

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
      </Box>
  )

}