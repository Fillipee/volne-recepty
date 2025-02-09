import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { RecipeData } from './types';

const recipesDirectory = path.join(process.cwd(), 'content');

export function getSortedRecipesData(limit?: number): RecipeData[] {
    const fileNames = fs.readdirSync(recipesDirectory);
    const allPostsData: RecipeData[] = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(recipesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const { data } = matter(fileContents);
        return {
            slug,
            ...(data as Omit<RecipeData, 'slug' | 'contentHtml'>),
        };
    });

    const sortedPosts = allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return limit ? sortedPosts.slice(0, limit) : sortedPosts;
}

export async function getRecipesData(slug: string): Promise<RecipeData> {
    const fullPath = path.join(recipesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        contentHtml,
        ...(data as Omit<RecipeData, 'slug' | 'contentHtml'>),
    };
}

export function getAllTags(): string[] {
    const posts = getSortedRecipesData();
    const tagsSet = new Set<string>();

    posts.forEach((post) => {
        if (post.tags) {
            post.tags.forEach((tag) => tagsSet.add(tag));
        }
    });

    return Array.from(tagsSet);
}

export function getRecipesByTag(tag: string): RecipeData[] {
    const posts = getSortedRecipesData();
    return posts.filter((post) => post.tags && post.tags.includes(tag));
}
