import fs from "fs";
import path from "path";

/**
 * Loads content from the CMS JSON files stored in the public/content directory
 * @param fileName The name of the JSON file without extension
 * @param locale The locale to get content for (optional, defaults to 'en')
 * @returns The parsed JSON content
 */
export async function getCmsContent(fileName: string, locale: string = "en") {
  // Determine the correct file path based on locale
  const filePath = path.join(
    process.cwd(),
    "public",
    "content",
    `${fileName}${locale !== "en" ? `.${locale}` : ""}.json`
  );

  try {
    // Try to read the file for the requested locale
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    // If the file doesn't exist for the requested locale, fall back to English
    if (locale !== "en") {
      const defaultFilePath = path.join(process.cwd(), "public", "content", `${fileName}.json`);
      const defaultContent = fs.readFileSync(defaultFilePath, "utf8");
      return JSON.parse(defaultContent);
    }

    // If even the default file doesn't exist, return an empty object
    console.error(`Failed to load CMS content for ${fileName}:`, error);
    return {};
  }
}
