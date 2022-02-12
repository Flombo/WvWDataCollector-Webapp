# WvWDataCollector-Webapp

  Node.js webapp, which provides APIs to consume aggregated and transformed WvW-data from the MongoDB of the WvW DataCollector-Pipeline.
  This application delivers a simple frontend, that visualizes the retrieved data into various charts for analyzation purposes.
  This app runs only in combination with the https://github.com/Flombo/WvW_DataCollector_ApacheBeamPipeline, a configured Kafka, a MongoDB-DBMS and         https://github.com/Flombo/WvW_DataCollector
  For the charts, chart.js was used: https://www.chartjs.org/
  
# Instructions

  1. Install dependencies
    ```
    Go to the WvWDataCollector-Webapp root folder
    Run npm install
    ```
  2. Run the app
    ```
    node index.js
    ```
    
  Alternatively you could use a process manager like pm2 for managing the backend.
  
  > 2018 Shirin Mian & Florian Pfützenreuter
