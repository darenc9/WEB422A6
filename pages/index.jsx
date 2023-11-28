/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Devon Chan Student ID: 066 869 132 Date: Oct 27, 2023
*
********************************************************************************/ 


import React from 'react'
import {Row, Col, Image} from 'react-bootstrap'

export default function Home() {
  return (
    <>
    <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" fluid rounded />
    <Row>
      <Col md={6}>
        <p>
        &quot;The Metropolitan Museum of Art in New York City, colloquially &quot;the Met&quot;,[a] is the largest art museum in the Americas. In 2022 it welcomed 3,208,832 visitors, ranking it the third most visited U.S museum, and eighth on the list of most-visited art museums in the world.[6] Its permanent collection contains over two million works,[1] divided among 17 curatorial departments.&quot;
        </p>
      </Col>
      <Col md={6}>
        <p>
        &quot;The Met&apos;s permanent collection is curated by seventeen separate departments, each with a specialized staff of curators and scholars, as well as six dedicated conservation departments and a Department of Scientific Research.[7] The permanent collection includes works of art from classical antiquity and ancient Egypt; paintings and sculptures from nearly all the European masters; and an extensive collection of American and modern art.&quot;
        </p>
      </Col>
    </Row>
    <Row>
    <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">-Metropolitan Museum of Art wiki page</a>
    </Row>
    
    </>
  )
}
