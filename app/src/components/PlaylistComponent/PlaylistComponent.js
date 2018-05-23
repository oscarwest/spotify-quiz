import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PlayList = styled.div`
  width: 300px;
  height: 350px;
  position: relative;
  cursor: pointer;
  padding:0 15px;
`;

const CoverImage = styled.img`
  width: 300px;
  height: 300px;
`;

const PlaylistName = styled.h3`
  width: 280px;
  height: 50px;
  position: absolute;
  bottom: 0;
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
