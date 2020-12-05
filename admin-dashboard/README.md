<!-- @format -->

kubectl expose deployment admin-dashboard-depl --type=LoadBalancer --port=8000 --targetPort=3000

kubectl delete service admin-dashboard-depl

kubectl describe svc admin-dashboard-depl | grep PORT

echo $(kubectl get services admin-dashboard-depl --output jsonpath='{.status.loadBalancer.ingress[0].ip}{.items[*].spec.}')
