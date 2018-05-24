import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
    padding: 5px 10px;
    font-size: 20px
    border: 2px solid black;
    outline: 0;
`;


class TextInput extends Component {

    render() {
        return (
            <Input
                type="text"
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={this.props.onChange}
                maxLength={this.props.maxLength} />
        );
    }
};

TextInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    maxLength: PropTypes.number
};

export default TextInput;
