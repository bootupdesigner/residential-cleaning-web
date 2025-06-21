"use client"

import React from 'react'

function PriceGrid() {
    return (
        <div className="container text-center px-5" style={{marginTop:'20px',}}>

            <h3>Home Cleaning Prices</h3>

            <p>Sign up for an Instant Quote!</p>

            <div className="row row-cols-5 g-4">

                <div className="col"></div>

                <div className="col align-content-center justify-content-center align-items-center border border-danger ">1 Bd</div>

                <div className="col align-content-center justify-content-center align-items-center border border-success">2 Bd</div>

                <div className="col align-content-center justify-content-center align-items-center border border-primary">3 Bd</div>

                <div className="col align-content-center justify-content-center align-items-center border border-warning">4 Bd</div>


                <div className="col align-content-center justify-content-center align-items-center border border-primary-subtle">1 Br</div>

                <div className="col align-content-center justify-content-center align-items-center border border-danger">$150</div>

                <div className="col align-content-center justify-content-center align-items-center border border-success">$185</div>

                <div className="col align-content-center justify-content-center align-items-center border border-primary">$220</div>

                <div className="col align-content-center justify-content-center align-items-center border border-warning">$255</div>


                <div className="col align-content-center justify-content-center align-items-center border border-primary-subtle">2 Br</div>

                <div className="col align-content-center justify-content-center align-items-center border border-danger">$175</div>

                <div className="col align-content-center justify-content-center align-items-center border border-success">$210</div>

                <div className="col align-content-center justify-content-center align-items-center border border-primary">$245</div>

                <div className="col align-content-center justify-content-center align-items-center border border-warning">$280</div>


                <div className="col align-content-center justify-content-center align-items-center border border-primary-subtle">3 Br</div>

                <div className="col align-content-center justify-content-center align-items-center border border-danger">$200</div>

                <div className="col align-content-center justify-content-center align-items-center border border-success">$235</div>

                <div className="col align-content-center justify-content-center align-items-center border border-primary">$270</div>

                <div className="col align-content-center justify-content-center align-items-center border border-warning">$305</div>


                <div className="col align-content-center justify-content-center align-items-center border border-primary-subtle">4 Br</div>

                <div className="col align-content-center justify-content-center align-items-center border border-danger">$225</div>

                <div className="col align-content-center justify-content-center align-items-center border border-success">$260</div>

                <div className="col align-content-center justify-content-center align-items-center border border-primary">$295</div>

                <div className="col align-content-center justify-content-center align-items-center border border-warning">$330</div>

            </div>

        </div>
    )
}

export default PriceGrid