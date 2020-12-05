
#!/bin/bash

if [[ $1 == "a" ]]; then

  kubectl create namespace sandbox;
  wait

  kubectl create namespace cert-manager;
  wait

  kubectl create --validate=false -f ./cert-manager.yml
  wait

  echo "Sleeping 60s"
  sleep 60s;

  kubectl create -f ./cert-issuer.yml
  wait

  echo "sleeping 5s";
  sleep 5s

  kubectl create -f ./cert.yml
  wait

elif [[ $1 == "d" ]]; then

  kubectl delete -f ./cert.yml

  wait

  echo "sleeping 5s";
  sleep 5s

  kubectl delete -f ./cert-issuer.yml
  wait

  echo "Sleeping 5s";
  sleep 5s;

  kubectl delete -f ./cert-manager.yml
  wait

  # kubectl delete namespace sandbox;
  # wait
  #
  # kubectl delete namespace cert-manager;
  # wait

fi


echo "finished";
