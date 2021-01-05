import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Image, Text, TextInput, ResponsiveContext, Tabs, Tab } from 'grommet'
import { useLocation } from 'react-router';
import { FormSearch, Star } from 'grommet-icons';
import axios from 'axios'
import queryString from 'query-string'
import { useDispatch } from 'react-redux';
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
            console.log('error google books: ', err)
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
            <Box>
                Olar, Fulanito! Seje welcome à My Google Books!
            </Box>
            <Box>
                <Tabs style={{ marginLeft: '0px', border: 'small' }}>
                    <Tab title="Pesquisar Por livros">

                        <Box direction='row' alignContent='start' margin='small' justify='start' style={{ width: '30%' }}>
                            <TextInput placeholder='Ex.: Senhor dos Aneis, Tolkien, Gandalf...' value={text} onChange={event => setText(event.target.value)} size='medium' style={{ width: '99%' }} />
                            <Button icon={<FormSearch size='40px' />} onClick={() => searchBooks(0)} />
                        </Box>

                    {
                        _.isEmpty(books) ?
                        <Box alignContent='center' justify='center' align='center'>
                            <Text size='xlarge'> A sua biblioteca está vazia :( </Text>
                        </Box> :
                        <Box gap='medium'>
                            {
                                books.map(book => {
                                    return <BookCard book={book} token={token} />
                                })

                                
                            }
                        
                        <Box direction='row'>
                            {
                                !_.isEmpty(books) &&
                                pageNumbers.map(paginationNumber => {
                                    const { number, startIndex } = paginationNumber
                                    return <Button style={{ marginRight:'1rem' }} onClick={() => searchBooks(startIndex)}>{number}</Button>
                                })
                            }

                        </Box>

                        {

                        }
                        </Box>
                    }
                    </Tab>
                    <Tab title="Ver Meus Favoritos">
                        {/* <Box pad="medium">Ver Meus Favoritos</Box> */}
                        <FavoriteBooks token={token} />
                    </Tab>
                </Tabs>
            </Box>
            {/* <Text style={{ marginLeft: '10px' }}> Pesquisar Livros: </Text>
            <Box direction='row' alignContent='start' margin='small' justify='start' pad='none' style={{ width: '70%', marginRight: 0 }}>
                <TextInput placeholder='Ex.: Senhor dos Aneis, Tolkien, Gandalf...' value={text} onChange={event => setText(event.target.value)} size='medium' style={{ width: '99%' }} />
                <Button icon={<FormSearch size='40px' />} onClick={() => searchBooks()} />
            </Box>

            {
                _.isEmpty(books) ?
                <Box fill alignContent='center' justify='center' align='center' overflow='hidden'>
                    <Text size='xlarge'> A sua biblioteca está vazia :( </Text>
                </Box> :
                <Box gap='large' width='35%'>
                    {
                        books.map(book => {
                            return <BookCard book={book} token={token} />
                        })
                    }

                <Box gap='small' direction='row' width='65%'>
                    <Button><u>Primeira</u></Button>
                    <Button><u>Anterior</u></Button>
                    <TextInput value={1} disabled textAlign='center' />
                    <Button><u>Próxima</u></Button>
                    <Button><u>Última</u></Button>
                </Box>
                </Box>
            } */}
        </Box>
    )
    
}