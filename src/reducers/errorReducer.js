export const initErrorState = [];

export const errorReducer = (
  state = initErrorState,
  { type, meta },
) => {
  if (type === 'REMOVE_ERROR') {
    return [
      ...state.slice(0, meta.index),
      ...state.slice(meta.index + 1),
    ];
  }

  const match = /(.*)_(REQUEST|FAIL)/.exec(type);

  if (!match) return state;

  const [, actionName, actionType] = match;

  if (actionType === 'FAIL') {
    return [...state, { ...meta, actionName }];
  }

  return state.filter(
    (x) =>
      x.id === (meta?.id || -1) &&
      x.actionName === actionName,
  );
};
