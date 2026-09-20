import { useCallback, useEffect, useReducer } from 'react';

import { fetchDrinks } from '../api/coffee';

export const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const initialState = { status: STATUS.LOADING, drinks: [], error: null };

// useReducer keeps the three request states in one transition instead of three
// separate useState calls that could briefly disagree with each other.
function reducer(state, action) {
  switch (action.type) {
    case 'load':
      return { status: STATUS.LOADING, drinks: [], error: null };
    case 'success':
      return { status: STATUS.SUCCESS, drinks: action.payload, error: null };
    case 'error':
      return { status: STATUS.ERROR, drinks: [], error: action.payload };
    default:
      return state;
  }
}

export function useCoffeeMenu(category) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const load = useCallback(async () => {
    dispatch({ type: 'load' });
    try {
      const drinks = await fetchDrinks(category);
      dispatch({ type: 'success', payload: drinks });
    } catch (error) {
      dispatch({ type: 'error', payload: error.message });
    }
  }, [category]);

  useEffect(() => {
    let active = true;

    const run = async () => {
      dispatch({ type: 'load' });
      try {
        const drinks = await fetchDrinks(category);
        // Switching category fast can resolve an old request last, so a stale
        // response is dropped instead of overwriting the current one.
        if (active) dispatch({ type: 'success', payload: drinks });
      } catch (error) {
        if (active) dispatch({ type: 'error', payload: error.message });
      }
    };

    run();
    return () => {
      active = false;
    };
  }, [category]);

  return { ...state, reload: load };
}
