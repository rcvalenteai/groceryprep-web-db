import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import StaticProfile from "../components/StaticProfile";
import stylesheet from "../css/Profile.css";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: {},
            loading : true,
        };
    }

    componentDidMount() { this.fetchProfileData() }

    fetchProfileData = async () => {
        let sessionStorageString = window.sessionStorage.getItem('token')
        let sessionStorage = JSON.parse(sessionStorageString)
        let userUrl = sessionStorage.userUrl
        let base_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/profile/";
        let url = base_url + userUrl
        var data = await fetch(url)
        var userData = await data.json()
        this.setState({
            body: userData,
            loading: false
        })
    }

    render() {
        const loading = this.state.loading;
        let profile;
        if (!loading) {
            profile = (
                <StaticProfile user = {this.state.body}/>
            )
        } else {
            profile = <h1>User Profile Loading...</h1>
        }
        return (
            <div>
                <Header/>
                <NavBar/>
                {profile}
            </div>
        )
    }
}

export default Profile;
