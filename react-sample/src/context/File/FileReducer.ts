import { IState, IFileActions, ActionTypes } from "./Interfaces";

export const reducer = (state: IState, action: IFileActions): IState => {
  switch (action.type) {
    case ActionTypes.AddFile:
      return {
        ...state,
        files: [
          action.payload.file,
          ...state.files,
        ]
      };
    case ActionTypes.SetFiles:
      return {
        ...state,
        files: action.payload.files,
      };
    case ActionTypes.UpdateFileStatus:
      return {
        ...state,
        files: state.files.map(file =>
          file.id === action.payload.id
            ? { ...file, status: action.payload.status }
            : file
        )
      };
    default:
      return state;
  }
};