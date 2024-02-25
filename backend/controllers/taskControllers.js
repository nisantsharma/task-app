import Task from '../models/taskModel.js';
import User from '../models/userModel.js';



export const createTask = async (req, res) => {
    try {
        let { priority, title, dueDate, checklistArr } = req.body;

        if (!priority || title.trim().length === 0 || checklistArr.length === 0) {
            return res.status(400).json({ message: 'all fields are required' });
        }

        const category = 'TO-DO';

        const obj = {
            category, priority, title, dueDate, checklistArr
        }

        const newTask = await Task.create(obj);

        const { userId } = req.user;
        const user = await User.findById(userId);
        const { cardsArr } = user;
        cardsArr.push(newTask._id);

        await User.findByIdAndUpdate(userId, { cardsArr });

        return res.status(200).json({ message: 'Task saved successfully' });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { category, title, priority, dueDate, checklistArr } = req.body;

        if (!category || !priority || title.trim().length === 0 || checklistArr.length === 0) {
            return res.status(400).json({ message: 'all fields are required' });
        }


        const obj = {
            category, priority, title, dueDate, checklistArr
        }

        const { taskId } = req.params;
        const task = await Task.findOne({ _id: taskId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.findByIdAndUpdate(taskId, obj, { new: true });

        return res.status(200).json({ message: 'Task updated succesfully' });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.findByIdAndDelete(taskId);

        const { userId } = req.user;
        const user = await User.findById(userId);

        const { cardsArr } = user;
        const newCardsArr = cardsArr.filter((item) => item !== taskId);

        await User.findByIdAndUpdate(userId, { cardsArr: newCardsArr });

        return res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const getTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json({ task });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await User.findById(userId).populate('cardsArr');

        const cardsArr = user.cardsArr;

        return res.status(200).json({ cardsArr });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const filterTasks = async (req, res) => {

}

export const countTasks = async (req, res) => {

}

