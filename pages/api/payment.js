import Razorpay from "razorpay"

export default  function handler(req, res) {
if(req.method == "POST"){
const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_ngx1siyaSSVYJ9', key_secret: 'SFMpppWlBL6M6swEpeoJXjHz' })

var options = {
  amount: req.body.amount * 100,  
  currency: "INR",
  receipt: "order_rcptid_11"
};
instance.orders.create(options, function(err, order) {
  if(order){
  console.log(order);
  res.status(200).json({ id: order.id, message: "success", order: order })
  } else {
    console.log(err)
    res.status(200).json({ messsage: "error", error: err})
  }
})

  } else {
  res.status(200).json({ message: "success" })
  }
}
