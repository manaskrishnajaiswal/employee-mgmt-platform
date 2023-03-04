export const toggleChangeReducer = (state, action) => {
  state.client.toggleForm = !state.client.toggleForm;
};

export const updateUserReducer = (state, action) => {
  state.client.formId = action.payload;
};

export const deleteUserReducer = (state, action) => {
  state.client.deleteId = action.payload;
};

export const columnTypeReducer = (state, action) => {
  state.client.columnType = action.payload;
};
