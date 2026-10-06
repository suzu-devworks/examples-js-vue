#!/bin/sh
script_user=`whoami`
script_dir=$(realpath "$(dirname "$0")")

echo "USER:" ${script_user}
echo "DIR:" ${script_dir}
echo

# Change ownership
sudo chown ${script_user} node_modules
sudo chown ${script_user} $HOME/.copilot

# Install pnpm
curl -fsSL https://get.pnpm.io/install.sh | SHELL=/bin/bash sh -
