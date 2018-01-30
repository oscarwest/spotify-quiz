import { Component } from 'react';

class SwipeEventComponent extends Component {
  constructor(props) {
    super(props);

    this.setTolerance(30);
    this.fnBinding(this, 'getPosition', 'handleTouchStart', 'handleTouchMove', 'handleTouchEnd', 'handleSwipeLeft', 'handleSwipeRight');
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
    fns.forEach(fn => context[fn] = context[fn].bind(context));
  }

  setTolerance(tolerance) {
    this.tolerance = tolerance;
  }

  getTolerance() {
    return this.tolerance;
  }

  handleSwipeLeft() { }
  handleSwipeRight() { }
  handleSwipeUp() { }
  handleSwipeDown() { }

  getPosition(event) {
    if ('touches' in event) {
      const event$touches$ = event.touches[0];
      const pageX = event$touches$.pageX;
      const pageY = event$touches$.pageY;

      return { x: pageX, y: pageY };
    }

    const screenX = event.screenX;
    const screenY = event.screenY;

    return { x: screenX, y: screenY };
  }

  handleTouchStart(event) {
    const getPosition = this.getPosition(event);
    const x = getPosition.x;
    const y = getPosition.y;

    this.moveStart = { x, y };
  }

  handleTouchMove(event) {
    const getPosition2 = this.getPosition(event);
    const x = getPosition2.x;
    const y = getPosition2.y;

    if (this.moveStart) {
      const deltaX = x - this.moveStart.x;
      const deltaY = y - this.moveStart.y;
      this.moving = true;
      this.movePosition = { deltaX, deltaY };
    }
    event.preventDefault();
  }

  handleTouchEnd(event) {
    const tolerance = this.getTolerance();

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
