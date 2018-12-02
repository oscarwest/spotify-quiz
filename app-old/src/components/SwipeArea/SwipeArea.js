import React from 'react';
import styled from 'styled-components';
import SwipeEventComponent from '../SwipeEventComponent/SwipeEventComponent';

const TouchArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: hotpink;
  position: absolute;
`;

const CenterText = styled.p`
  color: white;
  font-size: 20px;
`;

class SwipeArea extends SwipeEventComponent {
  constructor(props) {
    super(props);

    this.defaultText = 'Try swiping right/left/up/down';
    this.delayTime = 2000;

    this.state = {
      text: this.defaultText,
    };

    this.setTolerance(30);
  }

  handleSwipeLeft() {
    this.setState({
      text: 'You just swiped left!',
    });
    this.delayResetText();
  }

  handleSwipeRight() {
    this.setState({
      text: 'You just swiped right!',
    });
    this.delayResetText();
  }

  handleSwipeUp() {
    this.setState({
      text: 'You just swiped up!',
    });
    this.delayResetText();
  }

  handleSwipeDown() {
    this.setState({
      text: 'You just swiped down!',
    });
    this.delayResetText();
  }

  delayResetText() {
    setTimeout(() => {
      this.setState({
        text: this.defaultText,
      });
    }, this.delayTime);
  }

  render() {
    return (
      <TouchArea {...this.touchEventProperties}>
        <CenterText>{this.state.text}</CenterText>
      </TouchArea>
    );
  }
}

export default SwipeArea;
