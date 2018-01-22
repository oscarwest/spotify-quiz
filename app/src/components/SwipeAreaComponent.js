import React from 'react';
import ReactSwipeEventComponent from './SwipeEventComponent';
import './SwipeArea.css';

class SwipeArea extends ReactSwipeEventComponent {
    constructor(props) {
        super(props);
    
        this.defaultText = "Try swiping/wheeling right/left/up/down";
        this.delayTime = 2000;
    
        this.state = {
          text: this.defaultText,
        };
        
        this.setTolerance(30);
      }
    
      handleSwipeLeft() {
        this.setState({
          text: "You just swiped left!",
        });
        this.delayResetText();
      }
    
      handleSwipeRight() {
        this.setState({
          text: "You just swiped right!",
        });
        this.delayResetText();
      }
    
      handleSwipeUp() {
        this.setState({
          text: "You just swiped up!",
        });
        this.delayResetText();
      }
    
      handleSwipeDown() {
        this.setState({
          text: "You just swiped down!",
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
      <div className="SwipeArea" {...this.touchEventProperties}>
        <p className="SwipeText">{this.state.text}</p>
      </div>
    );
  }
}

export default SwipeArea;
