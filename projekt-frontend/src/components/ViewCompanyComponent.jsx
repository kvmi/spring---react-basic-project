import React, { Component } from 'react';
import CompanyService from '../services/CompanyService';
 
 class ViewCompanyComponent extends Component {
     constructor(props){
        super(props)
        this.state ={
            company: {}

        }
    }


    componentDidMount(){
        CompanyService.getCompanyByName(localStorage.getItem('companyName')).then( res => {
            this.setState({company: res.data});
            console.log(this.state.company)
        });
    }


     
     render() {
         return (
             <div>
                 <div className = "card col-md-6 offset-md-3"></div>
                 <h3 className = "text-center">View Company Details</h3>
                 <div className = "card-body">
                     <div>
                         {"{"} <br/>
                         "{"companyName"}" :   "{this.state.company.companyName}" {
                         " , " } <br/>  
                         "{"companyPresident"}" : "{this.state.company.companyPresident }"
                         <br/>
                         {"}"}

                     </div>
                 </div>
             </div>
         );
     }
 }

 
 export default ViewCompanyComponent;