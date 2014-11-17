#!/bin/sh
set -e
#
#> Deploy Continuous Integration
#> to Heroku for Staging or Production
#
#    @author Nick Kaye <nick@outrightmental.com>
#    @laboratory Outright Mental Inc.
#
#> Usage
#
#    ./deploy_heroku.sh
#
#  Requires environment variables to be defined:
#
#    HEROKU_URL
#    HEROKU_USER_NAME
#    HEROKU_USER_EMAIL
#

if [ -z "$HEROKU_URL" ]
then
  echo "ERROR: No Heroku URL Specified"
  exit 1
else
  echo "Heroku URL: $HEROKU_URL"
fi

if [ -z "$HEROKU_USER_NAME" ]
then
  echo "ERROR: No Heroku USER_NAME Specified"
  exit 1
else
  echo "Heroku USER_NAME: $HEROKU_USER_NAME"
fi

if [ -z "$HEROKU_USER_EMAIL" ]
then
  echo "ERROR: No Heroku USER_EMAIL Specified"
  exit 1
else
  echo "Heroku USER_EMAIL: $HEROKU_USER_EMAIL"
fi

# Turn off warnings about SSH keys:
echo "Host heroku.com" >> ~/.ssh/config
echo "   StrictHostKeyChecking no" >> ~/.ssh/config
echo "   CheckHostIP no" >> ~/.ssh/config
echo "   UserKnownHostsFile=/dev/null" >> ~/.ssh/config

# Clone Heroku deployment repo to /dist folder (else fail)
git clone $HEROKU_URL dist || { exit 1; }

# Build to /dist folder (else fail)
grunt build || { echo "ERROR: Grunt failed to build"; exit 1; }

# Enter /dist folder (else fail)
cd dist || { echo "ERROR: No /dist folder"; exit 1; }

# Commit and Push /dist folder back to Heroku
git config --global user.name "$HEROKU_USER_NAME"
git config --global user.email "$HEROKU_USER_EMAIL"
git add -A *
git commit -am "Deploy"
git push origin master

