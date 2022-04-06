#!/usr/bin/bash
ssf -g -R 0.0.0.0:6001:127.0.0.1:6001 dtube.fso.ovh & #Avalon's p2p port bugs with the reverse port forwarding
ssf -R 3001:localhost:3001 dtube.fso.ovh & #avalon (dtube) api
