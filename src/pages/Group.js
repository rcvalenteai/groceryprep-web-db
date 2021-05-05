import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import GroupList from "../components/GroupList";
import qs from "querystring";
import CreateGroup from "../components/CreateGroup";
// import stylesheet from "../css/Group.css"

class Group extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFilter: '',
            loading: true,
        };
    }

    componentDidMount() {
        this.fetchSearchGroups()
    }

    fetchSearchGroups = async () => {
        let search = this.state.searchFilter;
        let queryObj = {}
        let get_groups_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/group";
        if (search) {
            queryObj["search"] = search
        }
        let query = qs.stringify(queryObj)
        get_groups_url += "?" + query
        let data = await fetch(get_groups_url)
        let groupData = await data.json()
        this.setState({
            items: groupData.items,
            loading: false
        })

    }

    handleSearch(event) {
        event.preventDefault()
        this.fetchSearchGroups()
    }

    searchChangeHandler(event) {
        this.setState({
            searchFilter: event.target.value
        })
    }

    render() {
        const loading = this.state.loading;
        let groupList;
        if (!loading) {
            groupList = (
                <GroupList
                    data={this.state.items}
                />
            )
        } else {
            groupList = <h1>Loading...</h1>
        }

        return (
            <div>
                <Header/>
                <NavBar/>
                <h1>Group Order Page</h1>
                <CreateGroup/>
                <h2>Group Search</h2>
                <form onSubmit={e => this.handleSearch(e)}>
                    <label>
                        Search by Group Name:
                        <input type="text" value={this.state.searchFilter}
                               onChange={e => this.searchChangeHandler(e)}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                <br></br>
                {groupList}
            </div>
        )
    }
}

export default Group;
