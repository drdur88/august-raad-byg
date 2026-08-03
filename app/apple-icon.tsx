import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2d3748",
        }}
      >
        <svg width="118" height="118" viewBox="0 0 100 100">
          <path d="M 30 74 L 50 26 L 70 74" fill="none" stroke="#b8956a" strokeWidth="11" strokeLinejoin="miter" strokeLinecap="butt" />
          <line x1="38" y1="58" x2="62" y2="58" stroke="#b8956a" strokeWidth="8" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
