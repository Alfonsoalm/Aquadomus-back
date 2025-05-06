#!/bin/bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo systemctl start tailscaled.service
sudo tailscale up --auth-key=tskey-auth-kSDhvmp9nS11CNTRL-qcyBw1ex5n79TMUhv31Jn7mD7GkhUBnd --advertise-exit-node &
npm start