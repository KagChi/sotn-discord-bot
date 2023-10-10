/* eslint-disable class-methods-use-this */

import { load } from "cheerio";

const filteredImageLink = ["https://1cak.com/images/unsave.jpg", "images/unsave.jpg"];

export class OneCak {
    public lastImageUrl: string | null = null;
    public lastTitle: string | null = null;

    public async getWebData(): Promise<string> {
        const data = await fetch("https://1cak.com/shuffle");
        return data.text();
    }

    public async getImage(): Promise<{ url: string; title: string }> {
        const raw = await this.getWebData();

        const imageLink = this.filterImageOnly(raw);
        const titleImage = this.filterTextOnly(raw);

        if (filteredImageLink.includes(imageLink!)) return this.getImage();

        this.lastImageUrl = imageLink!;
        this.lastTitle = titleImage!;

        return { url: imageLink!, title: titleImage! };
    }

    public filterImageOnly(htmlData: string): string | undefined {
        const $ = load(htmlData);
        return $("img").attr("src");
    }

    public filterTextOnly(htmlData: string): string | undefined {
        const $ = load(htmlData);
        return $("img").attr("title");
    }
}
