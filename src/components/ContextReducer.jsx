import React, { createContext, useReducer } from 'react';

export const CartStateContext = createContext();
export const CartDispatchContext = createContext();

const initialValue = [];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
    case "CLEAR_CART":
      let newarr = []
      return newarr;
    default:
      return state;
  }
}

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}

export default CartProvider;
