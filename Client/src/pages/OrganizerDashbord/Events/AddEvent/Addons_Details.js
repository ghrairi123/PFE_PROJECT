import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'validator/lib/isEmpty';

import { showErrorMsg, showSuccessMsg } from '../../../../helpers/message';
import { ADD_ADDONS } from '../../../../redux/actions/EventsActions';
const mapStateToProps = (state) => {
    return {
        successMsg: state.messages.successMsg,
        errorMsg: state.messages.errorMsg,
        User: state.auth,
        Addons:state.event.Addon

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ADD_ADDON:(UserId,{Name,Price,Number,image})=>dispatch(ADD_ADDONS(UserId,{Name,Price,Number,image})) 
   


    }

}
export class Addons_Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: '',
            Price: '',
            Number: '',
            image:[],
            ClientSideError:'',
             UserId:this.props.User.account._id
        }
        this.handleChange = this.handleChange.bind(this)
        this.handlefileName = this.handlefileName.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            const {Name,Price,Number}= this.state;
          //  console.log(Title)
        });

    }
    handlefileName = e => {
        //console.log(e.target.files[0]);
       // this.setState({image: e.target.files[0] });
       console.log(e.target.files[0])

        this.setState({
            image: e.target.files[0]
          })
    };

    handleSubmit=async(e)=>{
        e.preventDefault();
     //   console.log(this.props.User.account._id)
           
        const {Name,Price,Number,image}  = this.state;
   
           this.props.ADD_ADDON(this.state.UserId,
            {Name,Price,Number,image} 
            );  
           
            
    }
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const { values, inputChange } = this.props;

        return (
            <div  >
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
                              
                                <div class="widget-content widget-content-area rounded-pills-icon"  style={{backgroundColor:"transparent"}}>
                                <div class="tab-content" id="rounded-pills-icon-tabContent">
                                        <div class="tab-pane fade show active" id="rounded-pills-icon-home" role="tabpanel" aria-labelledby="rounded-pills-icon-home-tab">
                                        <div class="checkout-widget checkout-contact" style={{backgroundColor:"transparent"}} >
                                                <h5 class="title"  id="msg" > détail de la complémentaire </h5>
                                                {this.props.successMsg && this.props.successMsg.length !== 0 && showSuccessMsg(this.props.successMsg)}
                                      <br/>   {this.props.errorMsg && showErrorMsg(this.props.errorMsg)}
                                      <br/>     <br/>     <br/>  
                                          <form class="checkout-contact-form" onSubmit={this.handleSubmit}>
                                           <div class="form-group">
                                                    <libel>Image</libel>
                                                        <input type="file" onChange={this.handlefileName}
                                                    value={this.state.image}
                                                    name="image"/>
                                                    </div>
                                                    
                                                <div class="form-group">
                                                    <libel>Nom</libel>
                                                        <input type="text"onChange={this.handleChange}
                                                    value={this.state.Name}
                                                    name="Name"  />
                                                    </div>
                                                    <div class="form-group">
                                                    <libel>Prix</libel>
                                                        <input type="text" onChange={this.handleChange}
                                                    value={this.state.Price}
                                                    name="Price"  />
                                                    </div>
                                                    <div class="form-group">
                                                    <libel>Quantité</libel>
                                                        <input type="Number" 
                                                         onChange={this.handleChange}
                                                            value={this.state.Number}
                                                            name="Number" />
                                                    </div>
                                                  <div class="form-group" style={{float:"right"}}>
                                                        <input type="submit" class="custom-button" value="Ajouter"/>
                                                    </div>
                                    
                                                </form>
                                                <br/>
                                                </div>
                            
                                   
                                     <br />

                <div className="row">
                    <div className="col-6">
                        <button style={{float:"left",width:"110px"}}  className="btn btn-danger" onClick={this.back}>Arrière</button>
                    </div>
                    <div className="col-6 text-right">
                        <button style={{float:"right",width:"110px"}}  className="btn btn-primary" onClick={this.continue}>Continuer</button>
                    </div>
                </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div></div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Addons_Details);
