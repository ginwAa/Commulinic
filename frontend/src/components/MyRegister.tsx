import {Button, Drawer, List} from "antd";
import {useState} from "react";
import {Register} from "../utils/entity.ts";
import Title from "antd/es/typography/Title";
import {unixSecondToDate} from "../utils/time.ts";

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

const MyRegister = (props: Props) => {
    const [data, setData] = useState<Register[]>([]);

    return (
        <div>
            <Drawer open={props.open} placement={"right"} closable={true} title={"我的预约"}
                    onClose={() => props.setOpen(false)}>
                <List dataSource={data} renderItem={(item) =>
                    <List.Item key={item.id} actions={[
                        <Button hidden={item.status !== 1} type={'primary'}>支付</Button>,
                        <Button hidden={item.status !== 2} type={'primary'}>取消</Button>,
                    ]}>
                        <List.Item.Meta
                            title={<Title level={4}>{item.doctorName}</Title>}
                            description={
                                <div>
                                    预约时间: {unixSecondToDate(item.date)} {item.section === 1 ? "上午" : "下午"}
                                </div>
                            }/>
                        创建时间： {unixSecondToDate(item.createTime)}
                        {
                            item.status === 1 ? "未支付" :
                                item.status === 2 ? "已支付" :
                                    item.status === 3 ? "已完成" : "已取消"
                        }
                    </List.Item>
                }>

                </List>
            </Drawer>
        </div>
    )
}

export default MyRegister;