import { useEffect, useState } from "react";

export default function TestPage() {
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("Testing...");

  useEffect(() => {
    try {
      console.log("✅ TestPage component mounted successfully");
      setStatus(
        "✅ React is working! If you see this, the issue is in specific components.",
      );
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("❌ Error:", errorMsg);
      setError(errorMsg);
      setStatus("❌ Error loading page");
    }
  }, []);

  if (error) {
    return (
      <div
        style={{
          padding: "20px",
          color: "red",
          fontFamily: "monospace",
          backgroundColor: "#1a1a1a",
        }}
      >
        <h1>❌ Error Detected</h1>
        <pre>{error}</pre>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        color: "cyan",
        fontFamily: "monospace",
        backgroundColor: "#0a0a0a",
      }}
    >
      <h1>🧪 Test Page</h1>
      <p>{status}</p>
      <hr />
      <p>If you see this page, React rendering works.</p>
      <p>
        The blank page issue is likely in the Index component or its child
        components.
      </p>
      <hr />
      <h2>Next Step:</h2>
      <p>Go to http://localhost:8081/ to test home page</p>
      <p>Open DevTools (F12) → Console to see detailed errors</p>
    </div>
  );
}
