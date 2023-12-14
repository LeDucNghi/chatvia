import { Images } from "../../../../constants";
import { files } from "../../../../mock";

export interface ILinksModalProps {}

export function LinksModal(props: ILinksModalProps) {
  return (
    <div className="py-4 px-2">
      <div className="flex items-center flex-col cursor-pointer ">
        {files.slice(0, 3).map((file, key) => {
          return (
            <a
              key={key}
              href="https://www.facebook.com/nghile.genji/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-4/5 flex justify-between py-2 px-6 mb-4 hover-gray rounded-lg"
              // onClick={() => handleSelectImage(user.avatar!)}
            >
              <div className="w-[30px] h-10 bg-gray-300 flex-center rounded-lg">
                <img
                  className="w-2/5 h-full object-contain rounded-xl"
                  src={Images.attachments}
                  alt={file.name}
                />
              </div>

              <div className="w-4/5 flex flex-col justify-between ">
                <p className="font-bold w-full truncate text-xs">{file.name}</p>

                <div className="w-full flex justify-between text-xs font-semibold text-gray-400">
                  <p> {file.date} </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
