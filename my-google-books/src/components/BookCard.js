import axios from 'axios'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Image, Layer, Text } from 'grommet'
import { Star } from 'grommet-icons'
import React, { useEffect, useState } from 'react'
import BookDetailsLayer from './BookDetailsLayer'

export default function BookCard(props) {
    const token = props?.token
    const book = props?.book
    const [bookDetailsLayerVisible, setBookDetailsLayerVisible] = useState(false)

    // useEffect(() => {
    //     console.log('olar mundo: ')
    // }, [bookDetailsLayerVisible])

    async function addBookToFavorite(volumeID) {
        axios({
            method: 'get',
            url: `https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/addVolume?volumeId=${volumeID}`,
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        .then(resp => {
            console.log('adding favorites: ', resp)
            // setBooks(resp?.data?.items)
        }).catch(err => {
            console.log('error google books: ', err)
        })
    }

    function showBookDetails() {
        setBookDetailsLayerVisible(true)
        return <BookDetailsLayer />
    }


    const { volumeInfo, searchInfo, id } = book
    const { title, authors, publishedDate, imageLinks } = volumeInfo

    return(
        <Card background="light-1" width='medium'>
            <CardHeader pad="medium" direction='row' alignContent='start'>
                <Image src={imageLinks?.smallThumbnail} />
                <Box direction='column' width='large'>
                    <Text>Título: {title}</Text>
                </Box>
                <Button icon={<Star color='#e0e0eb' size='40px'/>} style={{ marginBottom: '160px' }} onClick={() => addBookToFavorite(id)} />
            </CardHeader>
            <CardFooter pad={{horizontal: "small"}} background="light-2" height='4rem' justify='center'>   
                <Button hoverIndicator onClick={() => setBookDetailsLayerVisible(true)}> Ver Mais Detalhes </Button>
                {
                   bookDetailsLayerVisible &&
                   <Box>
                        <Layer margin='small' style={{ width: '30%' }} onEsc={() => {
                            setBookDetailsLayerVisible(false)
                        }}>
                            <Box>
                                <Card background="light-1">
                                    <CardHeader pad="medium" direction='row' alignContent='start'>
                                        <Image src={imageLinks?.smallThumbnail} />
                                        <Box direction='column' width='xlarge'>
                                            <Text>Título: {title}</Text>
                                            <Text>Autor: {authors}</Text>
                                            <Text>Ano: {publishedDate}</Text>
                                        </Box>
                                        <Button icon={<Star color='#e0e0eb' size='40px'/>} style={{ marginBottom: '160px' }} onClick={() => addBookToFavorite(id)} />
                                    </CardHeader>
                                    <CardBody pad="medium" >
                                        <Text>Texto Encontrado:<br /> {searchInfo?.textSnippet}</Text>
                                    </CardBody>
                                    <CardFooter pad={{horizontal: "small"}} background="light-2" height='4rem' justify='center'>   
                                        <Button hoverIndicator onClick={() => window.location.href = `https://books.google.com.br/books?id=${id}`}> Ler Livro No Google Books </Button>
                                        <Button hoverIndicator onClick={() => setBookDetailsLayerVisible(false)}> Fechar </Button>
                                    </CardFooter>
                                </Card>
                            </Box>
                        </Layer>
                    </Box>
                }
            </CardFooter>
        </Card>
    )
}