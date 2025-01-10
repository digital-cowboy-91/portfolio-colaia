export default function GradientBackground() {
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 -z-10"
    >
      <rect
        width="100%"
        height="100%"
        x="0"
        y="0"
        style={{ fill: "url(#_Radial1)" }}
      />
      <defs>
        <radialGradient id="_Radial1" cx="0" cy="0" r="1">
          <stop
            offset="0"
            style={{ stopColor: "rgb(0,191,255)", stopOpacity: 1 }}
          />
          <stop
            offset="1"
            style={{ stopColor: "rgb(255,0,126)", stopOpacity: 0 }}
          />
        </radialGradient>
      </defs>
    </svg>
  );
}
