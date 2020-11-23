
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

    command=$"$option -f $(pwd)/apply-later/";

    kube "$command"
    wait

    fails=1;
    while [[ true ]]; do

      echo ""
      echo "Waiting 10 seconds to let elastic make the secret available"
      sleep 10s;

      password=$(kubectl get secret quickstart-es-elastic-user -o go-template='{{.data.elastic | base64decode}}');
      wait
      if [[ $password != "" ]]; then
        break;
      fi
      echo "${cyan}Attempts: $fails";
      echo "${red}Password wasn't available${reset}"
      fails=$((fails+1));
    done

    filebeatTemp="$(pwd)/templates/filebeat-temp.yml";

    cp $filebeatTemp "$(pwd)/templates/filebeat.yml";
    wait

    replace='${esPassword}'
    sed -i "s/$replace/$password/" "./templates/filebeat.yml"

    mkdir "$(pwd)/apply-last/";
    mv -f "$(pwd)/templates/filebeat.yml" "$(pwd)/apply-last/";
    wait

    command=$"$option -f $(pwd)/apply-last/";

    kube "$command"
    wait

    echo ""

    echo "${red}Kibana password:${reset} $password";
    echo "Applied config files"
  elif [[ $option == "delete" ]]; then
    echo "${red}Shuting down Elatic cloud"
    statusMsg="Setting up Elasticsearch${reset}"

    command=$"$option -f $(pwd)/apply-later/";

    kube "$command"
    wait

    command=$"$option -f $(pwd)/apply-last/";

    kube "$command"
    wait

    command=$"$option -f $(pwd)/apply-first/";

    kube "$command"
    wait

    rm -Rf "$(pwd)/apply-last/"

    echo ""

    echo "Deleted config files"
  else
    echo "Invalid input";
    echo "";
    continue;
  fi

  break;
done
