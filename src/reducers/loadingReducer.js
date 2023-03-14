export const initLoadingState = [];

export const loadingReducer = (
  state = initLoadingState,
  { type, meta },
) => {
  const match = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);

  if (!match) return state;

  const [, actionName, actionType] = match;

  if (actionType === 'REQUEST') {
    return [...state, { actionName, ...meta }];
  }

  return state.filter(
    (x) =>
      x.id === (meta?.id || -1) &&
      x.actionName === actionName,
  );
};
