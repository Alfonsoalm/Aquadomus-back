#!/bin/bash
sleep 5
apt-get update && apt-get install -y tailscale
tailscale up --accept-routes --auth-key=$TAILSCALE_AUTHKEY &
npm start