import Razorpay from "razorpay"

export default  function handler(req, res) {
//  if(req.method == "PO"){
const rzp = new Razorpay({ key_id: 'rzp_test_RupIFQwNDkYWvg', key_secret: 'YAQXeDKRGVBZPopB5YtrJbxg1' })
rzp.orders.create({
 amount: 1 * 100, // rzp format with paise
 currency: 'INR',
 receipt: "receipt#1", //Receipt no that corresponds to this Order,
 payment_capture: true,
 notes: {
  orderType: "Pre",
 } //Key-value pair used to store additional information
}).then(result => console.log(result))
  .catch(err => console.log("err: ", err))
 // } else {
  res.status(200).json({ message: "success" })
  //}
}
