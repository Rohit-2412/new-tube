import db from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
  "Music",
  "Gaming",
  "Education",
  "Entertainment",
  "Technology",
  "Sports",
  "Vlogs",
  "Science & Nature",
  "Movies & TV Shows",
  "Food & Cooking",
];

async function main() {
  console.log("Seeding categories...");
  try {
    const values = categoryNames.map((name) => ({
      name,
      description: `Videoes related to ${name.toLowerCase()}`,
    }));

    await db.insert(categories).values(values);
    console.log("Categories seeded successfully!");
  } catch (e) {
    console.error("Error seeding categories:", e);
    process.exit(1);
  }
}

main();
