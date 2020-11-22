
#!/bin/bash

red=`tput setaf 1`
green=`tput setaf 2`
yellow=`tput setaf 3`
blue=`tput setaf 4`
magenta=`tput setaf 5`
cyan=`tput setaf 6`
white=`tput setaf 7`

reset=`tput sgr0`

function kube {
  echo "";
  echo "${cyan}Running: ${blue}kubectl $1 ${green}"
  kubectl $1;
  echo "${cyan}Finished${reset}";
  return;
}

while [[ true ]]; do

  echo "Would you like to delete or apply the config files? Enter 'apply' or 'delete'"
  read  -p "Enter option: " option;

  if [[ $option == "apply" ]]; then
    #
    echo "${green}Starting up Elastic cloud";
    statusMsg="Setting up configuration${reset}"

    command=$"$option -f $(pwd)/apply-first/";

    kube "$command"
    wait

    # filebeatConf=$(<"./templates/filebeat.yml");
    # wait

    # PASSWORD=$(kubectl get secret quickstart-es-elastic-user -o go-template='{{.data.elastic | base64decode}}')
    # wait
    #
    # echo "eee"

    # /\${([^}]+)}/
    # newFilebeatConf=$($filebeatConf | sed -e "/\${([^}]+)}/"$PASSWORD);
    # newFilebeatConf="$filebeatConf${"/\${([^}]+)}/"$PASSWORD}"
    # echo $(sed -i 's/\${([^}]+)}/PASSWORD/g' ./templates/filebeat.yml);

    # echo "e123"

    # wait

    # echo "$newFilebeatConf";
    # exit;

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
