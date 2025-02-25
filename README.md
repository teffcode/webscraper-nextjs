# 🥷🏻 WebScraper with NextJS 🥷🏻

> Dependencies: `npm i jsdom`
<kbd>
<img width="625" alt="Screenshot 2025-02-25 at 10 20 46 AM" src="https://github.com/user-attachments/assets/a8e23911-c9c2-43f7-9535-51cb07f18eba" />
</kbd>

## Client:

> Path: `pages/index.tsx`

```
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
```

## Server:

> Path: `pages/api/getDownloads.tsx`

```
import { JSDOM } from "jsdom";
import { NextApiRequest, NextApiResponse } from "next";

const getDownloads = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const { inputValue } = body;

  const response = await fetch(`https://www.npmjs.com/package/${inputValue}`);
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;
  const downloads = document.querySelector("._9ba9a726")?.textContent;

  res.status(200).json({ downloads });
}

export default getDownloads;
```
