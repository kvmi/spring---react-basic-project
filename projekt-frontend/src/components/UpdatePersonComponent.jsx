import React, {Component} from 'react';
import PersonService from "../services/PersonService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

const options = [];
const getCompanyNames = () => PersonService.getCompanyNames().then(res => {
    for (var i = 0; i < res.data.length; i++) {
        var obj = {};
        obj['value'] = res.data[i];
        obj['label'] = res.data[i];
        options.push(obj);
    }
});


class UpdatePersonComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            email: '',
            company: {},
            dateOfEmployment: new Date()
              

        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeCompanyHandler = this.changeCompanyHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.updatePerson = this.updatePerson.bind(this);

    }

    loadCurrentObject() {
        let currentObject;
        PersonService.getPersonById(this.state.id).then((res) => {
            let person = res.data;
            currentObject = {value: person.company, label: person.company.companyName}
            console.log(currentObject)

            return currentObject;

        })
    }

    componentDidMount() {
        getCompanyNames();
        PersonService.getPersonById(this.state.id).then((res) => {
            let person = res.data;
            console.log(person.company);
            this.setState({firstName: person.firstName,
                lastName: person.lastName,
                email: person.email,
                company: person.company,
                dateOfEmployment: new Date(person.dateOfEmployment),                
            });
                
        });
      
    }

    updatePerson = (e) =>{
        e.preventDefault();
        const company = {companyName: this.state.company.value}
        let person = {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email,
            company: company, dateOfEmployment: this.state.dateOfEmployment};
        console.log('person => ' + JSON.stringify(person));
        PersonService.updatePerson(person, this.state.id).then( res => {
            this.props.history.push('/persons');
        });
    }

    changeFirstNameHandler = (event) =>{
        this.setState({firstName: event.target.value});
    }
    changeLastNameHandler= (event) =>{
        this.setState({lastName: event.target.value});
    }
    changeEmailHandler= (event) =>{
        this.setState({email: event.target.value});
    }
    changeCompanyHandler= (event) =>{
        this.setState({company: event});
    }
    changeDateHandler= (event) =>{
        this.setState({dateOfEmployment: event});
    }

    cancel(){
        this.props.history.push('/persons');
    }

    render() {
        this.loadCurrentObject();
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className = "text-center"> Update Person </h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> First Name: </label>
                                        <input placeholder = "First name" name = "firstName" className = "form-control"
                                               value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Last Name: </label>
                                        <input placeholder = "Last name" name = "lastName" className = "form-control"
                                               value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Email: </label>
                                        <input placeholder = "Email" name = "email" className = "form-control"
                                               value={this.state.email} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Company: </label>
                                        <Select
                                            defaultValue={this.loadCurrentObject()}
                                            onChange={this.changeCompanyHandler}
                                            options={options}
                                        />
                                    </div>
                                    <div className = "form-group">
                                        <label> Date Of Employment: </label> <br></br>
                                        <DatePicker selected={this.state.dateOfEmployment} onChange={date => this.changeDateHandler(date)} dateFormat="yyyy-MM-dd" />
                                    </div>
                                    <button className="btn btn-success" onClick={this.updatePerson}>Update</button>
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

export default UpdatePersonComponent;