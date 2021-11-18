import axios from 'axios';

const PERSON_API_BASE_URL = "http://localhost:8080/api";

class PersonService{
    getPersons(){
        return axios.get(PERSON_API_BASE_URL + "/persons");
    }

    createPerson(person){
        return axios.post(PERSON_API_BASE_URL + "/persons", person);
    }

    getCompanyNames(){
        return axios.get(PERSON_API_BASE_URL + "/company/names");
    }

    getPersonById(personId){
        return axios.get(PERSON_API_BASE_URL + '/persons/' + personId);
    }

    updatePerson(person, personId){
        return axios.put(PERSON_API_BASE_URL + '/persons/' + personId, person);
    }

    deletePerson(personId){
        return axios.delete(PERSON_API_BASE_URL + '/persons/' + personId);
    }



}
export default new PersonService();