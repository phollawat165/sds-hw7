import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { Row, Col ,Form ,Button ,Input} from 'antd';
import { useRouter } from 'next/router'
import React, { useState } from 'react';

export default function Create(props) {
    const router = useRouter()
    const CreateNew = async(val) => {
        console.log('Success:', val);
        const p = await axios.post('http://localhost:8000/api/v1/blog',val)
        router.push('/')
    };
    return (
        <Row>
            <Col span={18}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{}}
                    onFinish={CreateNew}
                    >
                    <Form.Item
                        label="Word"
                        name="title"
                        rules={[{ required: true, message: 'Please input word' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input description' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick = {() => router.push("/")}>
                            Back
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        
        
    )
}
