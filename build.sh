#!/bin/sh

# Update protocol.json
#
# Clone git clone https://chromium.googlesource.com/deps/inspector_protocol
# to get the inspector protocol scripts.
python ../inspector_protocol/convert_protocol_to_json.py pdl/protocol.pdl json/protocol.json
