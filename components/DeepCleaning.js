"use client";

import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { addOns } from '../assets/data';


function DeepCleaning() {
    return (
        <div>
            <div className='contentRow'>

                <div className='content-frame'>
                    <h2 style={{ color: 'black', textAlign: 'center', }}>Residential Home Deep Cleaning</h2>

                    <p style={{ color: 'black', }}>Choosing the right company to deep clean your home has never been easier and more affordable. Choose from our deep cleaning options and customize your experience. We can clean the entire home or only specific areas of the residence. The best part is you'll never go over your budget. Choose from out list of custom cleaning add-ons that are not included in our standard surface cleaning.</p>
                </div>

                <div className='content-frame'>
                    <img
                        src="https://images.pexels.com/photos/9462303/pexels-photo-9462303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Professional home cleaning service"
                        className='descriptionImage'
                    />
                </div>
            </div>

            <div style={{ padding: '0px 30px', }}>
                <h3>Deep Cleaning Add-Ons</h3>

                <Row xs={1} md={2} className="g-4">

                    {addOns.map((addOn, i) => (
                        <Col key={i} >
                            <Card 
                                text='black'>
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

