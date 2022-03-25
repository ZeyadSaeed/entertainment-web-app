const PlayButtonHover = () => {
  return (
    <div
      className="absolute z-50 pointer-events-none duration-500 w-[117px] top-[50%] p-[9px] left-[50%]
      translate-x-[-50%] translate-y-[-50%] opacity-0 lg:peer-hover:opacity-100"
    >
      <div className="opacity-25 w-full h-full bg-white absolute rounded-[28.5px]" />
      <div className="flex relative gap-3 left-[9px] top-[9px]">
        <img className="z-50" src="/assets/icon-play.svg" alt="play" />
        <span className="text-[18px] font-[500] z-50">Play</span>
      </div>
    </div>
  );
};
export default PlayButtonHover;
