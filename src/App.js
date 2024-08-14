import React, { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  tookLoan: false,
  isActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      if (!state.isActive) {
        return { ...state, balance: 500, isActive: true };
      }
      return state;
    case "deposit":
      if (state.isActive) {
        return { ...state, balance: state.balance + Number(action.payload) };
      }
      return state;
    case "withdraw":
      if (state.isActive) {
        return { ...state, balance: state.balance - Number(action.payload) };
      }
      return state;
    case "requestLoan":
      if (state.isActive && state.loan === 0) {
        return {
          ...state,
          tookLoan: true,
          loan: Number(action.payload),
          balance: state.balance + Number(action.payload),
        };
      }
      return state;
    case "payLoan":
      if (state.isActive && state.loan > 0 && state.balance > state.loan) {
        return {
          ...state,
          tookLoan: false,
          loan: 0,
          balance: state.balance - state.loan,
        };
      }
      return state;
    case "closeAccount":
      if (state.isActive && state.loan === 0 && state.balance === 0) {
        return initialState;
      }
      return state;
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>
        <strong>Balance: </strong>
        {state.isActive ? state.balance : "Open your account!"}
      </p>
      <p>
        <strong>Loan: </strong>
        {state.isActive ? state.loan : "Open your account!"}
      </p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount" })}
          className={state.isActive ? "inactive" : "active"}
          disabled={state.isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          className={state.isActive ? "active" : "inactive"}
          disabled={!state.isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          className={state.isActive ? "active" : "inactive"}
          disabled={!state.isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
          className={state.isActive && state.loan === 0 ? "active" : "inactive"}
          disabled={!state.isActive || state.loan > 0}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payLoan" })}
          className={state.isActive && state.loan > 0 ? "active" : "inactive"}
          disabled={!state.isActive || state.loan === 0}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          className={
            state.isActive && state.loan === 0 && state.balance === 0
              ? "active"
              : "inactive"
          }
          disabled={!state.isActive || state.loan > 0 || state.balance !== 0}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
