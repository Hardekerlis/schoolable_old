
#!/bin/bash

red=`tput setaf 1`
green=`tput setaf 2`
yellow=`tput setaf 3`
blue=`tput setaf 4`
magenta=`tput setaf 5`
cyan=`tput setaf 6`
white=`tput setaf 7`

reset=`tput sgr0`

function kube () {
  echo "";
  echo "${cyan}Running: ${blue}kubectl $1 ${green}"
  kubectl $1;
  echo "${cyan}Finished${reset}";
  return;
}

function esSetup {
  while [[ true ]]; do

    echo "Would you like to delete or apply the config files? Enter 'apply' or 'delete'"
    read  -p "Enter option: " option;

    if [[ $option == "apply" ]]; then
      echo "${green}Starting up Elastic cloud";
      statusMsg="Setting up configuration${reset}"

      command=$"$option -f $(pwd)/apply-first/";

      kube "$command"
      wait

      command=$"$option -f $(pwd)/apply-later/";

      kube "$command"
      wait

      echo ""

      echo "Applied config files"
    elif [[ $option == "delete" ]]; then
      echo "${red}Shuting down Elatic cloud"
      statusMsg="Setting up Elasticsearch${reset}"

      command=$"$option -f $(pwd)/apply-later/";

      kube "$command"
      wait

      command=$"$option -f $(pwd)/apply-first/";

      kube "$command"
      wait

      echo ""

      echo "Deleted config files"
    else
      echo "Invalid input";
      echo "";
      continue;
    fi

    break;
  done
}

alias esSetup="esSetup";