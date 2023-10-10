import "dotenv/config";

import { SapphireClient } from "@sapphire/framework";
import { ActivityType, GatewayIntentBits } from "discord.js";
import { discordToken } from "./config.js";

const client = new SapphireClient({
    presence: {
        activities: [
            {
                name: "SOTN JAYA !",
                type: ActivityType.Competing
            }
        ]
    },
    intents: [
        GatewayIntentBits.Guilds
    ]
});

await client.login(discordToken);

