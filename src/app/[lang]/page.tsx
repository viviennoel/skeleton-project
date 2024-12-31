import { WebsiteData } from "@/src/types/dictionaries";
import { getDictionary } from "./dictionaries";
import { SliceMachine } from "@/src/components/SliceMachine/SliceMachine";
import { MongoClient } from "mongodb";

export default async function HomePage({
  params }: {
    params: Promise<{ lang: 'en' | 'fr' }>;
  }) {
  const { lang } = await params;
  const dictionary: WebsiteData = await getDictionary(lang);

  async function getLatestArticles() {
    const uri = process.env.MONGODB_URI ?? "";
    if (!uri) {
      console.error("MongoDB URI is not defined in environment variables.");
      return [];
    }

    let client: MongoClient | null = null;

    try {
      client = await MongoClient.connect(uri);

      const db = client.db('blogDB');

      // Fetch the 3 latest articles with only required fields
      const articles = await db.collection('articles')
        .find({}, { projection: { title: 1, createdAt: 1, _id: 1, mainImage: 1 } }) // Fetch only these fields
        .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
        .limit(6) // Limit to 3 results
        .toArray();

      return articles.map(article => ({
        ...article,
        _id: article._id.toString(),
        createdAt: article.createdAt?.toString(),
      }));
    } catch (error) {
      console.error("Error connecting to MongoDB or fetching latest articles:", error);
      return [];
    }
  }

  const articles = await getLatestArticles();

  return <div>
    <SliceMachine data={dictionary.pages.home.slices!} articles={articles} />
  </div>
}
