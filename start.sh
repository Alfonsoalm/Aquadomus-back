#!/bin/bash
curl -fsSL https://tailscale.com/install.sh | sh
tailscale up --accept-routes --auth-key=$TAILSCALE_AUTHKEY --background &
npm start