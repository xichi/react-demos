import React, { useState } from "react";

const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: (e) => setValue(e.target.value),
    resetValue: () => setValue(""),
  };
};

export default ({ onSubmit, children }) => {
  const { resetValue, ...text } = useInputValue("");
  return (
    <div style={{position: 'relative'}}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(text.value);
          resetValue();
        }}
      >
        <div className="todo_form">
          <input
            type="text"
            className="input-box"
            placeholder="+ New Todo"
            id="text1"
            {...text}
          />
        </div>
      </form>
      <div className="slot clean-btn">{children()}</div>
    </div>
  );
};
