import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonElement = styled.button`
    font-size: 20px;
    background-color: black;
    color: white;
    padding: 5px 10px;
    border: 0;
    cursor: pointer;

    &:focus {
        outline: 0;
    }

    &:hover {

    }

    &:active {
        background-color: black;
    }
`;

class Button extends Component {

    render() {
        return (
            <ButtonElement
                type={this.props.type}
                isabled={this.props.disabled}
                onClick={this.props.onClick}>{this.props.text}
            </ButtonElement>

        );
    }
};

Button.propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string
};

export default Button;
