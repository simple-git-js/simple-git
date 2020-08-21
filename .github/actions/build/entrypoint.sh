#!/bin/sh

set -e

# Respect NPM_CONFIG_USERCONFIG if it is provided, default to $HOME/.npmrc
NPM_CONFIG_USERCONFIG="${NPM_CONFIG_USERCONFIG-"$HOME/.npmrc"}"

if [ -n "$NPM_CUSTOM_NPMRC" ]; then
  # Use a fully-formed npmrc file if provided
  echo "$NPM_CUSTOM_NPMRC" > "$NPM_CONFIG_USERCONFIG"

  chmod 0600 "$NPM_CONFIG_USERCONFIG"
elif [ -n "$NPM_AUTH_TOKEN" ]; then
  # Respect NPM_CONFIG_USERCONFIG if it is provided, default to $HOME/.npmrc
  NPM_CONFIG_USERCONFIG="${NPM_CONFIG_USERCONFIG-"$HOME/.npmrc"}"
  NPM_REGISTRY_URL="${NPM_REGISTRY_URL-registry.npmjs.org}"
  NPM_STRICT_SSL="${NPM_STRICT_SSL-true}"
  NPM_REGISTRY_SCHEME="https"
  if ! $NPM_STRICT_SSL; then
    NPM_REGISTRY_SCHEME="http"
  fi

  # Allow registry.npmjs.org to be overridden with an environment variable
  printf "//%s/:_authToken=%s\\nregistry=%s\\nstrict-ssl=%s" "$NPM_REGISTRY_URL" "$NPM_AUTH_TOKEN" "${NPM_REGISTRY_SCHEME}://$NPM_REGISTRY_URL" "${NPM_STRICT_SSL}" > "$NPM_CONFIG_USERCONFIG"

  chmod 0600 "$NPM_CONFIG_USERCONFIG"
fi

GIT_CONFIG_USER_NAME="${GIT_CONFIG_USER_NAME-"simple-git build agent"}"
GIT_CONFIG_USER_MAIL="${GIT_CONFIG_USER_MAIL-"actions@users.noreply.github.com"}"

# initialize git
GIT_REMOTE_URL="https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"

git config http.sslVerify false
git config user.name "${GIT_CONFIG_USER_NAME}"
git config user.email "${GIT_CONFIG_USER_MAIL}"
git remote add build-agent "${GIT_REMOTE_URL}"
git remote --verbose
git show-ref # useful for debugging
git branch --verbose

# Dependencies are installed at build time
pwd
ls
node /src/index.js "$@"

# git push "${GIT_REMOTE_URL}" --tags
