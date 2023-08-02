import Icon from "$store/components/ui/Icon.tsx";

const LoginPage = () => {
  return (
    <div class="mx-auto max-w-[399px] mt-28">
      <div class="border border-black rounded flex flex-col text-center">
        <div class="mx-auto">
          <Icon id="Logo" width={120} height={100} />
        </div>
        <p>Use uma das opções para confirmar sua identidade</p>
        <div class=" border-b mt-4" />
        <div class="p-[15px] mt-3 mb-3">
          <button class="btn  rounded-r-[1px] hover:opacity-80 opacity-100 text-base font-normal traking-[0.5px] w-full rounded-l-none text-white disabled:loading">
            Receber chave de acesso rápido por email
          </button>
          <button class="btn mt-[15px] rounded-r-[1px] hover:opacity-80 opacity-100 text-base font-normal traking-[0.5px] w-full rounded-l-none text-white disabled:loading">
            Entrar com email e senha
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
