const initialState = {};

const fooReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FOO': return state;
    default: return state;
  }
};
