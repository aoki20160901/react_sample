import { IFile } from "../../context/File/Interfaces";
import { getFileSizeText } from "../../services/file.service";

interface IProps {
  file: IFile;
};

const FileRow = (props: IProps) => {
  const { user, filename, filepath, size } = props.file;
  const userName = user?.name || 'guest user';
  const { unit, size: fileSize } = getFileSizeText(parseInt(size));
  const sizeToText = `${fileSize} ${unit}`;

  return (
    <div>
      <div title={userName} className="username">
        {userName}
      </div>
      <div title={filename} className="filename">
        {filename}
      </div>
      <div title={filepath} className="filepath">
        {filepath}
      </div>
      <div title={sizeToText} className="size">
        {sizeToText}
      </div>
    </div>
  );
};

export default FileRow;