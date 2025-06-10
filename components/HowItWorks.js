"use client"

import React from 'react'
import { steps } from '../assets/data'
import { Accordion } from 'react-bootstrap'

function HowItWorks() {
    return (
        <div className="container text-center px-5" style={{marginTop:'20px',}}>
            <h3 className='text-center'>How it Works</h3>
            {steps.map((step, i) => (
                <Accordion key={i}>
                    <Accordion.Item eventKey={step.id}>
                        <Accordion.Header>Step {step.id}: {step.step}</Accordion.Header>
                        <Accordion.Body>
                            {step.description}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            ))}
        </div>
    )
}

export default HowItWorks