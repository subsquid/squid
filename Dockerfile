ARG node=node:16-alpine
FROM ${node} AS node


FROM node AS builder
RUN apk add g++ make python3
WORKDIR /squid
ADD . .
RUN node common/scripts/install-run-rush.js install
RUN node common/scripts/install-run-rush.js build
RUN cd cli && npx oclif manifest


FROM builder AS substrate-archive-builder
RUN node common/scripts/install-run-rush.js deploy --project @subsquid/substrate-archive


FROM node AS substrate-archive
COPY --from=substrate-archive-builder /squid/common/deploy /squid
WORKDIR /squid/substrate-archive
ENTRYPOINT ["node", "/squid/substrate-archive/bin/run.js"]


FROM builder AS substrate-archive-openreader-builder
RUN node common/scripts/install-run-rush.js deploy --project @subsquid/substrate-archive-openreader


FROM node AS substrate-archive-openreader
COPY --from=substrate-archive-openreader-builder /squid/common/deploy /squid
WORKDIR /squid/substrate-archive-openreader
ENTRYPOINT [ "npx", "openreader", "schema.graphql"]
