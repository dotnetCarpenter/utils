#!/usr/bin/env sh

file=$1
if [ -z $file ] || [ ! -f $file ]
then
  echo "Usage: run file"
  exit 1
fi

#run
node --experimental-modules "$file"
