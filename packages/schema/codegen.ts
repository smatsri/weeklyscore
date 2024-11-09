import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/graphql/schema.gql",
  generates: {
    "src/graphql/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-operations"],
    },
  },
};

export default config;
