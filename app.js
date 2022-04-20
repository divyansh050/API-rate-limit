const express = require('express');

const app = express();

// api limit LOGIC

const ipAddress = {}
app.use("/api_limit", (req,res)=> {
    
    if(ipAddress[req.ip] === undefined) {
        ipAddress[req.ip] = {
            count: 0,
            time: Date.now()
        }

        return res.status(200).json({"message":"Welcome to the api"})
    }else{
        if(Date.now() - ipAddress[req.ip].time > 60*1000) {
         
            ipAddress[req.ip] = {
              count: 0,
              time: Date.now(),
            };

            return res.status(200).json({ message: "Welcome to the api" });
        }else{
            if(ipAddress[req.ip].count >= 9){
                const time = 60 - ((Date.now() - ipAddress[req.ip].time)/1000);
                const message = `You have reached the limit of 10 requests per minute. Please try again in ${time} seconds`

                return res.status(200).json({ message});
               
            }else{
                ipAddress[req.ip].count++;
                const { count } = ipAddress[req.ip];
                const message = `You have ${10 - count} requests left`;
               
                return res.status(200).json({message})
            }
        }
    }
})

app.listen(80, () => {
    console.log('Server is running on port 80');
});