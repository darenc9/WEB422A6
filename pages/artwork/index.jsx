/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Devon Chan Student ID: 066 869 132 Date: Oct 27, 2023
*
********************************************************************************/ 

import React, { useState, setState, useEffect } from 'react'
import Error from 'next/error'
import useSWR from 'swr'
import { usePathname, useSearchParams } from 'next/navigation'
import {Card, Row, Col, Pagination} from 'react-bootstrap'
import ArtworkCard from '@/components/ArtworkCard'
import validObjectIDList from '../../public/data/validObjectIDList.json'

const PER_PAGE = 12
export default function Artwork() {
    const [artworkList, setArtworkList] = useState(null);
    const [page, setPage] = useState(1);
    const [url, setUrl] = useState('');
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    useEffect(() => {
        setUrl(`${pathname}?${searchParams}`)
    }, [pathname, searchParams])

    let finalQuery = url.split('?')[1];

    const {data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

    const previousPage = () => {(page > 1 && setPage(page-1))};
    const nextPage = () => {(page < artworkList.length && setPage(page+1))};

    useEffect(() => {
        if (data) {
            const results = [];
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }            
            setArtworkList(results);
            setPage(1);
        }
    }, [data])

    if (error)
        return <Error statusCode={404} />

    if (artworkList === null || artworkList === undefined) {
        return null;
        }

    return(
        <>
        { artworkList.length > 0 
            ? (
                <Row className='gy-4'>
                    {artworkList[page-1].map((currentObjectID) => (
                        <Col lg={3} key={currentObjectID}>
                            <ArtworkCard objectID={currentObjectID} />
                        </Col>
                    ))}

                </Row>
            )
            : (
                <Card>
                    <Card.Body>
                        <Card.Title>Nothing Here</Card.Title>
                        <Card.Text>Try searching for something else.</Card.Text>
                    </Card.Body>
                </Card>
            )
        }
        { artworkList.length > 0
            && (
                <Row>
                    <Col>
                        <Pagination>
                            <Pagination.Prev onClick={previousPage} disabled={page === 1} />
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={nextPage} />
                        </Pagination>
                    </Col>
                </Row>
            ) 
        }
        </>
    )
}