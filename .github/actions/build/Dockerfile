FROM node:12-slim

LABEL version="1.0.0"
LABEL repository="http://github.com/simple-git-lib/simple-git"
LABEL homepage="http://github.com/simple-git-lib"
LABEL maintainer="Steve King <steve@mydev.co>"

LABEL com.github.actions.name="Inline action."
LABEL com.github.actions.description="Testing of creating an inline action."
LABEL com.github.actions.icon="package"
LABEL com.github.actions.color="green"

RUN apt-get update && apt-get -y --no-install-recommends install git && rm -rf /var/lib/apt/lists/*

COPY . .

RUN cd src && npm i

ENTRYPOINT ["/entrypoint.sh"]
CMD ["help"]
