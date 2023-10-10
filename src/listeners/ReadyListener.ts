/* eslint-disable class-methods-use-this */
import { Listener, Result } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { AttachmentBuilder, EmbedBuilder } from "discord.js";

@ApplyOptions<Listener.Options>({
    event: "ready"
})

export class ReadyListener extends Listener {
    public run(): any {
        setInterval(async () => {
            await Result.fromAsync(async () => {
                const image = await this.container.client.oneCak.getImage();
                const result = await fetch(image.url, {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
                        "Referrer-Policy": "strict-origin-when-cross-origin",
                        referer: "https://1cak.com/",
                        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
                    }
                });

                const channel = this.container.client.channels.cache.get("1161287630185570405");
                const buffer = await result.arrayBuffer();

                if (channel?.isTextBased()) {
                    const message = await channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle(image.title)
                                .setImage("attachment://image.jpg")
                                .setColor("Blurple")
                        ],
                        files: [
                            new AttachmentBuilder(Buffer.from(buffer), { name: "image.jpg" })
                        ]
                    });

                    const emoji = ["😂", "🔼", "🔽"];

                    for (const emote of emoji) {
                        await message.react(emote);
                    }
                }
            });
        }, 5500);
    }
}
