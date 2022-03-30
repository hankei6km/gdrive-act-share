#!/bin/bash
set -e

INSERT='<!-- INSERT -->'
sed "/${INSERT}/r "<(npx action-docs --no-banner | sed 1,3d)  scripts/README_template.md |\
  sed -e "s/${INSERT}//" |\
  sed -e "s/:CUR_VER$/$(jq < package.json -r .version)/" > README.md
