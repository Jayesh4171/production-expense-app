import React from 'react'
import { Progress } from 'antd'
import './Analytics.css'

const Analytics = ({allTransaction}) =>{
    // category
    const categories =['salary','tip','project','food','movie','bills','medical','fee','tax']

    const totalTransaction = allTransaction.length
    const totalIncomeTransactions = allTransaction.filter(transaction => transaction.type === 'income')
    const totalExpenseTransactions = allTransaction.filter(transaction => transaction.type === 'expense')
    const totalIncomePercent = (totalIncomeTransactions.length/totalTransaction) * 100
    const totalExpensePercent = (totalExpenseTransactions.length/totalTransaction) * 100

//total tunrover
const totalTurnover = allTransaction.reduce((acc, transaction)=> acc + transaction.amount, 0)
const totalIncomeTurnover = allTransaction.filter(transaction => transaction.type === 'income').reduce((acc,transaction) => acc+ transaction.amount,0)
const totalExpenseTurnover = allTransaction.filter(transaction => transaction.type === 'expense').reduce((acc,transaction) => acc+transaction.amount,0)
const totalInTurnPer = (totalIncomeTurnover/totalTurnover) * 100
const totalExTurnPer = (totalExpenseTurnover/totalTurnover) * 100


    return(
        <>
        <div className="container">
        <div className="parent w-75">
            <div className="div1 card "> 
            <div className='card-body'>
                    <div className='title'>
                        Total Transactions: {totalTransaction}
                    </div>
                    <div className='headline'>
                        <h5>Income : {totalIncomeTransactions.length}</h5>
                        <h5>Expense : {totalExpenseTransactions.length}</h5>
                        <div className='items'>
                            <Progress className='pd'
                            type='circle' 
                            strokeColor={'green'}
                            percent={totalIncomePercent.toFixed(0)}
                            />
                            <Progress 
                            type='circle' className='pd'
                            strokeColor={'red'}
                            percent={totalExpensePercent.toFixed(0)}
                            />

                        </div>
                    </div>
                </div>
            </div>
            <div className="div2 card"> 
            <div className='card-body'>
                    <div className='title'>
                        Total Turnover: {totalTurnover}
                    </div>
                    <div className='headline'>
                        <h5>Income : {totalIncomeTurnover}</h5>
                        <h5>Expense : {totalExpenseTurnover}</h5>
                        <div className='items'>
                            <Progress className='pd'
                            type='circle' 
                            strokeColor={'green'}
                            percent={totalInTurnPer.toFixed(0)}
                            />
                            <Progress className='pd'
                            type='circle' 
                            strokeColor={'red'}
                            percent={totalExTurnPer.toFixed(0)}
                            />

                        </div>
                    </div>
                </div>
            </div>
            <div className="div3 card"> 
            <div className='card-body'>
                <h4>Categorywise Income</h4>
                {
                    categories.map(category => {
                        const amount = allTransaction
                        .filter((transaction) => transaction.type === 'income' && transaction.category === category)
                        .reduce((acc,transaction) => acc + transaction.amount,0);
                        return(
                            amount > 0 && 
                            <div className=''>
                                <div className=''>
                                    <h5>{category}</h5>
                                    <Progress percent = {((amount/totalIncomeTurnover) * 100).toFixed(0)}/>
                                </div>
                            </div>
                        
                        )
                    })
                }
            </div>
            </div>
            <div className="div4 card"> 
            <div className='card-body'>
                <h4>Categorywise Expense</h4>
                {
                    categories.map(category => {
                        const amount = allTransaction
                        .filter((transaction) => transaction.type === 'expense' && transaction.category === category)
                        .reduce((acc,transaction) => acc + transaction.amount,0);
                        return(
                            amount > 0 && 
                            <div className=''>
                                <div className=''>
                                    <h5>{category}</h5>
                                    <Progress percent = {((amount/totalExpenseTurnover) * 100).toFixed(0)}/>
                                </div>
                            </div>
                        
                        )
                    })
                }
            </div>
            </div>
        </div>
        
        </div>
    </>
    )
}
export default Analytics