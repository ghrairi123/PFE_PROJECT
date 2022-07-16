import React, { Component } from 'react'
import './style.css'

export class Confirm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const {
            values: { name, email, phone, password, facebook, twitter, github }
        } = this.props;

        return (
            <div class="movie-facility padding-bottom padding-top"  style={{  paddingTop: "50px"}}>
        <div class="container">
            <div class="row" style={{display: "flex",
                flexWrap: "wrap",
                marginRight: "-558px",
                marginLeft: "-55px"}}>
                <div class="col-lg-8">
                <div class="row" >
                <div id="tabsWithIcons" class="col-lg-12 col-12 layout-spacing" >
                            <div class="statbox widget box box-shadow" style={{backgroundImage: `url("assets/images/account/account-bg.jpg")` ,paddingTop: "50px"}}>
                              
                            <div class="tab-content" id="rounded-pills-icon-tabContent">
                                        <div class="tab-pane fade show active" id="rounded-pills-icon-home" role="tabpanel" aria-labelledby="rounded-pills-icon-home-tab">
                                        <div class="checkout-widget checkout-contact" style={{backgroundColor:"transparent"}}>
                    
                <h1 className="mb-5">Confirm</h1>
                <ul class="list-group">
                    <li class="list-group-item">Name: {name}</li>
                    <li class="list-group-item">Email: {email}</li>
                    <li class="list-group-item">Phone Number: {phone}</li>
                    <li class="list-group-item">Password: {password}</li>
                    <li class="list-group-item">Facebook URL: <a href={facebook}>{facebook}</a></li>
                    <li class="list-group-item">Twitter URL: <a href={twitter}>{twitter}</a></li>
                    <li class="list-group-item">Github URL: <a href={github}>{github}</a></li>
                </ul>
</div></div></div>
                <br /><br />

                <div className="row">
                    <div className="col-6">
                        <button className="btn btn-danger" onClick={this.back}>Back</button>
                    </div>
                    <div className="col-6 text-right">
                        <button className="btn btn-primary" onClick={this.continue}>Continue</button>
                    </div>
                </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
        )
    }
}

export default Confirm
