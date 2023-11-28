import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import Error from 'next/error'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link'
import { useAtom } from 'jotai'
import { favouritesAtom } from '../../store';
import { addToFavourites, removeFromFavourites } from '../../lib/userData';

export default function ArtworkCardDetail({objectID}) {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        setShowAdded( favouritesList?.includes(objectID))
    },[favouritesList]);

    const favouritesClicked = async () => {
        if (showAdded) {
            setFavouritesList(await removeFromFavourites(objectID));
            setShowAdded(false);
        }
        else if (!showAdded) {
            setFavouritesList(await addToFavourites(objectID));
            setShowAdded(true);
        }
    }

    const { data, error } = useSWR(objectID && `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
    console.log("****ArtworkCardDetail*****, objectID is: " + objectID);
    console.log(data);

    return (
        <>
        {error && <Error statusCode={404} />}
        
        { data ?
            <Card style={{ width: '18rem' }}>
                {data.primaryImage && 
                    <Card.Img variant="top" src={data.primaryImage || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} />
                }
                <Card.Body>
                    <Card.Title>{data.title || 'N/A'}</Card.Title>
                    <Card.Text>
                        <strong>Date: </strong> {data.objectDate || 'N/A'} <br />
                        <strong>Classification: </strong> {data.classification || 'N/A'} <br />
                        <strong>Medium: </strong> {data.medium || 'N/A'}
                        <br />
                        <br />
                        <strong>Artist Display Name: </strong> {data.artistDisplayName || 'N/A'}  <br />
                        {data.artistDisplayName &&
                            <div>
                                <strong>Artist Wikidata: </strong>
                                <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a> <br />
                            </div>
                        }
                        <strong>Credit Line: </strong> {data.creditLine || 'N/A'} <br />
                        <strong>Dimensions: </strong> {data.dimensions || 'N/A'} <br /> <br />
                        <Button onClick={favouritesClicked} variant={showAdded ? "primary" : "outline-primary"}>
                            <div>{showAdded ? "+ Favourite (added)" : "+ Favourite"}</div>
                        </Button>
                    </Card.Text>
                </Card.Body>
            </Card>
            : null
        }
        
        </>
    )
}