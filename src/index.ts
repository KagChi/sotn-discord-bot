import "dotenv/config";

import { ActivityType, GatewayIntentBits } from "discord.js";
import { SOTNClient } from "./Structures/SOTNClient.js";
import "@clytage/pino-logger/register";

const client = new SOTNClient({
    presence: {
        activities: [
            {
                name: "SOTN JAYA !",
                type: ActivityType.Competing
            }
        ]
    },
    logger: {
        pino: {
            timestamp: true,
            transport: {
                targets: [{
                    target: "pino-pretty",
                    level: "info",
                    options: {
                        translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l o"
                    }
                }]
            }
        }
    },
    intents: [
        GatewayIntentBits.Guilds
    ]
});

await client.login();

