import React from "react";
import GenericTemplate from "../templates/GenericTemplate";
import FileList from "../organisms/FileList";
import { FileStoreProvider } from "../../context/File/FileStore";

const HomePage: React.FC = () => {
  return (
    <GenericTemplate title="ファイルアップロード">
      <FileStoreProvider>
        <FileList></FileList>
      </FileStoreProvider>
    </GenericTemplate>
  );
};

export default HomePage;