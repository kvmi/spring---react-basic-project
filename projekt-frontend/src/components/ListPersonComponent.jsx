import React, {Component} from 'react';
import PersonService from "../services/PersonService";

class ListPersonComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            persons: [{"id": "", "firstName": "", "lastName":"", "email":"", "company":{"companyName":"", "companyPresident":""}, "dateOfEmployment":""}]
        }
        this.addPerson = this.addPerson.bind(this);
        this.updatePerson = this.updatePerson.bind(this);
        this.deletePerson = this.deletePerson.bind(this);
        this.viewCompanies = this.viewCompanies.bind(this);
    }

    deletePerson(id){
        PersonService.deletePerson(id).then( res => {
              this.setState({persons: this.state.persons.filter(person =>person.id !== id)});
        });
    }

    viewPerson(id){
        this.props.history.push(`/view-person/${id}`)
    }

    updatePerson(id){
        this.props.history.push(`/update-person/${id}`)
    }

    componentDidMount() {
        PersonService.getPersons().then((res) => {
            this.setState({ persons: res.data});
        });
    }

    addPerson(){
        this.props.history.push('/add-person');
    }

    viewCompanies(){
        this.props.history.push('/company');
    }

    render() {
        return (
            <div>
                <h2 className = "text-center">Persons List</h2>
                <div className = "row">
                    <button className = "btn btn-primary" onClick={this.viewCompanies}> View Company</button>
                    <button className = "btn btn-primary" onClick={this.addPerson}> AddPerson</button>
                </div>
                <div className = "row">
                    <table className = "table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th> Person Id</th>
                                <th> Person First Name</th>
                                <th> Person Last Name</th>
                                <th> Person Email</th>
                                <th> Person Company</th>
                                <th> Person Date Of Employment</th>
                                <th> Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.persons.map(
                                person =>
                                    <tr key = {person.id}>
                                        <td> { person.id} </td>
                                        <td> { person.firstName} </td>
                                        <td> { person.lastName} </td>
                                        <td> { person.email} </td>
                                        <td> { person.company.companyName} </td>
                                        <td> { person.dateOfEmployment.slice(0,-19)} </td>
                                        <td>
                                            <button onClick = { () => this.updatePerson(person.id)} className="btn btn-info">Update </button>
                                            <button style={{marginLeft: ""}} onClick = { () => this.deletePerson(person.id)} className="btn btn-danger">Delete </button>
                                            <button style={{marginLeft: ""}} onClick = { () => this.viewPerson(person.id)} className="btn btn-info">View </button>
                                            
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

export default ListPersonComponent;