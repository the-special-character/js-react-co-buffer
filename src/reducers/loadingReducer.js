export const initLoadingState = {};

export const loadingReducer = (
  state = initLoadingState,
  { type, payload },
) => {
  const match = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);

  if (!match) return state;

  const [, actionName, actionType] = match;

  if (actionType === 'REQUEST') {
    return { ...state, [actionName]: payload || true };
  }

  const { [actionName]: an, ...rest } = state;

  return rest;
};
