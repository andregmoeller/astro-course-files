import { useState } from "react";

const Counter = ({ pageTitle }: { pageTitle: string }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <small>{pageTitle}</small>
      <h2>Counter: {count}</h2>
      <div className="columns">
        <button className="btn badge" onClick={increment}>
          Increment
        </button>
        <button className="btn badge" onClick={decrement}>
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
