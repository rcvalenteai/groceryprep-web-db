import React from 'react';
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import CreatorNavBar from "../components/CreatorNavBar";
import OrderRecipeList from "../components/OrderRecipeList";
import IngredientList from "../components/IngredientList";

class Creator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creator: null,
            screenName: "",
            platform: "",
            url: "",
            loading: true
        };
    }

    componentDidMount() {
        this.fetchCreator();
    }

    fetchCreator = async () => {
        // Get session data
        let sessionStateString = sessionStorage.getItem('token')
        let sessionState = JSON.parse(sessionStateString)

        let get_creator_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/creator/profile/";
        get_creator_url += sessionState.userUrl
        let creator_data = await fetch(get_creator_url)
        let creator_data_obj = await creator_data.json()

        if (!creator_data_obj.hasOwnProperty('errorMessage')) {
            this.setState({
                creator: creator_data_obj,
                loading: false
            })
        }
    }

    handleBecomeCreator = async (e) => {
        e.preventDefault()
        // Get session data
        let sessionStateString = sessionStorage.getItem('token')
        let sessionState = JSON.parse(sessionStateString)

        let base_url = "https://lkt9ygcr5g.execute-api.us-east-2.amazonaws.com/beta/creator";
        fetch(base_url, {
            //mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify({
                userUrl: sessionState.userUrl,
                screenName: this.state.screenName,
                platform: this.state.platform,
                url: this.state.url
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(responseData => {
            }).then(() =>
            this.fetchCreator()
        )
    }

    screenNameChangeHandler(event) {
        this.setState({
            screenName: event.target.value
        })
    }

    platformChangeHandler(event) {
        this.setState({
            platform: event.target.value
        })
    }

    urlChangeHandler(event) {
        this.setState({
            url: event.target.value
        })
    }

    render() {
        const loading = this.state.loading;
        const creator = this.state.creator
        let creatorProfile;
        if (!loading) {
            if (creator) {
                creatorProfile = (
                    <div>
                        <p>Screen Name: {creator.screen_name}</p>
                        <p>Platform: {creator.platform}</p>
                        <p>Url: {creator.url}</p>
                    </div>
                )
            } else {
                creatorProfile = (
                    <div>
                        <h2>You are not a creator yet! Become One!</h2>
                        <form onSubmit={e => this.handleBecomeCreator(e)}>
                            <label>
                                Screen Name:
                                <input type="text" value={this.state.screenName}
                                       onChange={e => this.screenNameChangeHandler(e)}/>
                            </label>
                            <br/>
                            <label>
                                Platform:
                                <input type="text" value={this.state.platform}
                                       onChange={e => this.platformChangeHandler(e)}/>
                            </label>
                            <br/>
                            <label>
                                Url:
                                <input type="text" value={this.state.url}
                                       onChange={e => this.urlChangeHandler(e)}/>
                            </label>
                            <br/>
                            <input type="submit" value="Become a Creator"/>
                        </form>
                    </div>
                )
            }
        } else {
            creatorProfile = <h1>Loading...</h1>
        }
        return (
            <div>
                <Header/>
                <CreatorNavBar/>
                <h1>Creator Profile Page</h1>
                {creatorProfile}
            </div>
        )
    }
}

export default Creator;
