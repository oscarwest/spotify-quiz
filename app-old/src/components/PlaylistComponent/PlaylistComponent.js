import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PlayList = styled.div`
  min-width: 280px;
  max-width: 280px;
  height: 280px;
  position: relative;
  cursor: pointer;
  padding:0 15px;

  transition: 0.2s ease; 

  &:hover {
    min-width: 300px;
    max-width: 300px;
    height: 300px;     
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
`;

const PlaylistName = styled.h3`
  width: calc(100% -  50px);
  height: 50px;
  position: absolute;
  bottom: 0px;
  padding: 0 10px;
  margin: 0;
  background-color: black;
  text-align: center;
  color: white;
  text-transform: uppercase;
  line-height: 50px;
  font-size: 25px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


class PlaylistComponent extends Component {
    handleClick = () => {
        this.props.onPlaylistClicked(this.props.id, this.props.ownerId);
    }

    render() {
        return (
            <PlayList onClick={this.handleClick}>
                <CoverImage src={this.props.imageUrl} alt="playlist" />
                <PlaylistName title={this.props.name}>{this.props.name}</PlaylistName>
            </PlayList>
        );
    }
}

PlaylistComponent.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    ownerId: PropTypes.string,
    imageUrl: PropTypes.string,
    onPlaylistClicked: PropTypes.any.isRequired,
};

export default PlaylistComponent;
