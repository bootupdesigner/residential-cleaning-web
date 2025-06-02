"use client";

import React from 'react'
import { ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const addOns = [
    {
        id: 1,
        title: `Window Cleaning`,
        description: `Let the light shine through, with our streak free window cleaning add-on. Add window cleaning to your service and recieve an extra shine when you open your blinds.`,
    },
    {
        id: 2,
        title: `Stove / Oven Cleaning`,
        description: ``,
    },
    {
        id: 3,
        title: `Ceiling Fans Cleaning`,
        description: ``,
    },
    {
        id: 4,
        title: `Baseboard Cleaning`,
        description: ``,
    }
]
function CleaningServices() {
    return (
        <div style={{ paddingTop: 10, }}>

            <div className='contentRow' >



                <div className='content-frame'>
                    <h2 style={{ color: 'orange', }}>Residential Home Deep Cleaning</h2>
                    <p>Choosing the right company to deep clean your home has never been easier and more affordable. Choose from our deep cleaning options and customize your experience. We can clean the entire home or only specific areas of the residence. The best part is you'll never go over your budget. Choose from out list of custom cleaning add-ons that are not included in our standard surface cleaning.</p>

                    {addOns.map((addOn, i) => (
                        <Card
                        border='warning'
                            key={i}
                            style={{
                                width:'18rem',
                                padding:10,
                                
                            }}>

                            <ListGroup variant='flush'>
                                <ListGroup.Item >{addOn.title}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    ))}
                </div>

                <div className='content-frame'>
                    <h3>Deep Cleaning Add-Ons</h3>

                    <Row xs={1} md={2} className="g-4">

                        {addOns.map((addOn, i) => (
                            <Col key={i} >
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{addOn.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Add-on</Card.Subtitle>
                                        <Card.Text>{addOn.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                </div>
            </div>
        </div>
    )
}

export default CleaningServices