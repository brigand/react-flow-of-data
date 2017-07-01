import {BAR_ACTION} from '../constants/constants.js';

export const barAction = (data) => {
  return {
    type: BAR_ACTION,
    payload: data,
  };
};

