import React, { Component } from 'react';
import Event_Details from './Event_Details';
import Class_Details from './Class_Details';
import EquipeDetails from './EquipeDetails';
import Sponsor_Details from './Sponsor_Details';
import Addons_Details from './Addons_Details';
import Confirm from './Confirm';
import Success from './Success';

export class evnt extends Component {
    state = {
        step: 1,
        name: '',
        email: '',
        phone: '',
        password: '',
        facebook: '',
        twitter: '',
        github: ''
    };

    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
    };

    prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    };

    inputChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
    };

    render() {
        const { step } = this.state;
        const { name, email, phone, password, facebook, twitter, github } = this.state;
        const values = { name, email, phone, password, facebook, twitter, github };

        switch (step) {
            case 1:
                return (
                    <Event_Details
                        nextStep={this.nextStep}
                        inputChange={this.inputChange}
                        values={values}
                    />
                );
            case 2:
                return (
                    <Class_Details
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        inputChange={this.inputChange}
                        values={values}
                    />
                );
                
            case 3:
                return (
                    <EquipeDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        inputChange={this.inputChange}
                        values={values}
                    />
                );
                case 4:
                    return (
                        <Sponsor_Details
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            inputChange={this.inputChange}
                            values={values}
                        />
                    );
                    case 5:
                        return (
                            <Addons_Details
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                inputChange={this.inputChange}
                                values={values}
                            />
                        );
            case 6:
                return (
                    <Confirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values}
                    />
                );
            case 7:
                return (
                    <Success />
                );
        }
    }
}

export default evnt
