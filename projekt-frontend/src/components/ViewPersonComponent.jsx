 import React, { Component } from 'react';
import PersonService from '../services/PersonService';
 
 class ViewPersonComponent extends Component {
     constructor(props){
        super(props)
        this.state ={

        }
    }

    componentDidMount(){
        PersonService.getPersonById(this.state.id).then( res => {
            this.setState({person: res.data});
        });
    }
     
     render() {
         return (
             <div>
                 <div className = "card col-md-6 offset-md-3"></div>
                 <h3 className = "text-center">View Person Details</h3>
                 <div className = "card-body">
                     <div>
                        {this.state.company}
                     </div>
                 </div>
             </div>
         );
     }
 }

 
 export default ViewPersonComponent;