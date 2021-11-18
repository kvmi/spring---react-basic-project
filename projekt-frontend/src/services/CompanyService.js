import axios from 'axios';

const COMPANY_API_BASE_URL = "http://localhost:8080/api";

class CompanyService{
    getCompanies(){
        return axios.get(COMPANY_API_BASE_URL + "/company");
    }

    createCompany(company){
        return axios.post(COMPANY_API_BASE_URL + "/company", company);
    }

    updateCompany(company, companyName){
        return axios.put(COMPANY_API_BASE_URL + '/company/' + companyName, company);
    }

    deleteCompany(companyName){
        return axios.delete(COMPANY_API_BASE_URL + '/company/' + companyName);
    }

    getCompanyByName(companyName){
        return axios.get(COMPANY_API_BASE_URL + '/company/' + companyName);
    }

}
export default new CompanyService();