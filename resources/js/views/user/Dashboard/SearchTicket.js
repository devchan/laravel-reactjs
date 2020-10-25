import React, { Component } from 'react'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

class SearchTicket extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {},
            fields: [],
            query: "",
            filteredData: [],
            field: "",
            selectedOption: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    // check if user is authenticated and storing authentication data as states if true
    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
            // console.log(AppState.user.id)
        }
    }

    componentDidMount() {
        axios.get(`/api/v1/tickets`)
            .then(res => {
                const fields = res.data;
                this.setState({ fields: fields });

            })
    }

    handleSelectChange(event) {
        const selectedOption = event.target.value;
        this.setState({ selectedOption: selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    handleInputChange(event) {
        const query = event.target.value;

        const field = this.state.selectedOption;

        axios.post(`/api/v1/searchTickets`, { q: query, field: field })
            .then(res => {
                const filteredData = res.data;

                this.setState({
                    field: field,
                    query: query,
                    filteredData: filteredData
                })
                console.log(this.state.filteredData);

            })



    };

    render() {

        let fieldLists = Object.values(this.state.fields);
        let filteredData = this.state.filteredData;
        let optionItems = fieldLists.map((fieldList, key) =>

            <option key={key} value={fieldList}>{fieldList}</option>
        );
        const selectedOption = this.state.selectedOption;

        return (
            <div>
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} />
                <label htmlFor="field">Fields</label>



                <select name="field" onChange={this.handleSelectChange}>
                    <option value="">--Select a field--</option>
                    {optionItems}

                </select>


                <div >
                    <form>
                        <label htmlFor="search">Search</label>
                        <input name="search"
                            placeholder="Search for..."
                            value={this.state.query}
                            onChange={this.handleInputChange}
                        />
                    </form>
                    {(filteredData.ticket_subject) ? (<div><p>
                        | Ticket subject: {filteredData.ticket_subject}
                        | Organization name: {filteredData.organization_name}
                    | Assignee name: {filteredData.assignee_name}
                    | Submitter name: {filteredData.submitter_name}
                                |</p></div>) : ''}
                </div>
                <Footer />
            </div>
        )
    }
}
export default SearchTicket
