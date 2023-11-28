import React from 'react'
import { favouritesAtom } from '../store'
import { useAtom } from 'jotai'
import {Card, Row, Col} from 'react-bootstrap'
import ArtworkCard from '@/components/ArtworkCard'

export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    if (!favouritesList) return null;
    return (
        <>
        { favouritesList.length == 0
            ? (
                <Card>
                    <Card.Body>
                        <Card.Title>Nothing Here</Card.Title>
                        <Card.Text>Try adding some new artwork to the list.</Card.Text>
                    </Card.Body>
                </Card>
            )
            : (
                <Row className='gy-4'>
                    {favouritesList.map((currentObjectID) => (
                        <Col lg={3} key={currentObjectID}>
                            <ArtworkCard objectID={currentObjectID} />
                        </Col>
                    ))}
                </Row>
            )
        
        }
        
        </>
    )
}