#!/bin/bash
set -e

cp scripts/README_template.md README.md
npx action-docs --no-banner  -u README.md
sed -e "s/:CUR_VER$/$(jq < package.json -r .version)/" -i README.md
