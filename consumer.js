const { Kafka } = require('kafkajs')

const kafka = new Kafka({ clientId: "kafkabroker1", brokers: ["localhost:9092"] })

const consumer = kafka.consumer({ groupId: "daniel" })

const testKafka = async () => {
  await consumer.connect()

  await consumer.subscribe({ topic: "test" })

  await consumer.run({
    eachMessage: ({ topic, partition, message }) => {
      const value = JSON.parse(message.value)
      const sumHigh = value.map(item => +item["USDBRL"].high).reduce((prev, curr) => prev + curr, 0)
      const sumLow = value.map(item => +item["USDBRL"].low).reduce((prev, curr) => prev + curr, 0)

      const medHigh = sumHigh / value.length
      const medLow = sumLow / value.length

      console.log(`Média valor mais alto: ${medHigh} \n Média valor mais baixo: ${medLow}`)
    }
  })
}

testKafka()