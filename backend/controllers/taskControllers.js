import Task from '../models/taskModel.js';
import User from '../models/userModel.js';



export const createTask = async (req, res) => {
    try {
        let { category, priority, title, dueDate, checklistArr } = req.body;

        if (!category || !priority || title.trim().length === 0 || checklistArr.length === 0) {
            return res.status(400).json({ message: 'all fields are required' });
        }

        if (dueDate) {
            dueDate = new Date(dueDate);

            dueDate.setHours(23);
            dueDate.setMinutes(59);
            dueDate.setSeconds(59);
            dueDate.setMilliseconds(999);
        }


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
        let { category, title, priority, dueDate, checklistArr } = req.body;

        if (!category || !priority || title.trim().length === 0 || checklistArr.length === 0) {
            return res.status(400).json({ message: 'all fields are required' });
        }

        if (dueDate) {
            dueDate = new Date(dueDate);

            dueDate.setHours(23);
            dueDate.setMinutes(59);
            dueDate.setSeconds(59);
            dueDate.setMilliseconds(999);
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
    try {
        const { userId } = req.user;

        const user = await User.findById(userId).populate('cardsArr');
        const cardsArr = user.cardsArr;

        const { filterValue } = req.body;

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const weekStart = new Date(currentDate);

        // if current week starts from the previous month
        if ((currentDate.getDate() - currentDate.getDay()) < 0) {

            if (currentMonth === 0) {
                // month is january therefore the  previous year will also decrease by one
                weekStart.setFullYear(currentYear - 1);
            }

            weekStart.setMonth((currentMonth - 1 + 12) % 12);
        }

        // setting the date to starting date of that week
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());

        const monthStart = new Date(currentYear, currentMonth, 1);
        const today = new Date(currentYear, currentMonth, currentDate.getDate());

        const filteredArr = [];
        const len = cardsArr.length;


        if (filterValue === 'This Week') {

            for (let i = 0; i < len; i++) {
                if (cardsArr[i].createdAt.getTime() >= weekStart.getTime()) {
                    filteredArr.push(cardsArr[i]);
                }
            }
        }
        else if (filterValue === 'This Month') {

            for (let i = 0; i < len; i++) {
                if (cardsArr[i].createdAt.getTime() >= monthStart.getTime()) {
                    filteredArr.push(cardsArr[i]);
                }
            }
        }
        else {
            for (let i = 0; i < len; i++) {
                if (cardsArr[i].createdAt.getTime() >= today.getTime()) {
                    filteredArr.push(cardsArr[i]);
                }
            }
        }

        return res.status(200).json({ cardsArr: filteredArr });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export const countTasks = async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await User.findById(userId).populate('cardsArr');

        const obj = {
            BACKLOG: 0,
            'TO-DO': 0,
            PROGRESS: 0,
            DONE: 0,
            LOW: 0,
            MODERATE: 0,
            HIGH: 0,
            due: 0
        }

        const cardsArr = user.cardsArr;
        const len = cardsArr.length;

        for (let i = 0; i < len; i++) {
            obj[cardsArr[i].category]++;
            obj[cardsArr[i].priority]++;

            const dueDate = new Date(cardsArr[i].dueDate).getTime();
            const currentDate = new Date().getTime();


            if (cardsArr[i].category !== 'DONE' && cardsArr[i].dueDate && (dueDate < currentDate)) {
                // it means the due time has passed of this task so it will count in due task because this task has not been completed in time

                obj.due++;
            }
        }

        return res.status(200).json({ obj });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

