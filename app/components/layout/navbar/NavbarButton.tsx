import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

interface Props {
  show: boolean;
  onClick: () => void;
}

export default function NavbarButton({ show = true, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`absolute size-[24px] md:size-[32px] m-double ${
        show ? "opacity-100" : "opacity-0"
      } transition-opacity`}
      disabled={!show}
    >
      <Icon icon={"material-symbols:menu"} height="100%" width="100%" />
    </button>
  );
}
