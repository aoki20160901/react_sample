import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getFiles, useFiles } from "../../context/File/FileStore";
import { ActionTypes, FileChunkStatus, IFile, IFileChunkStatusCheck } from "../../context/File/Interfaces";
import { rest } from "../../data/rest";
import { calFileHash, getFileExtension, getFileSizeText, sliceFile } from "../../services/file.service";
import MaterialTable from "material-table";
import promisePool from "../utils/promise-pool";



const columns = [
  { title: 'user', field: 'username' },
  { title: 'File name', field: 'filename' },
  { title: 'File path', field: 'filepath' },
  { title: 'File size', field: 'size' },
]

const FileList = () => {
  const [{ files }, dispatch] = useFiles();
  const [chunkCount, setChunkCount] = useState<number>(0);
  const [chunkUploadedCount, setChunkUploadedCount] = useState<number>(0);
  const [uploadMessage, setUploadMessage] = useState<string>("");
  useEffect(() => {
    getFiles(dispatch);
  }, [dispatch]);

  const verifyFileHash = ({ total, hash, chunkSize }) => {
    return rest.post<IFileChunkStatusCheck>(`filesystem/upload/chunk/verify`, {
      total,
      hash,
      chunkSize,
    });
  }

  const sendFileChunk = async (
    file: File,
    chunkVerifyResult: IFileChunkStatusCheck,
    { chunkCount, chunkSize, hash, }
  ) => {
    const { status, meta } = chunkVerifyResult;
    const chunkRequestArr: any[] = [];
    for (let i = 0; i < chunkCount; i++) {
      if (
        status === FileChunkStatus.notfound ||
        (
          status === FileChunkStatus.partial &&
          meta?.index && meta.index.length > 0 &&
          !meta.index.includes(i)
        )
      ) {
        const start = i * chunkSize;
        const end = Math.min(file!.size, start + chunkSize);
        const form = new FormData();
        form.append("file_chunk", sliceFile(file!, start, end));
        form.append("chunkSize", chunkSize.toString());
        form.append("index", i.toString());
        form.append("hash", hash);
        // save request promise in array to run parallel
        const chunkReqItem = () => {
          return rest.post("filesystem/upload/chunk", form, {
            onUploadProgress: (e) => {
              if (e.loaded === e.total) {
                setChunkUploadedCount(chunkUploadedCount + 1);
              }
            },
          });
        }
        chunkRequestArr.push(chunkReqItem);
      }
    }
    // max limit 10 request at the same time
    await promisePool(chunkRequestArr, 10);
  }

  const mergeChunk = async (payload) => {
    const { data } = await rest.post<IFile>("filesystem/upload/chunk/merge", payload)
    setChunkUploadedCount(chunkCount);
    dispatch({
      type: ActionTypes.AddFile,
      payload: { file: data }
    })
  }

  const chunkUploadHandle = async (e) => {
    const file: File = e.target.files[0];
    if (!file) return;
    setChunkUploadedCount(0);
    setUploadMessage("Reading file chunk, please wait...");
    const { hash, chunkSize, chunkTotal } = await calFileHash(file)
    console.log(hash, chunkSize, chunkTotal);
    const { data } = await verifyFileHash({ hash, chunkSize, total: chunkTotal });
    if (data.status === FileChunkStatus.success) {
      setUploadMessage("File already uploaded to server ! No need to upload");
      return;
    } else {
      await sendFileChunk(
        file,
        data,
        { chunkSize, hash, chunkCount: chunkTotal },
      );
      const mergeData = {
        chunkSize,
        filename: file!.name,
        size: file!.size,
        extension: getFileExtension(file!.name),
        total: chunkTotal,
        hash: hash,
      };
      await mergeChunk(mergeData);
      setChunkCount(chunkTotal);
    }
  }

  const normalUploadHandle = async (e) => {
    const file: File = e.target.files[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    setUploadMessage("Uploading file, please wait");
    try {
      const { data } = await rest.post<IFile>("filesystem/upload", form, {
        timeout: 300000 // 5 minutes
      });
      dispatch({
        type: ActionTypes.AddFile,
        payload: { file: data }
      });
      e.target = null;
      setUploadMessage("file uploaded successfully");
    } catch (err) {
      console.log(err);
      setUploadMessage("file upload fail, please try again");
    }
  }

  const displayFile = () => {
    return files.map(file => {
      const { unit, size: fileSize } = getFileSizeText(parseInt(file.size));
      const sizeToText = `${fileSize} ${unit}`;
      return {
        username: file.user?.name || 'guest user',
        size: sizeToText,
        filepath: file.filepath,
        filename: file.filename
      }
    })
  }
  return <>
    <Button
      component="label"
    >
      {uploadMessage}
    </Button>
    <input
      type="file"
      className="inputFileBtnHide"
      onChange={normalUploadHandle}
    />
    <MaterialTable
      title=""
      columns={columns}
      data={displayFile()}
    />
    </>
};

export default FileList;