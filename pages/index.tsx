import { useState } from "react";

export default function Home() {
  const [downloads, setDownloads] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const getDownloads = async () => {
    const response = await fetch("http://localhost:3000/api/getDownloads", {
      method: "POST",
      body: JSON.stringify({ inputValue })
    });
    const { downloads } = await response.json();
    setDownloads(downloads);
  };

  return (
    <section>
      <h1>Downloads</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button onClick={getDownloads}>Go</button>
      </div>
      {downloads && <p>This package has <b>{downloads}</b> downloads</p>}
    </section>
  );
}
