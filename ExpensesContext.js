import React,{useReducer} from 'react';
const DUMMY_EXPENSES = [
    {
        id:'e1',
        description:'item A - list',
        amount: 1000,
        date:new Date('2022-08-22')
    },
    {
        id:'e2',
        description:'item B - list',
        amount: 500,
        date:new Date('2022-08-21')
    },
    {
        id:'e3',
        description:'item C - list',
        amount: 2000,
        date:new Date('2022-08-24')
    },
    {
        id:'e4',
        description:'item D - list',
        amount: 1500,
        date:new Date('2021-10-25')
    },
    {
        id:'e5',
        description:'item E - list',
        amount: 8000,
        date:new Date('2021-10-26')
    },
    {
        id:'e6',
        description:'item A - list',
        amount: 1000,
        date:new Date('2021-10-22')
    },
    {
        id:'e7',
        description:'item B - list',
        amount: 500,
        date:new Date('2021-10-23')
    },
    {
        id:'e8',
        description:'item C - list',
        amount: 2000,
        date:new Date('2021-10-24')
    },
    {
        id:'e9',
        description:'item D - list',
        amount: 1500,
        date:new Date('2021-10-25')
    },
    {
        id:'e10',
        description:'item E - list',
        amount: 8000,
        date:new Date('2021-10-26')
    },

]

const ExpenseContext = React.createContext()

const ExpensesReducer = (state,action)=> {
    
    switch(action.type){
        case 'ADD':
            const id = new Date().toString() + Math.random().toString()
            return [{...action.payload, id}, ...state]
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense)=> expense.id === action.payload.id)
            const updatableExpense = state[updatableExpenseIndex]
            const updatedItem = {...updatableExpense, ...action.payload.expenseData }
            const updatedExpenses = [...state]
            updatedExpenses[updatableExpenseIndex] = updatedItem
            return updatedExpenses
        case 'DELETE':
           return state.filter((expense)=> expense.id !== action.payload)
        default:
            return state
    }
}

const ExpenseProvider = ({children}) => {
    const [expensesState, dispatch] = useReducer(ExpensesReducer, DUMMY_EXPENSES )

    function addExpense(expenseData){
        dispatch({type:'ADD', payload:expenseData})
    }
    function deleteExpense(id){
        dispatch({type:'DELETE', payload:id})
    }
    function updateExpense(id,expenseData){
        dispatch({type:'UPDATE', payload:{id,expenseData}})
    }

    const value = {
        expenses:expensesState,
        addExpense,
        deleteExpense,
        updateExpense
    }

    // console.log(value)
    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    )
}

// export {ExpenseContext, ExpenseProvider}