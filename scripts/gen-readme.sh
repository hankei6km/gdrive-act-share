#!/bin/bash
set -e

INSERT='<!-- INSERT -->'
sed "/${INSERT}/r "<(npx action-docs --no-banner | sed 1,3d)  scripts/README_template.md | sed -e "s/${INSERT}//" > README.md