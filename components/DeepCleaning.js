"use client";

import React from 'react'
import { ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { addOns } from '../assets/data';


function DeepCleaning() {
    return (
        <div style={{ margin: '25px 0px' }}>

            <div className='cleaningDescription'>
                <h2 style={{ color: 'black', textAlign: 'center', }}>Residential Home Deep Cleaning</h2>

                <p style={{ color: 'black', }}>Choosing the right company to deep clean your home has never been easier and more affordable. Choose from our deep cleaning options and customize your experience. We can clean the entire home or only specific areas of the residence. The best part is you'll never go over your budget. Choose from out list of custom cleaning add-ons that are not included in our standard surface cleaning.</p>
            </div>

            <div style={{ padding: '0px 30px', }}>
                <h3>Deep Cleaning Add-Ons</h3>

                <Row xs={1} md={2} className="g-4">

                    {addOns.map((addOn, i) => (
                        <Col key={i} >
                            <Card bg='info'
                                text='white'>
                                <Card.Body>
                                    <Card.Title>{addOn.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Add-on ${addOn.price}</Card.Subtitle>
                                    <Card.Text>{addOn.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default DeepCleaning;

