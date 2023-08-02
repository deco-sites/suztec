import Icon from "$store/components/ui/Icon.tsx";


const VideoTecnologia = () => {
  return (
    <div class="max-w-[1140px] mx-auto py-[30px] px-[10px]">
      <div class="flex flex-row max-h-[267px]">
        <a class="relative w-1/3 cursor-pointer">
          <span class="absolute top-24 left-[147px] bg-white rounded-full p-3 px-4 opacity-60 hover:opacity-80 transition-all ease-in-out duration-200">
           <Icon id="Play" width={40} height={50} />
          </span>
          <img
            src="https://thenorthface.vteximg.com.br/arquivos/video-pluma.png?v=637200799200800000"
            width={376}
            height={267}
          />
        </a>
        <div class="items-center w-8/12 bg-[#2a2a2a] ">
          <div class="mx-auto py-16 text-white max-w-[470px]">
            <span class="uppercase font-bold text-sm ">PLUMA DE GANSO:</span>
            <p class="mt-[15px] font-normal text-sm">
              As plumas de ganso são excelentes isolantes térmicos. Na The North
              Face, nossa cadeia é certificada com o selo Responsible Down
              Standart, que auditora e garante que os animais são cuidados o
              tempo todo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTecnologia;
