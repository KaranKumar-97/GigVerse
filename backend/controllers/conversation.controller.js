import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res, next) => {
  try {
    const conversation = new Conversation({
      id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
      sellerId: req.isSeller ? req.userId : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.userId,
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
    });

    const savedConvo = await conversation.save();
    res.status(201).json(savedConvo);
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req, res, netx) => {
  try {
    const convo = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 });
    res.status(200).json(convo);
  } catch (error) {
    next(error);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConvo = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          // readBySeller:req.isSeller,
          // readByBuyer:!req.isSeller,

          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );

    res.status(200).json(updatedConvo);
  } catch (error) {
    next(error);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const convo = await Conversation.findOne({ id: req.params.id });
    if (!convo) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.status(200).json(convo);
  } catch (error) {
    next(error);
  }
};
