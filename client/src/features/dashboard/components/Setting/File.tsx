import { Images } from "../../../../constants";
import { files } from "../../../../mock";

export interface IFilesProps {
  openModal: (
    open: boolean,
    type: "addUser" | "members" | "imagesList" | "image"
  ) => void;
}

export default function Files({ openModal }: IFilesProps) {
  return (
    <div className="p-4">
      <div className="flex justify-between w-full mb-2">
        <h3 className="capitalize font-bold">files</h3>

        <button
          className="text-blue-400 capitalize"
          onClick={() => openModal(true, "imagesList")}
        >
          see all
        </button>
      </div>

      <div className="flex justify-between flex-col cursor-pointer">
        {files.slice(0, 3).map((file, key) => {
          return (
            <div
              key={key}
              className="w-full flex justify-between py-2 hover-gray rounded-lg"
              // onClick={() => handleSelectImage(user.avatar!)}
            >
              <div className="w-[30px] h-10 bg-gray-200 flex-center rounded-lg">
                <img
                  className="w-2/5 h-full object-contain rounded-xl"
                  src={Images.document}
                  alt={file.name}
                />
              </div>

              <div className="content w-4/5 flex flex-col justify-between ">
                <p className="font-bold w-full truncate text-xs">{file.name}</p>

                <div className="w-full flex justify-between text-xs font-semibold text-gray-400">
                  <p> {file.length} </p>
                  <p> {file.date} </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
