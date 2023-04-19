import React, { useState, useEffect } from 'react'
import Layout from './../components/layout/layout';
import { Modal, Form, Input, Select, message, Table, DatePicker } from 'antd'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'
import moment from 'moment'
import './homePage.css'
import Analytiics from './../components/layout/Analytics';
const { RangePicker } = DatePicker;
const HomePage = () => {
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [allTransaction, setAllTransaction] = useState([]);
    const [frequency, setFrequency] = useState('7')
    const [selectedDate, setSelecteddate] = useState([])
    const [type, setType] = useState('all')
    const [viewData, setViewData] = useState('table')
    const [editable, setEditable] = useState(null)
    //table data
    const columns = [
        {
            title: "Date",
            dataIndex: 'date',
            render: (text) => <span>{moment(text).format('DD-MM-yyyy')}</span>
        },
        {
            title: "Amount",
            dataIndex: 'amount'
        },
        {
            title: "Type",
            dataIndex: 'type'
        },
        {
            title: "Category",
            dataIndex: 'category'
        },
        {
            title: "Refrence",
            dataIndex: 'refrence'
        },
        {
            title: "Actions",
            render: (text, record) => (
                <div>
                    <EditOutlined onClick={() => {
                        setEditable(record)

                        setShowModal(true)
                    }
                    } />
                    <DeleteOutlined className='button-sec'
                        onClick={() => { handleDelete(record) }} />
                </div>
            )
        }
    ]
    //get all transactions

    useEffect(() => {
        const getAllTransactions = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'))
                setLoading(true)
                const res = await axios.post('/transactions/get-transaction', {
                    userid: user._id,
                    frequency,
                    selectedDate,
                    type,
                });
                setLoading(false)
                setAllTransaction(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
                message.error("Fetch Issue Transaction")
            }
        }

        getAllTransactions();
    }, [frequency, selectedDate, type]);
    //delete handler

    const handleDelete = async (record) => {
        try {
            setLoading(true)
            await axios.post('/transactions/delete-transaction', { transactionId: record._id })
            setLoading(false)
            message.success('Transaction Deleted')
        } catch (error) {
            setLoading(false)
            console.log(error)
            message.error('unable to delete')
        }
    }

    //form handling
    const handleSubmit = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            setLoading(true);
            if (editable) {
                await axios.post('/transactions/edit-transaction',
                    {
                        payload: {
                            ...values,
                            userId: user._id
                        },
                        transactionId: editable._id
                    })
                setLoading(false)
                message.success('Transaction Updated Successfully')
            }
            else {
                await axios.post('/transactions/add-transaction', { ...values, userid: user._id })
                setLoading(false)
                message.success('Transaction Added Successfully')

            }
            setShowModal(false)
            setEditable(null)
        } catch (error) {
            message.error("Failed to Add Transaction")
        }
    }
    return (
        <>
        <Layout>
            {loading}
            <div className='navbar card-body '>
                
                    <div className='row mb-3 mt-1'>
                        <h5 className="nav-item brand mx-4 m-3">Select Frequncy</h5>
                        <div className="mx-4"><Select className="select " value={frequency} onChange={(values) => setFrequency(values)}>
                            <Select.Option value='7'>LAST 1 Week</Select.Option>
                            <Select.Option value='30'>LAST 1 Month</Select.Option>
                            <Select.Option value='365'>LAST 1 Year</Select.Option>
                            <Select.Option value='custom'>Custom</Select.Option>
                        </Select>
                        {frequency === 'custom' && (<RangePicker value={selectedDate}
                            onChange={(values) => setSelecteddate(values)}
                        />
                        )}
                        </div>
                    </div>
                    <div>
                        <h5 className="nav-item expand mx-4 m-3">Select type</h5>
                        <Select className="mx-4" value={type} onChange={(values) => setType(values)}>
                            <Select.Option value='all'>All</Select.Option>
                            <Select.Option value='income'>INCOME</Select.Option>
                            <Select.Option value='expense'>EXENSE</Select.Option>
                        </Select>
                        {frequency === 'custom' && (<RangePicker value={selectedDate}
                            onChange={(values) => setSelecteddate(values)}
                        />
                        )}

                    </div>
                    <div className="switch-icon ">
                        <UnorderedListOutlined className={`${viewData === "table" ? "active-icon" : "inactive-icon"}`}
                            onClick={() => setViewData('table')} />
                        <AreaChartOutlined className={`${viewData === "analytics" ? "active-icon" : "inactive-icon"}`}
                            onClick={() => setViewData('analytics')} />
                    </div>
                    <div className='btn'>

                        <button className='btn btn-primary'
                            onClick={() => setShowModal(true)}>
                            Add New
                        </button>
                    </div>

                
            </div>
            <div className='table-container card-body mb-5'>
                {viewData === 'table' ?
                    <Table columns={columns} dataSource={allTransaction} />
                    : <Analytiics allTransaction={allTransaction} />
                }
            </div>
            <Modal
                title={editable ? 'Edit Transaction' : 'Add Transiction'}
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={false}
            >
                <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
                    <Form.Item label="Amount" name="amount">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Type" name="type">
                        <Select>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Cateory" name="category">
                        <Select>
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="tip">Tip</Select.Option>
                            <Select.Option value="project">Project</Select.Option>
                            <Select.Option value="food">Food</Select.Option>
                            <Select.Option value="movie">Movie</Select.Option>
                            <Select.Option value="bills">Bills</Select.Option>
                            <Select.Option value="medical">Medical</Select.Option>
                            <Select.Option value="fee">Fee</Select.Option>
                            <Select.Option value="tax">Tax</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date" name="date">
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item label="Refrence" name="refrence">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Discription" name="description">
                        <Input type="text" />
                    </Form.Item>
                    <div className='display'>
                        <button type="submit" className='button-sec'>SAVE</button>

                    </div>
                </Form>
            </Modal>
        </Layout>
            </>
    )
}

export default HomePage;