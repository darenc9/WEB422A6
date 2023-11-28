import React from 'react'
import useSWR from 'swr'
import Error from 'next/error'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link'

export default function ArtworkCard({objectID}) {

    const { data, error } = useSWR(objectID && `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
    console.log(data);

    return (
        <>
        {error && <Error statusCode={404} />}
        
        { data ?
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={data.primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} />
                <Card.Body>
                    <Card.Title>{data.title || 'N/A'}</Card.Title>
                    <Card.Text>
                        <strong>Date: </strong> {data.objectDate || 'N/A'} <br />
                        <strong>Classification: </strong> {data.classification || 'N/A'} <br />
                        <strong>Medium: </strong> {data.medium || 'N/A'} <br />
                    </Card.Text>
                    <Link href={`/artwork/${objectID}`} passHref>
                        <Button variant="primary">View Details ({objectID})</Button>
                    </Link>
                </Card.Body>
            </Card>
            : null
        }
        
        </>
    )
}