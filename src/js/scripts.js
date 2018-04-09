document.addEventListener('DOMContentLoaded', function(){
    const easeFunctions = {
      // t: current time, b: start value, c: change in value, d: duration
      easeOutQuad: function (t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
      }
    }
    const moveTo = new MoveTo({
      duration: 1000,
      easing: 'easeOutQuad'
    }, easeFunctions);
    const triggers = document.getElementsByClassName('js-trigger');
    for (var i = 0; i < triggers.length; i++) {
      moveTo.registerTrigger(triggers[i]);
    }
  });