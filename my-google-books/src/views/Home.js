import React, { useEffect, useState } from 'react';
import { Box, Button, Text, TextInput, Tabs, Tab } from 'grommet'
import { useLocation } from 'react-router';
import { FormSearch } from 'grommet-icons';
import axios from 'axios'
import queryString from 'query-string'
import _ from 'lodash'
import BookCard from '../components/BookCard';
import FavoriteBooks from '../components/FavoriteBooks';

export default function Home() {
    const [text, setText] = useState('')
    const [token, setToken] = useState('')
    const [totalBooks, setTotalBooks] = useState('')
    const [requestSearch, setRequestSearch] = useState(false)
    const [books, setBooks] = useState([])
    const location = useLocation()

    const codeID = queryString.parse(location.search)?.code
    const clientID = '855994734142-cdenn2tt65qi4qc6v6u5pih33dcn5ru2.apps.googleusercontent.com'
    const clientSecret = 'yxc-OtQ5X_8RTvtedmy0P2zk'

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
            console.log('response.data: ', response.data)
            setToken(response.data.access_token)
        }).catch(e => {
            
        })
    }, [requestSearch])

    async function searchBooks(index) {
        if (_.isEmpty(token)) setRequestSearch(true)
        axios({
            method: 'get',
            url: `https://www.googleapis.com/books/v1/volumes?q=${text}&startIndex=${index}&maxResults=20`,
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        .then(resp => {
            setTotalBooks(resp?.data.totalItems)
            setBooks(resp?.data?.items)
        }).catch(err => {
            console.log('error')
        })
    }

    const pageNumbers = [];
    let startIndexCount = 0

    for (let i = 1; i <= Math.ceil(totalBooks / 20); i++) {
        if (i !== 1) startIndexCount = startIndexCount + 20
        const pagination = {
            number: i,
            startIndex: startIndexCount
        }
        pageNumbers.push(pagination);
    }
    
    return(
        <Box pad='medium' fill overflow='hidden' full='vertical'>
            <Box direction='row'>
                <Box height='40px' width='40px' background={`url(${process.env.PUBLIC_URL}/book-icon.png)`} style={{ marginRight: '0.5rem' }} />
                <Text style={{ marginTop: '0.5rem' }}>Meu Google Books</Text>
            </Box>
            <Box>
                <Tabs style={{ marginLeft: '0px' }} align='start' style={{ marginTop: '2%' }}>
                    <Tab title="Pesquisar por livros">
                        <Box style={{ marginLeft: '8%' }} fill> 
                            <Box direction='row' alignContent='start' style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                                <TextInput placeholder='Ex.: Senhor dos Aneis, Tolkien, Gandalf...' value={text} onChange={event => setText(event.target.value)} size='medium' style={{ marginTop: '10px', width: '30rem'}} />
                                <Button icon={<FormSearch size='40px' />} onClick={() => searchBooks(0)} style={{ marginTop: '4px' }} />
                            </Box>

                            {
                                !_.isEmpty(books) &&
                                <Box gap='medium'>
                                    {
                                        books.map(book => {
                                            return <BookCard book={book} token={token} />
                                        })
                                    }
                                </Box>
                            }
                            
                            <Box direction='row' style={{ marginTop: '1rem' }}>
                                {
                                    !_.isEmpty(books) &&
                                    pageNumbers.map(paginationNumber => {
                                        const { number, startIndex } = paginationNumber
                                        return <Button style={{ marginRight:'1rem' }} onClick={() => searchBooks(startIndex)}>{number}</Button>
                                    })
                                }
                            </Box>
                        </Box>
                    </Tab>
                    <Tab title="Ver Meus Favoritos">
                        <FavoriteBooks token={token} />
                    </Tab>
                </Tabs>
            </Box>
        </Box>
    )
    
}