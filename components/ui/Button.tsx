import { forwardRef } from "preact/compat";

import type { ComponentType, JSX } from "preact";

import Spinner from "./Spinner.tsx";

export type Props =
  & Omit<JSX.IntrinsicElements["button"], "as" | "size" | "loading">
  & {
    as?: keyof JSX.IntrinsicElements | ComponentType;
    variant?: keyof typeof variants;
    loading?: boolean;
    disabled?: boolean;
    type?: string;
  };

const variants = {
  primary:
    "py-[5px] px-[45px] w-[190px] text-black rounded-[5px] border-0 inline-block font-bold bg-white hover:text-white text-[16px] transition-all duration-300 hover:bg-black focus:outline-none outline-none",
  secondary:
    " py-[5px] px-[45px] w-[190px] text-white rounded-[5px] border-0 inline-block font-bold bg-black text-[16px] transition-all duration-300 focus:outline-none outline-none",
  tertiary:
    "p-[10px] w-[160px] h-11 rounded-[50px] border-0 inline-block font-bold bg-primary text-white text-[12px] transition-all duration-300 hover:scale-110 focus:outline-none outline-none",
  blue:
    " p-[10px] w-[200px] rounded-[50px] border-none font-bold bg-primary text-[12px] text-white transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white focus:outline-none outline-none",
  white:
    " p-[10px] w-[200px] rounded-[50px] border-none font-bold bg-white text-[12px] transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white focus:outline-none outline-none",
  black:
    "p-[10px] w-[200px] h-11 rounded-[50px] border-0 font-bold bg-black text-white text-[12px] transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white focus:outline-none outline-none",
  transparent:
    "p-[10px] w-[200px] h-11 rounded-[50px] border-0 font-bold bg-transparent text-white text-[12px] border-1 border-white transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white hover:border-none focus:outline-none outline-none",
  link:
    "h-[40px] rounded-[50px] underline font-bold bg-none text-black text-[12px] lg:text-[14px] !transition-all hover:text-primary focus:outline-none outline-none duration-300 tracking-[0.7px]",
  outlined:
    "p-[10px] w-[200px] h-[40px] rounded-[50px] border-1 border-[#fff] inline-block font-bold bg-none text-white text-[12px] lg:text-[14px] !transition-all hover:scale-110 hover:bg-[#0030A0] hover:border-[#0030A0] focus:outline-none outline-none lg:w-[250px] duration-300 tracking-[0.7px]",
  checkout:
    "p-[10px] w-full h-11 rounded-[50px] inline-block font-bold bg-primary text-white text-[12px] transition-all duration-300 focus:outline-none outline-none disabled:bg-gray",
  icon: "h-[20px] rounded-full bg-transparent text-default border-transparent",
  buy:
    "p-[15px] w-full cursor-pointer rounded-none  inline-block font-normal leading-none bg-black text-white text-[24px] transition-all duration-300  focus:outline-none outline-none",
  assista:
    "p-[10px] w-[160px] lg:w-[200px] h-[40px] rounded-[50px] border-0 inline-block font-bold bg-primary text-white text-[12px] lg:text-[14px] tracking-[0.7px] transition-all duration-300 hover:scale-110 hover:bg-primary focus:outline-none outline-none",
};

const Button = forwardRef<HTMLButtonElement, Props>(({
  variant = "primary",
  as = "button",
  type = "button",
  class: _class = "",
  children,
  loading,
  disabled,
  ...props
}, ref) => {
  const Component = as as ComponentType<
    { disabled?: boolean; className: string; type: string }
  >;
  const styles = variants[variant];

  return (
    <Component
      {...props}
      className={`inline-flex items-center justify-center cursor-pointer disabled:cursor-not-allowed ${styles} ${_class}`}
      disabled={disabled || loading}
      type={type}
      ref={ref}
    >
      {loading === true ? <Spinner size={18} /> : children}
    </Component>
  );
});

export default Button;
