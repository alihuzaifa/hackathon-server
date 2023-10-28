import feedbackModal from '../model/Feedback.js'
const addFeedback = async (req, res) => {
    try {
        const { name, email, message } = req?.body
        if (!email || !name || !message) return res.status(401).json({ message: "All data is required" });
        const uploadFeedbackObj = { name, email, message }
        await feedbackModal.create(uploadFeedbackObj)
        return res.status(200).json({ message: 'Thanks For the Feedback' })
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}
const deleteFeedback = async (req, res) => {
    try {
        const { _id } = req?.body
        await feedbackModal.deleteOne({ _id })
        return res.status(200).json({ message: 'Feedback has been deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}
const getAllFeedbacks = async (req, res) => {
    try {
        const allFeedbacks = await feedbackModal.find({})
        if (allFeedbacks) {
            return res.status(200).json(allFeedbacks)
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}
export {
    addFeedback,
    deleteFeedback,
    getAllFeedbacks
}