let timer: NodeJS.Timeout | null = null;

const throttle = (fn: Function, wait = 0, immediately = true) => {
  return function () {
    const args = arguments;

    const callback = () => fn.apply(this, Array.prototype.slice.call(args, 0));

    if (!timer) {
      if (immediately) callback();

      timer = setTimeout(() => {
        if (!immediately) callback();
        timer = null;
      }, wait);
    }
  };
};

export default throttle;
