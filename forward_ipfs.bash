#!/usr/bin/bash
HOST=s7.fso.ovh
ssf -g -R localhost:5002:localhost:5002 $HOST & #IPFS API
ssf -g -R localhost:8080:localhost:8080 $HOST & #IPFS Public Gateway
