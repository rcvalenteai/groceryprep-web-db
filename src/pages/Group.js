import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import GroupList from "../components/GroupList";
import qs from "querystring";

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
        console.log(search)
        let queryObj = {}
        let get_groups_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/group";
        if (search) {
            queryObj["search"] = search
        }
        let query = qs.stringify(queryObj)
        get_groups_url += "?" + query
        console.log(query)
        console.log(get_groups_url)
        console.log(this.state.selectedTags)
        let data = await fetch(get_groups_url)
        let groupData = await data.json()
        this.setState({
            items: groupData.items,
            loading: false
        })

    }

    handleSearch(event) {
        event.preventDefault()
        console.log("Search")
        this.fetchSearchGroups()
    }

    searchChangeHandler(event) {
        this.setState({
            searchFilter: event.target.value
        })
    }

    render() {
        console.log(this.state.items)
        const loading = this.state.loading;
        console.log(loading)
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
                <form onSubmit={e => this.handleSearch(e)}>
                    <label>
                        Search by Group Name:
                        <input type="text" value={this.state.searchFilter}
                               onChange={e => this.searchChangeHandler(e)}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                {groupList}
            </div>
        )
    }
}

export default Group;
