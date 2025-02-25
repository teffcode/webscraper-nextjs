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
