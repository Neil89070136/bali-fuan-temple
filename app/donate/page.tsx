"use client";

export default function DonatePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#2b0000",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>建寺護持</h1>

      <button
        onClick={() => {
          alert("按鈕真的有動");
          console.log("按鈕真的有動");
        }}
        style={{
          marginTop: "20px",
          padding: "20px",
          background: "gold",
          color: "black",
          border: "none",
          cursor: "pointer",
        }}
      >
        我要護持
      </button>
    </div>
  );
}