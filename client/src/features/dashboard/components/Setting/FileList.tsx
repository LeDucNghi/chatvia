import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";
import { Images } from "../../../../constants";
import { files } from "../../../../mock";

export interface IFileListProps {}

export function FileList() {
  return (
    <div className="py-4 px-2">
      <div className="flex items-center flex-col cursor-pointer">
        {files.slice(0, 3).map((file, key) => {
          return (
            <div
              key={key}
              className="w-4/5 flex justify-between py-2 px-2 mb-4 hover-gray rounded-lg"
              // onClick={() => handleSelectImage(user.avatar!)}
            >
              <div className="w-[30px] mr-1 h-10 bg-gray-300 flex-center rounded-lg">
                <img
                  className="w-2/5 h-full object-contain rounded-xl"
                  src={Images.document}
                  alt={file.name}
                />
              </div>

              <div className="w-4/5 flex flex-col justify-between ">
                <p className="font-bold w-full truncate text-xs">{file.name}</p>

                <div className="w-full flex justify-between text-xs font-semibold text-gray-400">
                  <p> {file.length}MB </p>
                  <p> {file.date} </p>
                </div>
              </div>

              <div className="h-full ">
                <a href={Images.attachments} download="Attachment.png">
                  <IconButton>
                    <DownloadIcon />
                  </IconButton>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
