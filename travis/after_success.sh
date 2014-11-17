#!/bin/sh
set -e
#
#> Deploy Continuous Integration
#> to Heroku for Staging or Production
#
#    @author Nick Kaye <nick@outrightmental.com>
#    @laboratory Outright Mental Inc.
#
HEROKU_USER_NAME="Continuous Integration"
HEROKU_USER_EMAIL="ci@outrightmental.com"

# Turn off warnings about SSH keys:
echo "Host heroku.com" >> ~/.ssh/config
echo "   StrictHostKeyChecking no" >> ~/.ssh/config
echo "   CheckHostIP no" >> ~/.ssh/config
echo "   UserKnownHostsFile=/dev/null" >> ~/.ssh/config

# Special config for angular-fullstack
if [[ $TRAVIS_PULL_REQUEST == "false" && $TRAVIS_BRANCH == "master" ]]
  then
    gem install heroku
    heroku keys:clear
    echo yes | heroku keys:add
    grunt build
    echo yes | grunt buildcontrol:heroku
    heroku keys:clear
fi
if [[ $TRAVIS_PULL_REQUEST == "false" ]]
  then
    echo $TRAVIS_BRANCH
fi
echo
echo "...done."