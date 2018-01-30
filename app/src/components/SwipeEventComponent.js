import { Component } from "react";

class ReactSwipeEventComponent extends Component {

  handleSwipeLeft() { }
  handleSwipeRight() { }
  handleSwipeUp() { }
  handleSwipeDown() { }

  setTolerance(tolerance) {
    this.tolerance = tolerance;
  }
  constructor(props) {
    super(props);

    this.setTolerance(10);
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

  getTolerance() {
    return this.tolerance;
  }

  getPosition(event) {
    if ('touches' in event) {
      var event$touches$ = event.touches[0],
        pageX = event$touches$.pageX,
        pageY = event$touches$.pageY;

      return { x: pageX, y: pageY };
    }

    var screenX = event.screenX,
      screenY = event.screenY;

    return { x: screenX, y: screenY };
  }

  handleTouchStart(event) {
    var getPosition = this.getPosition(event),
      x = getPosition.x,
      y = getPosition.y;

    this.moveStart = { x: x, y: y };

  }

  handleTouchMove(event) {
    var getPosition2 = this.getPosition(event),
      x = getPosition2.x,
      y = getPosition2.y;

    if (this.moveStart) {
      var deltaX = x - this.moveStart.x;
      var deltaY = y - this.moveStart.y;
      this.moving = true;
      this.movePosition = { deltaX: deltaX, deltaY: deltaY };
    }
    event.preventDefault();
  }

  handleTouchEnd(event) {
    var tolerance = this.getTolerance();

    if (this.moving) {
      if (this.movePosition.deltaX < -tolerance) {
        this.handleSwipeLeft(1, event);
      } else if (this.movePosition.deltaX > tolerance) {
        this.handleSwipeRight(1, event);
      }
      if (this.movePosition.deltaY < -tolerance) {
        this.handleSwipeUp(1, event);
      } else if (this.movePosition.deltaY > tolerance) {
        this.handleSwipeDown(1, event);
      }
    }

    this.moveStart = null;
    this.moving = false;
    this.movePosition = null;
  }
}

export default ReactSwipeEventComponent;