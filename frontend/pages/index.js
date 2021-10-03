import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { Row, Col , Table , Space ,Button} from 'antd';
import { useRouter } from 'next/router'

export default function Home(props) {
  const router = useRouter()
  const dataSource = props.data;
  const columns = [
    {
      title: 'word',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  return (
    <Row>
      <Col span={18}>
        <Table dataSource={dataSource} columns={columns} />
      </Col>
      <Col span={4} offset={2}>
        <Button type="primary" size="large" onClick = {() => router.push("/create")}>
          Create
        </Button>
      </Col>
  </Row>
  )
}

export async function getServerSideProps(context) {
  const blog = await axios.get('http://backend_HW7:8000/api/v1/blog')
  const dataList = []
  blog.data.data.map((data) => dataList.push(data))
  console.log(blog.data.data)
  console.log('data',dataList[0])
  return {
    props: {
      data: dataList
    }, // will be passed to the page component as props
  }
}