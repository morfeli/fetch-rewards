import clsx from "clsx";

type MobileBtnProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

export const MobileBtn = ({ isOpen, toggleMenu }: MobileBtnProps) => {
  return (
    <div className="sm:hidden">
      <button className="relative z-100 " onClick={toggleMenu}>
        <div
          className={clsx(
            "relative flex overflow-hidden items-center justify-center rounded-full w-[25px] h-[25px] transform transition-all ring-0 bg-slate-700 hover:ring-8 ring-gray-300 ring-opacity-30 duration-200 shadow-md",
            {
              "ring-4": isOpen,
              "ring-0": !isOpen,
            },
          )}
        >
          <div className="flex flex-col justify-evenly items-center w-[20px] h-[15px] transform transition-all duration-300 origin-center overflow-hidden">
            <div
              className={clsx(
                "bg-white h-[1px] w-4 transform transition-all duration-300 origin-left",
                {
                  "translate-x-10": isOpen,
                },
              )}
            ></div>
            <div
              className={clsx(
                "bg-white h-[1px] w-4 transform transition-all duration-300 origin-left delay-75",
                {
                  "translate-x-10 ": isOpen,
                },
              )}
            ></div>
            <div
              className={clsx(
                "bg-white h-[1px] w-4 transform transition-all duration-300 origin-left delay-150",
                {
                  "translate-x-10 ": isOpen,
                },
              )}
            ></div>
            <div
              className={clsx(
                "absolute items-center justify-between transform transition-all duration-500 top-2 -translate-x-10 flex w-0",
                {
                  "translate-x-0 w-5": isOpen,
                },
              )}
            >
              <div
                className={clsx(
                  "absolute bg-white h-[1px] w-5 transform transition-all duration-500 delay-300",
                  {
                    "rotate-45": isOpen,
                  },
                )}
              ></div>
              <div
                className={clsx(
                  "absolute bg-white h-[1px] w-5 transform transition-all duration-500 delay-300",
                  {
                    "-rotate-45": isOpen,
                  },
                )}
              ></div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
