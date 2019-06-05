#!/usr/bin/env sh

# test patterns
# https://ss64.com/bash/test.html

file=$1
if [ -z $file ] || [ ! -f $file ]
then
  echo "Usage: run file"
  exit 1
fi

#run
node --experimental-modules "$file"
