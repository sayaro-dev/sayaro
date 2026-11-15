import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-260 -260 520 520"
          width="140"
          height="140"
        >
          <path
            fill="#13171B"
            fillRule="evenodd"
            d="M-5.66 -0.00 L-95.66 90.00 L0.00 185.66 L95.66 90.00 L5.66 -0.00 L95.66 -90.00 L0.00 -185.66 L-95.66 -90.00 Z M4.00 -9.66 L4.00 -170.34 L84.34 -90.00 Z M-84.34 -90.00 L-4.00 -170.34 L-4.00 -9.66 Z M84.34 90.00 L4.00 170.34 L4.00 9.66 Z M-84.34 90.00 L-4.00 9.66 L-4.00 170.34 Z M0.00 255.66 L255.66 0.00 L0.00 -255.66 L-255.66 0.00 Z M0.00 244.34 L-244.34 0.00 L0.00 -244.34 L244.34 0.00 Z"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
