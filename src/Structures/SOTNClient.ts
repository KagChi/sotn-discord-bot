import { SapphireClient } from "@sapphire/framework";
import { Cirql } from "cirql";
import { databaseEndpoint, databaseNS, databaseDB, databaseUser, DatabasePassword, discordToken } from "../config.js";

export class SOTNClient extends SapphireClient {
    public cirql = new Cirql({
        connection: {
            endpoint: databaseEndpoint,
            namespace: databaseNS,
            database: databaseDB
        },
        credentials: {
            user: databaseUser,
            pass: DatabasePassword
        }
    });

    public override async login(): Promise<string> {
        await this.cirql.ready();
        return super.login(discordToken);
    }
}

declare module "@sapphire/pieces" {
    type SapphireClient = SOTNClient;

    interface Container {
        client: SapphireClient;
    }
}
