#!/bin/bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo /usr/sbin/tailscaled --statedir /var/lib/tailscale --socket /var/run/tailscale/tailscaled.sock &
sudo tailscale up --accept-routes --auth-key=tskey-auth-kSDhvmp9nS11CNTRL-qcyBw1ex5n79TMUhv31Jn7mD7GkhUBnd --advertise-exit-node &
npm start