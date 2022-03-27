import React from "react";
import { ChromePicker } from "react-color";
import fileSaver from "file-saver";

import post from "./modules/post";
import Loader from "./UI/Loader";

function App() {
  const [qrImg, setQrImg] = React.useState<{ data: string; url: string }>();
  const [urlInput, setUrlInput] = React.useState<string>("");
  const [onLoad, setOnLoad] = React.useState<boolean>(false);
  const [color, setColor] = React.useState<string>("#000");
  const [openColorPicker, setOpenColorPicker] = React.useState<boolean>(false);

  const generateHandler = async () => {
    setOnLoad(true);
    await post({ text: urlInput, colorDark: color }).then((v) => {
      v && setOnLoad(false);
      setQrImg(v);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-center text-4xl font-bold sm:text-5xl lg:text-7xl h-72">
        Create QR Code
      </header>
      <div className="flex justify-center">
        <div className="shadow-sm flex p-6 flex-col container min-h-screen lg:min-h-0 max-w-lg lg:max-w-5xl lg:flex-row-reverse rounded-md border-[1px] border-blue-500">
          <div className="container w-full lg:w-1/3">
            {qrImg ? (
              <div className="w-full aspect-square">
                <img src={qrImg.url} className="w-full" alt="ak" />
              </div>
            ) : (
              <div
                className="flex items-center justify-center w-full text-2xl aspect-square"
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(255,255,255,1) 0%, ${color} 80%)`,
                }}
              >
                {onLoad ? <Loader /> : "Your QR"}
              </div>
            )}
            <button
              className="w-full h-12 text-black bg-cyan-400"
              onClick={() => {
                if (qrImg?.url) {
                  fileSaver.saveAs(qrImg.url, "QR Code.png");
                }
              }}
            >
              Download
            </button>
          </div>
          <div className="flex flex-col w-full h-full mt-3 lg:mt-0 lg:pr-6 lg:w-2/3">
            {/* ------------- input side ------------------- */}
            <div className="flex-grow flex-shrink basis-auto">
              <input
                placeholder="url ..."
                className="w-full p-2 bg-white border-2 border-gray-300 rounded-md lg:text-lg"
                onChange={(v) => setUrlInput(v.target.value)}
              />
              <div className="relative flex flex-row-reverse my-3 space-x-2 space-x-reverse">
                <div
                  className="p-1 border-2 border-gray-400 cursor-pointer h-14 aspect-square "
                  onClick={() => setOpenColorPicker((v) => !v)}
                >
                  <div
                    className={`w-full h-full`}
                    style={{ backgroundColor: color }}
                  />
                </div>
                <div className="flex items-center justify-center text-xl font-bold">
                  Choose Color :
                </div>
                {openColorPicker && (
                  <ChromePicker
                    className="absolute right-14"
                    color={color}
                    onChange={(v) => setColor(v.hex)}
                  />
                )}
              </div>
            </div>
            {/*               generate button            */}
            <button
              className="flex-grow-0 flex-shrink w-48 px-4 py-2 rounded-md basis-11 bg-cyan-400 "
              onClick={generateHandler}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
