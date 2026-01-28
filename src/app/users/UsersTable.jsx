'use client'

import { createUser, deleteUser, updateUser } from "@/lib/serverActions";
import { Button, message, Modal, Table } from "antd";
import { useActionState, useState } from "react";

export default function UsersTable({ data }) {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Фото профиля',
            dataIndex: 'photo',
            render: (_, render) => (
                <div>
                    {
                        render.photos.map(img => (
                            <img key={img.id} className="w-30" src={img.url} alt="" />
                        ))
                    }
                </div>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Username',
            dataIndex: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username)
        },
        {
            title: 'Age',
            dataIndex: 'age',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Actions',
            render: (_, render) => (
                <div className="flex gap-x-3">
                    <Button onClick={() => editUser(render)} color="primary" variant="solid">Edit </Button>

                    <Button onClick={() => deleteUser(render.id)} color="danger" variant="solid">Delete</Button>
                </div>

            )
        }
    ];


    const [userInfo, setUserInfo] = useState({})

    function editUser(user) {
        setUserInfo(user)
        setIsModalOpen(true)
    }

    function handleSubmit(e) {
        e.preventDefault()

        updateUser(userInfo)

        setIsModalOpen(false)
    }


    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const initialState = {
        message: ''
    }

    const [state, formAction, pending] = useActionState(createUser, initialState)

    return (
        <div>

            <form action={formAction} className="mb-10 ">
                <input required name="email" type="email" placeholder="Email" />
                <input required name="username" type="text" placeholder="Username" />
                <input required name="age" type="number" placeholder="Age" />
                <input required name="password" type="number" placeholder="Password" />

                {/* <input name="image" type="file" multiple /> */}
                <Button loading={pending} htmlType="submit" variant="solid" color="magenta">Создать пользователя</Button>

                <p>{state?.message}</p>
            </form>

            <Table
                columns={columns}
                dataSource={data}
                showSorterTooltip={{ target: 'sorter-icon' }}
            />


            <Modal
                title="Редактировать пользователя"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-3">
                    <input
                        value={userInfo.email}
                        onInput={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        name="email" type="text" placeholder="Email" />
                    <input
                        value={userInfo.username}
                        onInput={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                        name="username" type="text" placeholder="Username" />
                    <input
                        value={userInfo.age}
                        onInput={(e) => setUserInfo({ ...userInfo, age: e.target.value })}
                        name="age" type="text" placeholder="Age" />
                    <input
                        value={userInfo.password}
                        onInput={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                        name="password" type="text" placeholder="Password" />

                    <Button htmlType="submit" variant="solid" color="magenta">Сохранить</Button>
                </form>
            </Modal>
        </div>
    )
}
