import createSubject from "./createSubject";

let _sharedFields = {};

const subject = createSubject();

const _setSharedFields = (sharedFields, next = false) => {
  _sharedFields = sharedFields;
  if (next) subject.observers.forEach((each) => each.next(sharedFields));
};

const useSharedFields = () => {
  const [sharedFields, setSharedFields] = useState(_sharedFields);

  useEffect(() => {
    const subscribed = subject.subscribe({
      next: (fields) => {
        setSharedFields(fields);
      },
    });

    return () => subscribed.unsubscribe();
  }, []);

  return {
    sharedFields,
    setSharedFields: (sharedFields) => _setSharedFields(sharedFields, true),
  };
};

export default useSharedFields;
