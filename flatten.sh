#!/usr/bin/env bash

rm -rf flats/*
./node_modules/.bin/truffle-flattener contracts/TemplateToken.sol > flats/TemplateToken_flat.sol
./node_modules/.bin/truffle-flattener contracts/TemplateCrowdsale.sol > flats/TemplateCrowdsale_flat.sol

