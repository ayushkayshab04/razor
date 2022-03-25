const express = require("express")
const path = require("path")
const shortid =  require("shortid")
const Razorpay = require("razorpay")
const cors = require("cors")
const crypto = require("crypto")

const app = express()
app.use(express.json())
app.use(cors())

const razorpay = new Razorpay({
key_id :"rzp_test_TCaTuTuUPSc2TV",
key_secret:"RmSSZfB2H3tpPUS9Lr8F9MnO"
})



app.get("/logo.svg",(req,res)=>{
    res.sendFile(path.join(__dirname,"logo.svg"))
})


app.post("/verification",(req,res)=>{
    const SECRET = "12345678"
    
    console.log(req.body)



    const shasum = crypto.createHmac("sha256",SECRET)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest("hex")

    console.log(digest, req.headers["x-razorpay-signature"])
    if(digest === req.headers["x-razorpay-signature"])
    console.log("Request is legit")


    res.json({status:"ok"})
})

app.post("/failed",(req,res)=>{
const SECRET = "037257"
console.log(req.body)
res.json({status:"Payment Failed"})
})



app.post("/razorpay" ,async(req,res)=>{
    const  payment_capture = 1
    const amount = 499
    const currency = "INR"
    
    const options = {
        amount: amount*100,
        currency,
        receipt:shortid.generate(),
        payment_capture
    }
   const response = await razorpay.orders.create(options)
   console.log(response)
   res.json({
       id:response.id,
       currency:response.currency,
       amount:response.amount
   })
})



app.listen(5000 , ()=>{
    console.log("server started on port 5000")
})
