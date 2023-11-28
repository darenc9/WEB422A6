import React from 'react'
import { useRouter }from 'next/router'
import { Col, Row } from 'react-bootstrap'
import ArtworkCardDetail from '@/components/ArtworkCardDetail';

export default function ObjectID() {
    const router = useRouter();
    const objectID = router.query;
    console.log(objectID)
    return (
        <>
        <Row>
            <Col>
                <ArtworkCardDetail objectID={objectID.ObjectID} />
            </Col>
        </Row>
        </>
    )
}