import { combineReducers } from 'redux';
import { authReducer as auth } from './authReducer';
import { peopleSearchReducer as people } from './peopleSearchReducer';
import { confirmationModalReducer as confirmationModal } from './confirmationModal';
import { recentSearchesReducer as recentSearches } from './recentSearchesReducer';
import { userCasesReducer as userCases } from './userCasesReducer';
import { caseDataReducer as caseData } from './caseDataReducer';

export default combineReducers({
  auth,
  people,
  confirmationModal,
  recentSearches,
  userCases,
  caseData
});
