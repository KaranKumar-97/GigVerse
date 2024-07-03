import Order from '../models/order.model.js'
import Gig from '../models/gig.model.js'

export const createOrder = async (req, res,next) => {
    try {
        const gig=await Gig.findById(req.params.gigId);
        if(!gig){
            return res.status(404).json({error:"Gig not found"})
        }
        if(gig.userId===req.userId){
            return res.status(400).json({error:"You can't buy your own gig"})
        }
        if(req.isSeller){
            return res.status(400).json({error:"Sellers cannot buy a gigs"})
        }
        const order=new Order({
            gigId:gig._id,
            img:gig.cover,
            title:gig.title,
            price:gig.price,
            sellerId:gig.userId,
            buyerId:req.userId,
            payment_intent:"temporary string"
        })

        await order.save();
        res.status(200).json(order)

        
    } catch (error) {
        next(error)
        
    }

}

export const getOrders = async (req, res,next) => {
    try {
        const orders=await Order.find({
            ...(req.isSeller ? {sellerId:req.userId} : {buyerId:req.userId}),isCompleted:true
        }).sort({createdAt:-1})
        // console.log(orders)
        res.status(200).json(orders)
        
    } catch (error) {
        next(error)
        
    }
}