import useSharedFields from "../../utilities/useSharedFields";

const UPDATE_KEY = "updateKey";
const EMAIL_COUNT_KEY = "emailCount";
const EMAIL_VALUE_KEYS = ["email", "email2", "email3"];

const Email = () => {
  const [sharedFields, setSharedFields] = useSharedFields(UPDATE_KEY, { [EMAIL_COUNT_KEY]: 1 });
  const count = sharedFields[EMAIL_COUNT_KEY];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {new Array(count).fill("").map((_, index) => {
        return (
          <label>
            email{index + 1}{" "}
            <input
              type="email"
              value={sharedFields[EMAIL_VALUE_KEYS[index]]}
              onChange={(e) => {
                const newValue = e.target.value;
                setSharedFields(UPDATE_KEY, { ...sharedFields, [EMAIL_VALUE_KEYS[index]]: newValue });
              }}
            ></input>
          </label>
        );
      })}

      {count < 3 && (
        <button onClick={() => setSharedFields(UPDATE_KEY, { [EMAIL_COUNT_KEY]: count + 1 })}>add more email</button>
      )}
    </div>
  );
};

export default Email;
