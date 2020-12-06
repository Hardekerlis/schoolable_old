
#!/bin/bash

dirArr=($(echo $(pwd) | tr "/" "\n"));
dirArrLen=$((${#dirArr[@]}-1));

esPath="";

for i in `seq 0 $dirArrLen`; do

  # echo "$dirArrLen - ${dirArr[$i]}:$i"

  if [[ "${dirArr[$i]}" == "schoolable" ]] && [[ "$i" == "$dirArrLen" ]]; then
    esPath="$(pwd)/infra/logging-cloud/setup-es.sh";

    groundPath=$(pwd);

    cd $groundPath/infra/logging-cloud/

    alias esSetup=$esPath;

    source $esPath

    break;
  elif [[ "${dirArr[$i]}" == "schoolable" ]] && [[ "$i" != "$dirArrLen" ]] ; then
    echo "Please go to the root schoolable folder";
    break;
  fi
done
exit;
