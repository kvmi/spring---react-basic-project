import React, {Component} from 'react';
import CompanyService from "../services/CompanyService";
import Select from 'react-select';



class UpdateCompanyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            companyName: '',
            companyPresident: '',
              

        }
        this.changeCompanyNameHandler = this.changeCompanyNameHandler.bind(this);
        this.changeCompanyPresidentHandler = this.changeCompanyPresidentHandler.bind(this);


    }


    componentDidMount() {
        CompanyService.getCompanyByName(this.state.companyName).then((res) => {
            let company = res.data;
            this.setState({companyName: company.companyName,
                companyPresident: company.companyPresident,              
            });
                
        });
      
    }

    updateCompany = (e) =>{
        e.preventDefault();
        let company = {companyName: this.state.companyName, companyPresident: this.state.companyPresident};
        console.log('company => ' + JSON.stringify(company));
        console.log(localStorage.getItem('companyName'));
        CompanyService.updateCompany(company, localStorage.getItem('companyName')).then( res => {
            this.props.history.push('/company');
        });
    }

    changeCompanyNameHandler = (event) =>{
        this.setState({companyName: event.target.value});
    }
    changeCompanyPresidentHandler= (event) =>{
        this.setState({companyPresident: event.target.value});
    }


    cancel(){
        this.props.history.push('/company');
    }

    render() {

        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className = "text-center"> Update Company </h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Company Name: </label>
                                        <input placeholder = "Company name" name = "companyName" className = "form-control"
                                               value={this.state.companyName} onChange={this.changeCompanyNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Company President: </label>
                                        <input placeholder = "Company President" name = "companyPresident" className = "form-control"
                                               value={this.state.companyPresident} onChange={this.changeCompanyPresidentHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.updateCompany}>Update</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}> Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default UpdateCompanyComponent;