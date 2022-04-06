#!/usr/bin/bash
ssf -g -R 0.0.0.0:6001:127.0.0.1:6001 dtube.fso.ovh &
ssf -R 3001:localhost:3001 dtube.fso.ovh & #avalon (dtube) api
