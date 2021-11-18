import React, {Component} from 'react';
import CompanyService from "../services/CompanyService";

class ListCompanyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            companies: [{"companyName": "", "companyPresident": ""}]
        }
        this.addCompany = this.addCompany.bind(this);
        this.viewPersons = this.viewPersons.bind(this);
        this.updateCompany = this.updateCompany.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);
    }

    viewCompany(companyName){
        localStorage.setItem('companyName', companyName);
        this.props.history.push(`/view-company/${companyName}`)
    }

    deleteCompany(companyName){
        CompanyService.deleteCompany(companyName).then( res => {
            this.setState({companies: this.state.companies.filter(company =>company.companyName !== companyName)});
        });
    }

    updateCompany(companyName){
        localStorage.setItem('companyName', companyName);
        this.props.history.push(`/update-company/${companyName}`)
    }

    componentDidMount() {
        CompanyService.getCompanies().then((res) => {
            this.setState({ companies: res.data});
        });
    }

    addCompany(){
        this.props.history.push('/add-company');
    }

    viewPersons(){
        this.props.history.push('/persons/')
    }

    render() {
        return (
            <div>
                <h2 className = "text-center">Companies List</h2>
                <div className = "row">
                    <button className = "btn btn-primary" onClick={this.viewPersons}> View Persons</button>
                    <button className = "btn btn-primary" onClick={this.addCompany}> AddCompany</button>
                </div>
                <div className = "row">
                    <table className = "table table-striped table-bordered">

                        <thead>
                        <tr>
                            <th> Company Name</th>
                            <th> Company President</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.companies.map(
                                company =>
                                    <tr key = {company.companyName}>
                                        <td> { company.companyName} </td>
                                        <td> { company.companyPresident} </td>

                                        <td>
                                            <button onClick = { () => this.updateCompany(company.companyName)} className="btn btn-info">Update </button>
                                            <button style={{marginLeft: ""}} onClick = { () => this.deleteCompany(company.companyName)} className="btn btn-danger">Delete </button>
                                            <button style={{marginLeft: ""}} onClick = { () => this.viewCompany(company.companyName)} className="btn btn-info">View </button>
                                        </td>
                                    </tr>
                            )

                        }
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

export default ListCompanyComponent;