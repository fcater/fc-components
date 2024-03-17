import { useEffect, useState } from "react";
import createSubject from "./createSubject";

let _sharedFields = {};
const subject = createSubject();

const _setSharedFields = (key, value, next = false) => {
  if (next) subject.observers.forEach((each) => each.next(key, { ..._sharedFields, ...value }));
};

const useSharedFields = (key, init) => {
  const [sharedFields, setSharedFields] = useState(init);

  useEffect(() => {
    const subscribed = subject.subscribe({
      next: (_key, value) => {
        if (_key === key) setSharedFields(value);
      },
    });
    return () => subscribed.unsubscribe();
  }, [key]);

  return [sharedFields, (key, value) => _setSharedFields(key, value, true)];
};

export default useSharedFields;
