import { Component } from "react";

class SwipeEventComponent extends Component {

  handleSwipeLeft() { }
  handleSwipeRight() { }
  handleSwipeUp() { }
  handleSwipeDown() { }

  constructor(props) {
    super(props);

    this.setTolerance(30);
    this.fnBinding(this, "getPosition", "handleTouchStart", "handleTouchMove", "handleTouchEnd", "handleSwipeLeft", "handleSwipeRight");
    this.setPropertiesForTouchEvents();
  }

  setPropertiesForTouchEvents() {
    this.touchEventProperties = {
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd,
    };
  }

  fnBinding(context, ...fns) {
    fns.forEach((fn) => context[fn] = context[fn].bind(context));
  }

  setTolerance(tolerance) {
    this.tolerance = tolerance;
  }

  getTolerance() {
    return this.tolerance;
  }

  getPosition(event) {
    if ('touches' in event) {
      let event$touches$ = event.touches[0];
      let pageX = event$touches$.pageX;
      let pageY = event$touches$.pageY;

      return { x: pageX, y: pageY };
    }

    let screenX = event.screenX;
    let screenY = event.screenY;

    return { x: screenX, y: screenY };
  }

  handleTouchStart(event) {
    let getPosition = this.getPosition(event);
    let x = getPosition.x;
    let y = getPosition.y;

    this.moveStart = { x: x, y: y };

  }

  handleTouchMove(event) {
    let getPosition2 = this.getPosition(event);
    let x = getPosition2.x;
    let y = getPosition2.y;

    if (this.moveStart) {
      let deltaX = x - this.moveStart.x;
      let deltaY = y - this.moveStart.y;
      this.moving = true;
      this.movePosition = { deltaX: deltaX, deltaY: deltaY };
    }
    event.preventDefault();
  }

  handleTouchEnd(event) {
    let tolerance = this.getTolerance();

    if (this.moving) {
      if (Math.abs(this.movePosition.deltaX) > Math.abs(this.movePosition.deltaY)) {
        this.movePosition.deltaX < -tolerance ?
          this.handleSwipeLeft(1, event) : this.handleSwipeRight(1, event);
      } else {
        this.movePosition.deltaY < -tolerance ?
          this.handleSwipeUp(1, event) : this.handleSwipeDown(1, event);
      }
    }

    this.moveStart = null;
    this.moving = false;
    this.movePosition = null;
  }
}

export default SwipeEventComponent;