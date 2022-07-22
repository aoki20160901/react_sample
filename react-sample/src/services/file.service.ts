import SparkMD5 from "spark-md5";

type ChunkData = {
  hash: string
  chunkSize: number
  chunkTotal: number
}
// use for cutting file into smaller files
const blobSlice = File.prototype.slice;

export const KB = 1024;
export const MB = 1024 * KB;
export const GB = 1024 * MB;

// Calculate file hash
export const calFileHash = (file: File): Promise<ChunkData> => {
  const fileSize = file.size;
  let chunkSize: number = 2 * MB;
  if (fileSize > 500 * MB) {
    chunkSize = 10 * MB;
  } else if (fileSize > 100 * MB) {
    chunkSize = 5 * MB;
  }

  return new Promise<any>((resolve, reject) => {
    const chunks = Math.ceil(fileSize / chunkSize);

    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    let currentChunk = 0;

    fileReader.onload = function (e) {
      console.log("read chunk nr", currentChunk + 1, "of", chunks);
      const fileReaderTarget = e.target as any;
      const fileBufferArr = fileReaderTarget.result as ArrayBuffer;
      spark.append(fileBufferArr); // Append array buffer
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        const chunkTotal = currentChunk;
        const hash = spark.end();
        resolve({
          hash,
          chunkTotal,
          chunkSize,
        });
      }
    };

    fileReader.onerror = function () {
      reject("Failed to read the segmented file, please try again");
    };

    loadNext();

    function loadNext() {
      var start = currentChunk * chunkSize,
        end =
          start + chunkSize >= file.size
            ? file.size
            : start + chunkSize;
      fileReader.readAsArrayBuffer(sliceFile(file, start, end));
    }
  }).catch((err) => {
    console.log(err);
  });
}

export const sliceFile = (file: File, start: number, end: number) => {
  return blobSlice.call(file, start, end);
}

export const getFileSizeText = (fileSize: number) => {
  let size: string = "";
  let unit: string = "";
  if (fileSize >= GB) {
    size = (fileSize / GB).toFixed(2);
    unit = "GB";
  } else if (fileSize >= MB) {
    size = (fileSize / MB).toFixed(2);
    unit = "MB";
  } else if (fileSize >= KB) {
    size = (fileSize / KB).toFixed(2);
    unit = "KB";
  } else {
    size = fileSize.toFixed(2);
    unit = "B";
  }
  return { unit, size };
}

export const getFileExtension = (filename: string) => {
  return filename.split('.').pop() || "";
}