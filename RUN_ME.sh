
#!/bin/bash

dirArr=($(echo $(pwd) | tr "/" "\n"));
dirArrLen=$((${#dirArr[@]}-1))

for i in `seq 0 $dirArrLen`; do

  # echo "$dirArrLen - ${dirArr[$i]}:$i"

  if [[ "${dirArr[$i]}" == "schoolable" ]] && [[ "$i" == "$dirArrLen" ]]; then
    echo "last is schoolable"

    echo "$(pwd)/infra/logging-cloud/.bash_es_setup"

    source "$(pwd)/infra/logging-cloud/.bash_es_setup";

    echo "Setup an alias for elastic cloud to run the setup bash";
    echo "run 'esSetup to run elastic cloud'";

    break;
  elif [[ "${dirArr[$i]}" == "schoolable" ]] && [[ "$i" != "$dirArrLen" ]] ; then
    echo "Please go to the root schoolable folder";
    break;
  fi
done
exit;
