## [Click here to come to the Schoolable wiki](https://github.com/Hardekerlis/schoolable/wiki/)

Use npm ci instead of npm install when downloading dependencies
npm install has unexpected behavior regarding package-lock.json files
and npm ci prevents merge errors
source: https://stackoverflow.com/questions/48524417/should-the-package-lock-json-file-be-added-to-gitignore


Look into usage of Helm in cluster. Should we use it?

Intersting. Fixed timeout issues with skaffold dev
https://stackoverflow.com/questions/61365202/nginx-ingress-service-ingress-nginx-controller-admission-not-found

kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission



gcloud container clusters get-credentials $CLUSTER_NAME



reset commit:
https://stackoverflow.com/questions/3197413/how-do-i-delete-unpushed-git-commits

Delete the most recent commit, keeping the work you've done:
```cmd
git reset --soft HEAD~1
```
Delete the most recent commit, destroying the work you've done:
```cmd
git reset --hard HEAD~1
```

**K8s Dashboard:**
Run kubectl proxy to get localhost:8001 running. Then run:
```cmd
kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')
```
to get the token.

* url: http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/login
* docs: https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/
* sample-user: https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md

**Kibana Dasboard:**
Run:
```cmd
kubectl get secret quickstart-es-elastic-user -o=jsonpath='{.data.elastic}' | base64 --decode; echo
```
to get password</br>

**Filebeat**
```cmd
PASSWORD=$(kubectl get secret quickstart-es-elastic-user -o go-template='{{.data.elastic | base64decode}}')
```
