#!/usr/bin/env bash

sudo apt update && sudo apt install -y fish build-essential ruby-full
sudo -H gem install bundler
(
    cd blog
    bundle install
)
