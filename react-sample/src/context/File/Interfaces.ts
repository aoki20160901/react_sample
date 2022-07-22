type UserOfFile = {
  id: string,
  name: string,
}

export enum UploadStatus {
  pending = "pending",
  processing = "processing",
  failed = "failed",
  success = "success"
}

export interface IFile {
  id: string;
  user: UserOfFile;
  originalname: string;
  filename: string;
  filepath: string;
  extension: string;
  size: string;
  status: UploadStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IState {
  files: IFile[];
}

interface IFileChunkMeta {
  index: number[]
}

export enum FileChunkStatus {
  notfound,
  partial,
  success,
}

export interface IFileChunkStatusCheck {
  status: FileChunkStatus
  message: string
  meta?: IFileChunkMeta
}

export enum ActionTypes {
  AddFile = "ADD_FILE",
  UpdateFileStatus = "UPDATE_FILE_STATUS",
  SetFiles = 'SET_FILES',
  SetFileUpload = 'SET_FILE_UPLOAD',
}

interface IAddFileAction {
  type: ActionTypes.AddFile;
  payload: { file: IFile };
}
interface IUpdateFileStatusAction {
  type: ActionTypes.UpdateFileStatus;
  payload: { id: string, status: UploadStatus };
}
interface ISetFilesAction {
  type: ActionTypes.SetFiles;
  payload: { files: IFile[] };
}
export type IFileActions =
  | IAddFileAction
  | IUpdateFileStatusAction
  | ISetFilesAction;