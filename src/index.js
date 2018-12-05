import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'

class App extends Component {
	state = { lat: null, errorMessage: '' };

	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(position => {
			this.setState({
				lat: position.coords.latitude,
			});
		}, err => {
			this.setState({
				errorMessage: err.message,
			});
		});
	}

	renderContent() {
		const { lat, errorMessage } = this.state;

		if (errorMessage && !lat) {
			return <div>Error: { errorMessage }</div>
		}
		if (!errorMessage && lat) {
			return <SeasonDisplay lat={ lat } />
		}
		return <Spinner message='Please accept location request' />;
	}

	render() {
		return (
			<div>
				{ this.renderContent() }
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));