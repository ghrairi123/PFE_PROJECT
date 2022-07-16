import { CLEAR_MESSAGES } from '../messageConstant';

export const clearMessages = () => dispatch => {
	dispatch({
		type: CLEAR_MESSAGES,
	});
};
