FROM docker.elastic.co/elasticsearch/elasticsearch:7.9.3@sha256:9116cf5563a6360ed204cd59eb89049d7e2ac9171645dccdb1421b55dbae888b

ENV ES_VERSION 7.9.3

EXPOSE 9200 9300

ENV PATH /elasticsearch/bin:$PATH

WORKDIR /elasticsearch

ADD config /elasticsearch/config

COPY start.sh /

RUN ["chmod", "+x", "/start.sh"]

ENV ES_JAVA_OPTS "-Xms512m -Xmx512m"
ENV CLUSTER_NAME elasticsearch-default
ENV NODE_MASTER true
ENV NODE_DATA true
ENV NODE_INGEST true
ENV HTTP_ENABLE true
ENV NETWORK_HOST _site_
ENV HTTP_CORS_ENABLE true
ENV HTTP_CORS_ALLOW_ORIGIN *
ENV NUMBER_OF_MASTERS 1
ENV MAX_LOCAL_STORAGE_NODES 1
ENV SHARD_ALLOCATION_AWARENESS ""
ENV SHARD_ALLOCATION_AWARENESS_ATTR ""
ENV MEMORY_LOCK true
ENV REPO_LOCATIONS ""

ENV DISCOVERY_SERVICE elasticsearch-discovery


# Kubernetes requires swap is turned off, so memory lock is redundant
ENV MEMORY_LOCK false

VOLUME ["/data"]

CMD ["/start.sh"]
