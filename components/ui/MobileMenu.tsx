import Icon from "$store/components/ui/Icon.tsx";

const MenuItems = [
  {
    href: "/",
    icon: "Map-marker",
    text: "Loja",
    width: 20,
    height: 20,
  },
  { href: "/", icon: "UserNav", text: "Minha Conta", width: 20, height: 20 },
  { href: "/", icon: "Heart-filled", text: "Favoritos", width: 20, height: 20 },
];

const MobileMenu = () => {
  return (
    <div class="lg:hidden flex justify-around items-center fixed bottom-0 w-full z-40 bg-white h-16">
      {MenuItems.map((item) => (
        <a href="/" class="text-center flex-col justify-center py-[10px]">
             <Icon
                  id={item.icon}
                  width={item.width}
                  height={item.height}
                  class="mx-auto"
                />
                <span class="font-light">{item.text}</span>
        </a>
      ))}
    </div>
  );
};

export default MobileMenu;
