import { buildSubgraphSchema } from '@apollo/federation';
import { resolvers } from './resolvers';
import { typeDefs } from "./typeDefs";
import { ApolloServer, ApolloServer as LocalApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connectDb } from './config/connection';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});
connectDb();
async function startLocalServer() {
    const server = new LocalApolloServer({
        typeDefs,
        resolvers,
    });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 8080 },
    });
    return url;
}

    const url = startLocalServer();
    console.log(`🚀  Server ready at: ${url}`);
