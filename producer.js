const { Kafka } = require('kafkajs')
const axios = require('axios')
const cron = require('node-cron')

const kafka = new Kafka({ clientId: "kafkabroker1", brokers: ["localhost:9092"] })

const producer = kafka.producer()

const api = axios.create({

})

let data = []
const fetchMoney = async () => {
  const response = await api.get('https://economia.awesomeapi.com.br/last/USD-BRL')
  return response.data
}

cron.schedule("*/30 * * * * *", async () => {
  const responseData = await fetchMoney()

  console.log(responseData)
  data.push(responseData)
})

cron.schedule("* */1 * * *", () => {
  if (data.length !== 0) {
    testKafka(data)

    console.log("foi pro consumer")
    data = []
  }
})

const testKafka = async (data) => {
  await producer.connect()

  await producer.send({ topic: "test", messages: [{ key: String(Math.random(200)), value: JSON.stringify(data) }] })
}
