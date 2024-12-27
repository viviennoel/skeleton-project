import path from "path";
import fs from "fs";

export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const slug = (await params).slug
      // Build the file path
      const filePath = path.join(process.cwd(), "src/data-AI-generated//general-pages", `${slug}.json`);

      // Read the JSON file
      const fileContents = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(fileContents);

    return <div>My Post: {data.title}</div>
  }