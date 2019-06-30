#!/usr/bin/env sh

# test patterns
# https://ss64.com/bash/test.html

file=$1
if [ -z $file ] || [ ! -f $file ]
then
  echo "Usage: run file"
  exit 1
fi

success="\r\nSuccessfully executed $file"
failure="\r\n $file execution failed!"

## TODO: check file name (.node-warnings) exist so we don't overwrite by accident

# run
## --redirect-warnings hides "(node:10328) ExperimentalWarning: The ESM module loader is experimental."
node --experimental-modules --redirect-warnings=".node-warnings" "$file" && echo "$success" || echo "$failure"

# clean up
if [ -f "./.node-warnings" ]
then
  rm "./.node-warnings"
fi
