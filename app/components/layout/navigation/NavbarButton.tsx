import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

interface Props {
  show: boolean;
  onClick: () => void;
}

export default function NavbarButton({ show = true, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`absolute mt-single py-single px-double rounded-e-full ${
        show ? "opacity-100" : "opacity-0"
      } transition-opacity drop-shadow-top`}
      disabled={!show}
      style={{
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="h-[32px] aspect-square">
        <Icon icon={"material-symbols:menu"} height="100%" width="100%" />
      </div>
    </button>
  );
}
