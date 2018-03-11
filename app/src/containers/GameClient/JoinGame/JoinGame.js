import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { joinGame } from '../../../actions/websocketActions';

class JoinGame extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        this.props.joinGame(this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>join game here!</h1>
                <form>
                    <input type="text" value={this.state.value} onChange={this.handleChange} maxLength="9" />
                    <button type="submit" disabled={this.state.value.length < 9} onClick={this.handleSubmit}>Join!</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
    joinGame
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JoinGame);
