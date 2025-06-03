"use client";

import React from 'react'
import { ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { SurfaceCleaning } from '../assets/data';


function StandardCleaning() {
    return (
        <div>
            <div className='contentRow'>

                <div className='content-frame'>
                    <h2 style={{ color: 'black', textAlign: 'center', }}>Residential Home Standard Cleaning</h2>

                    <p style={{ color: 'black', }}>Choosing the right company to deep clean your home has never been easier and more affordable. Choose from our deep cleaning options and customize your experience. We can clean the entire home or only specific areas of the residence. The best part is you'll never go over your budget. Choose from out list of custom cleaning add-ons that are not included in our standard surface cleaning.</p>
                </div>

                <div className='content-frame'>
                    <img
                        src="https://images.pexels.com/photos/32372038/pexels-photo-32372038/free-photo-of-modern-cozy-minimalist-bedroom-interior-design.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Professional home cleaning service"
                        className='descriptionImage'
                    />
                </div>
            </div>

            <div style={{ padding: '0px 30px', }}>
                <h3>Surface Cleaning</h3>

                <Row xs={1} md={2} className="g-4">

                    {SurfaceCleaning.map((surface, i) => (
                        <Col key={i} >
                            <Card
                                text='black'>
                                <Card.Body>
                                    <Card.Title>{surface.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Surface Cleaning</Card.Subtitle>
                                    <Card.Text>{surface.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default StandardCleaning;

