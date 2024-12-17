import '../App.css';
import TransactionList from "../components/TransactionList"
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Divider, Layout } from 'antd';
import AddItem from '../components/AddItem';
import { Spin, Typography } from 'antd';
import axios from 'axios'
import { Footer } from 'antd/es/layout/layout';

const URL_TXACTIONS = '/api/txactions'
const { Header } = Layout;

function FinanceScreen() {
  const [summaryAmount, setSummaryAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [transactionData, setTransactionData] = useState([])

  const fetchItems = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(URL_TXACTIONS)
      setTransactionData(response.data.data.map(row => ({
        id: row.id,
        key: row.id,
        ...row.attributes
      })))
    } catch (err) {
      console.log(err)
    } finally { setIsLoading(false) }
  }

  const handleAddItem = async (item) => {
    try {
      setIsLoading(true)
      const params = { ...item, action_datetime: dayjs() }
      const response = await axios.post(URL_TXACTIONS, { data: params })
      const { id, attributes } = response.data.data;
      setTransactionData([
        ...transactionData,
        { id: id, key: id, ...attributes }
      ])
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditItem = async (item) => {
    try {
      setIsLoading(true);
      const response = await axios.put(URL_TXACTIONS, "/", item.id, { data: item });
      fetchItems();
      const { id, attributes } = response.data.data;
      setTransactionData([
        ...transactionData,
        { id: id, key: id, ...attributes }
      ]);
      setIsLoading(true)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  const handleNoteChanged = (id, note) => {
    setTransactionData(
      transactionData.map(transaction => {
        transaction.note = transaction.id === id ? note : transaction.note;
        return transaction
      })
    )
  }

  const handleRowDeleted = async (id) => {
    try {
      setIsLoading(true)
      await axios.delete(`${URL_TXACTIONS}/${id}`)
      fetchItems()
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    setSummaryAmount(transactionData.reduce(
      (sum, transaction) => (
        transaction.type === "income" ? sum + transaction.amount : sum - transaction.amount
      ), 0)
    )
  }, [transactionData])

  return (
    <div >
      <div >
        <Spin spinning={isLoading}>
          <AddItem onItemAdded={handleAddItem} />
        </Spin>
      </div>
      <body>
        <Divider>บันทึก รายรับ - รายจ่าย</Divider>
        <TransactionList
          data={transactionData}
          onNoteChanged={handleNoteChanged}
          onRowDeleted={handleRowDeleted}
          onEditItem={handleEditItem}
          className='FinanceTable' />
      </body>
      <Footer className='App-footer'>
        <Typography.Text strong >
          จำนวนเงินปัจจุบัน {summaryAmount} บาท
        </Typography.Text>
      </Footer>
    </div>
  );
}

export default FinanceScreen;
