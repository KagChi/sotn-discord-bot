import "dotenv/config";

import { ActivityType, GatewayIntentBits } from "discord.js";
import { SOTNClient } from "./structures/SOTNClient.js";
import "@clytage/pino-logger/register";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

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
    baseUserDirectory: resolve(dirname(fileURLToPath(import.meta.url))),
    intents: [
        GatewayIntentBits.Guilds
    ]
});

await client.login();

