const app = require("express")()
const path = require("path")
const shortid =  require("shortid")
const Razorpay = require("razorpay")
const cors = require("cors")

app.use(cors())

const razorpay = new Razorpay({
key_id :"rzp_test_TCaTuTuUPSc2TV",
key_secret:"RmSSZfB2H3tpPUS9Lr8F9MnO"
})


app.get("/logo.svg",(req,res)=>{
    res.sendFile(path.join(__dirname,"logo.svg"))
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
