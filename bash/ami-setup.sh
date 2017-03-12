#!/usr/bin/env bash

# Install go
sudo add-apt-repository ppa:ubuntu-lxc/lxc-stable
sudo apt-get update
sudo apt-get install golang

# Configure environment for Go
echo 'export GOROOT=/usr/local/go' >> ~/.bashrc
echo 'export GOPATH=$HOME/go' >> ~/.bashrc
echo 'export PATH=$PATH:$GOROOT/bin:$GOPATH/bin' >> ~/.bashrc

# Install Git
sudo apt-get install git

# Configure Git
git config --global user.name "lansana"
git config --global user.email "lxc5296@gmail.com"