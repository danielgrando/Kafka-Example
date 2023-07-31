
npm install kafkajs axios node-cron

docker-compose -f .\docker-compose.yml up -d
docker exec -it Kafka_container_9092 kafka-topics --create --topic test --bootstrap-server localhost:9092

node .\producer.js
node .\consumer.js
