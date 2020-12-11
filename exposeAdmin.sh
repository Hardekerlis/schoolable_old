
#!/bin/bash

black=`tput setaf 0`
red=`tput setaf 1`
green=`tput setaf 2`
yellow=`tput setaf 3`
blue=`tput setaf 4`
magenta=`tput setaf 5`
cyan=`tput setaf 6`
white=`tput setaf 7`

blackBg=`tput setab 0`
whiteBg=`tput setab 7`

bold=`tput bold`

reset=`tput sgr0`

deplName='admin-ingress-srv';
basePath="$(pwd)/infra/expose-admin";

clear

function expose {
  if [[ "$1" == "true" ]]; then # Exposing external IP admin-dashboard-client-srv
    # echo "${white}Exposing $deplName "
    echo "${magenta}$(kubectl apply -f "$basePath/admin-ingress-srv.yml")";
    echo "${white}Configured $deplName ${reset}"

    echo ""
    echo "${bold}${white}Exposed the Admin dashboard${reset}";
    echo "Navigate to ${bold}${blackBg}${white}https://admin.schoolable.se${reset} in your browser and you should see the dashboard.";
    echo "If you can't access the dashboard run ${bold}${white}sh ./exposeAdmin.sh${reset} again"
    echo ""

  elif [[ "$1" == "false" ]]; then # Killing external IP for admin-dashboard-client-srv service
    # echo "${white}Deleting $deplName${magenta}"

    echo "${magenta}$(kubectl delete -f "$basePath/admin-ingress-srv.yml")";
    echo "${white}Deleted $deplName${reset}"

    echo "";
    echo "${bold}${white}Closed access to the Admin dashboard${reset}";
    echo "If you navigate to: ${bold}${blackBg}${white}https://admin.schoolable.se${reset} in your browser you should be redirected to ${bold}https://schoolable.se${reset}";
    echo "";

  else
    echo "Please supply true to expose $deplName and false to do the opposite";
  fi
}

allServices=$(kubectl get services);
authService="auth-srv";
hasBeenSetup=$(echo $allServices | grep -w $authService);

# This checks if the other services has been applied
isExposed=$(kubectl get ingress admin-ingress-srv -o jsonpath='{.spec.rules[0].host}' --ignore-not-found 2>&1 | grep -i -v "Warn" | grep -i -v "Deprecat");

#       Length is 0        Lenght is greater than 0
if [[ -z $hasBeenSetup ]] && [[ -z $isExposed ]]; then

  echo "${red}${bold}${blackBg}Cluster is not running${reset}";
  echo "Please run ${bold}${blackBg}${white}sh ./startCluster.sh${reset} before running this again"
  exit;

fi


if [[ -z $isExposed ]]; then # If admin-dashboard-client-srv is not exposed it gets exposed

  echo ""
  echo "${white}${bold}Exposing Admin dashboard${reset} ${blue}($deplName)${reset}";
  expose true;

else # If admin-dashboard-client-srv is exposed it gets removed

  echo ""
  echo "${white}${bold}Closing access to Admin dashboard${reset} ${blue}($deplName)${reset}";
  expose false;

fi

# -------------------------------------------------------------------------------
# Dont know if I need this in the future

# function expose {
#   if [[ "$1" == "true" ]]; then # Exposing external IP admin-dashboard-client-srv
#     echo "${magenta}Exposing $deplName ${reset}"
#     kubectl apply -f "$basePath/toApply/admin-dashboard-client-expose-srv.yml";
#     echo "${magenta}Exposed $deplName ${reset}"
#
#     attempts=1;
#     while [[ true ]]; do
#       externalIP="$(kubectl get svc admin-dashboard-client-srv -o jsonpath='{.spec.externalIPs[0]}')";
#
#
#       if [[ -z $externalIP ]]; then
#         echo "${green}Attempting to fetch IP (give it a second). ${white}${blackBg}Attempt: $attempts${reset}"
#         echo "Sleeping 5s to allow the external IP to become available";
#         sleep 5s;
#         attempts=$((attempts+1));
#       else
#         echo "${green}successfullt exposed Admin Dashboard!${reset}"
#         echo "Navigate to: ${bold}${blackBg}${white}https://$externalIP:443${reset} in your browser";
#         echo "${whiteBg}${red}Important!${black} When you don't need admin dashboard anymore run this command again ${bold}${blackBg}${white}(sh ./exposeAdmin.sh)${reset}"
#         break;
#       fi
#     done;
#
#
#   elif [[ "$1" == "false" ]]; then # Killing external IP for admin-dashboard-client-srv service
#     echo "${magenta}Deleting $deplName${reset}"
#     kubectl delete -f "$basePath/toApply/admin-dashboard-client-expose-srv.yml";
#     echo "${magenta}Deleted $deplName${reset}"
#   else
#     echo "Please supply true to expose $deplName and false to do the opposite";
#   fi
# }



# function setExternalIP {
#   ipAddresses=();
#   seqLength="2";
#   itr="0";
#
#   while [[ "$seqLength" -gt "${#ipAddresses[@]}" ]]; do
#     while
#       set $(dd if=/dev/urandom bs=4 count=1 2>/dev/null | od -An -tu1)
#       [ $1 -lt 224 ] &&
#       [ $1 -ne 10 ] &&
#       { [ $1 -ne 192 ] || [ $2 -ne 168 ]; } &&
#       { [ $1 -ne 172 ] || [ $2 -lt 16 ] || [ $2 -gt 31 ]; }
#     do :; done
#     ipAddress=$1.$2.$3.$4
#
#     if [[ $1 == "10" ]] || [[ $1 == "172" ]] || [[ $1 == "192" ]] || [[ $1 == "100" ]] || [[ $1 == "127" ]] || [[ $1 == "169" ]]; then
#       isLocal="${red}Local${reset}"
#       seqLength=$((seqLength+1));
#     else
#       isLocal="";
#       ipAddresses[$itr]+=$ipAddress
#       itr=$(($itr+1))
#     fi
#
#   done;
#
#   # Should write a check to see if ip address is already taken
#
#   exposeTemp="$basePath/templates/expose-template.yml";
#   wait
#
#   cp $exposeTemp "$basePath/templates/admin-dashboard-client-expose-srv.yml";
#   wait
#
#   replace='${EXTERNAL_IP}';
#   sed -i "s/$replace/${ipAddresses[1]}/" "$basePath/templates/admin-dashboard-client-expose-srv.yml"
#
#   mv -f "$basePath/templates/admin-dashboard-client-expose-srv.yml" "$basePath/toApply/"
#   wait
#
#   return
# }
