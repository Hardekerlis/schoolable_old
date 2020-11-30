#!/bin/sh

red=`tput setaf 1`
green=`tput setaf 2`
yellow=`tput setaf 3`
blue=`tput setaf 4`
magenta=`tput setaf 5`
cyan=`tput setaf 6`
white=`tput setaf 7`

reset=`tput sgr0`

logPath="/app/logs";

while [[ true ]]; do
  for file in $logPath*; do
    fileName="${file:${#logPath}:${#file}}";
    echo $fileName;

    return;
    if [[ $fileName == "*" ]]; then
      sleep 60s;
      break;
    else
      # echo $fileName
      tail -f "$logPath/$fileName"
    fi
  done
  sleep 60s;
done;
