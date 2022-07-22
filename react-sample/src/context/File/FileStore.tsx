import * as React from "react";
import { ActionTypes, IFile, IFileActions, IState } from "./Interfaces";
import { reducer } from "./FileReducer";
import { Dispatch } from "react";
import { rest } from "../../data/rest";

const initialState: IState = {
  files: [],
};

export const Store = React.createContext<[IState, Dispatch<IFileActions>]>([
  initialState,
  () => null
]);

export const FileStoreProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>
  );
};

export const useFiles = () => {
  const context = React.useContext(Store)
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider')
  }
  return context
}


export const getFiles = async (dispatch: Dispatch<IFileActions>) => {
  await rest
    .get<IFile[]>('filesystem')
    .then(res => {
      const { data } = res;
      dispatch({
        type: ActionTypes.SetFiles,
        payload: {
          files: data
        }
      });
    })
};