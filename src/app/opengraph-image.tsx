import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Velocita Logistics — Smarter freight for a faster world";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a1d3f 0%, #1d61d8 60%, #3b94f6 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            V
          </div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>Velocita Logistics</div>
        </div>
        <div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            Smarter freight for a faster world.
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.85,
              marginTop: 24,
              maxWidth: 900,
            }}
          >
            4.2M shipments · 92 countries · 99.4% on-time
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
