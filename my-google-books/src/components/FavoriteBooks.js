import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { Box, Button, Text, TextInput } from 'grommet'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import _ from 'lodash'
import BookCard from './BookCard'

export default function FavoriteBooks(props) {
    const token = props?.token
    const [favoriteBooks, setFavoriteBooks] = useState('')
    // const location = useLocation()

    // const codeID = queryString.parse(location.search)?.code
    // const clientID = '855994734142-cdenn2tt65qi4qc6v6u5pih33dcn5ru2.apps.googleusercontent.com'
    // const clientSecret = 'yxc-OtQ5X_8RTvtedmy0P2zk'

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
            console.log('fail resp: ', e)
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
            console.log('response: ', response?.data)
            const favoriteBooks = response?.data?.items
            setFavoriteBooks(favoriteBooks)
        }).catch(e => {
            console.log('fail resp: ', e)
        })
    }

    return(<>
        {
            _.isEmpty(favoriteBooks) ?
            <Box alignContent='center' justify='center' align='center'>
                <Text size='xlarge'> A sua biblioteca está vazia :( </Text>
            </Box> :
            <Box gap='medium'>
                {
                    favoriteBooks.map(book => {
                        return <BookCard book={book} token={token} />
                    })
                }

            <Box gap='small' direction='row' width='18%'>
                <Button><u>Primeira</u></Button>
                <Button><u>Anterior</u></Button>
                <TextInput value={1} disabled textAlign='center' />
                <Button><u>Próxima</u></Button>
                <Button><u>Última</u></Button>
            </Box>
            </Box>
        }
        </>
    )

}