const createSubject = () => {
  let _observers = [];

  const subscribe = (obs) => {
    _observers.push(obs);

    return {
      unsubscribe: () => {
        _observers = _observers.filter((o) => o !== obs);
      },
    };
  };

  const unsubscribe = () => {
    _observers = [];
  };

  const next = () => {
    _observers.forEach((each) => each.next?.());
  };

  return {
    get observers() {
      return _observers;
    },
    next,
    subscribe,
    unsubscribe,
  };
};

export default createSubject;
