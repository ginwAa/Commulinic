import {
    Button,
    Col,
    DatePicker,
    Descriptions,
    DescriptionsProps,
    Input,
    List,
    message,
    Row,
    Segmented,
    Spin,
    TreeSelect
} from "antd";
import {useEffect, useState} from "react";
import {
    Department,
    DepartmentTreeNode,
    DoctorRegisterDTO,
    DoctorVO,
    EMPTY_DEPARTMENT,
    EMPTY_DOCTOR_VO,
    Register,
} from "../utils/entity.ts";
import {departmentGetById, departmentTreeReg} from "../apis/departmentApis.ts";
import {DataNode} from "antd/es/tree";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import Title from "antd/es/typography/Title";
import {doctorPageReg} from "../apis/doctorApis.ts";
import {unixSecondToYear} from "../utils/time.ts";
import dayjs from "dayjs";
import {RangePickerProps} from "antd/es/date-picker";
import {registerAdd} from "../apis/registerApis.ts";
import {ModalWarning} from "../components/TableComponents.tsx";

const transform = (data: DepartmentTreeNode[]): DataNode[] => {
    return data.map((item) => {
        return {
            key: item.value,
            title: item.title,
            value: item.value,
            parentId: item.parentId,
            description: item.description,
            children: item.children ? transform(item.children) : [],
            isLeaf: item.children === undefined || item.children.length === 0,
        }
    });
};
const Inner = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [data, setData] = useState<DepartmentTreeNode[]>([]);
    const [selectedKey, setSelectedKey] = useState<number>(0);
    const [selectedNode, setSelectedNode] = useState<Department>(EMPTY_DEPARTMENT);
    const [loading, setLoading] = useState(false);
    const getDescription = async (key: number) => {
        if (!key) {
            setSelectedKey(0);
            setDescription([]);
            setSelectedNode(EMPTY_DEPARTMENT);
            return;
        }
        departmentGetById(key).then(res => {
            if (!res || !res.data) {
                setDescription([]);
                setSelectedNode(EMPTY_DEPARTMENT);
                return;
            }
            const node = res.data;
            setDescription([
                {
                    key: '1',
                    label: null,
                    children: node.name,
                },
                {
                    key: '2',
                    label: '科室简介',
                    children: node.description ? node.description : '',
                },
            ]);
            setSelectedNode(node);
        }).catch(err => {
            console.log(err);
            messageApi.error("加载失败，请检查网络连接");
        });
    };
    const [description, setDescription] = useState<DescriptionsProps['items']>([]);
    useEffect(() => {
        setLoading(true);
        departmentTreeReg().then(res => {
            setData([res.data]);
            if (selectedKey === 0 && res.data.value) {
                setSelectedKey(res.data.value);
            }
        }).catch(err => {
            messageApi.error("部门结构信息加载失败，请检查网络连接！" + err.message);
        }).finally(() => {
            setLoading(false);
            console.log("tree");
        });
    }, []);
    useEffect(() => {
        setLoading(true);
        getDescription(selectedKey).catch(err => {
            messageApi.error("部门详细信息加载失败，请检查网络连接！" + err.message);
        }).finally(() => {
            setLoading(false);
        });
    }, [selectedKey]);
    const onSelect = (value: number | null, node: DataNode) => {
        if (value) {
            setSelectedKey(value);
        }
        console.log("selected ", node);
    }


    return (
        <>
            {contextHolder}
            <Spin spinning={loading}>
                <Row gutter={[16, 30]} style={{width: '100%'}}>
                    <Col span={'auto'} style={{height: '100%', display: 'flex', alignItems: 'center'}}>
                        <Title level={5} style={{padding: '0.5rem'}}>请选择挂号科室</Title>
                        <TreeSelect treeData={transform(data)} disabled={!data || data.length === 0}
                                    style={{marginTop: '1rem'}} treeDefaultExpandAll
                                    dropdownStyle={{minHeight: 400, overflow: 'auto', width: '10rem'}}
                                    placement={"bottomLeft"} onSelect={onSelect} value={selectedKey} size={"small"}/>
                    </Col>
                    <Col span={'auto'} style={{display: 'flex', alignItems: 'center'}}>
                        <Title level={5} style={{padding: '0.5rem'}}>科室简介</Title>
                        <Descriptions items={selectedKey === 0 ? [] : description} bordered={true} size={"small"}
                                      style={{marginTop: '1rem'}}/>
                    </Col>
                </Row>
                <DoctorList deptId={selectedKey}></DoctorList>
            </Spin>
        </>
    );
}

const DoctorList = (props: { deptId: number }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [date, setDate] = useState<number>(new Date().getTime() / 1000);
    const [tab, setTab] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(20);
    const [total, setTotal] = useState<number>(0);
    const [data, setData] = useState<DoctorVO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [warnOpen, setWarnOpen] = useState<boolean>(false);
    const [doctor, setDoctor] = useState<DoctorVO>(EMPTY_DOCTOR_VO);
    const [pageProps, setPageProps] = useState<DoctorRegisterDTO>({
        departmentId: props.deptId,
        name: "",
        gender: 0,
        section: 1,
        beginDate: date,
    })

    const tabChange = (value: number) => {
        setTab(value);
        setPageProps({
            ...pageProps,
            section: value,
        });
    }

    const onRegisterWarn = (doctor: DoctorVO) => {
        setWarnOpen(true);
        setDoctor(doctor);
    }

    const onRegister = () => {
        console.log("预约医生：" + doctor.name);
        const registerForm: Register = {
            doctorId: doctor.id,
            doctorName: doctor.name,
            date: date,
            section: tab,
            status: 1,
            price: 10,
            userId: sessionStorage.getItem('userId') ? Number(sessionStorage.getItem('userId')) : undefined,
            userName: (sessionStorage.getItem('userName') ? sessionStorage.getItem('userName') : '') as string,
        };
        registerAdd(registerForm).then(res => {
            messageApi.success("挂号成功！");
            console.log("挂号成功！" + res);
        }).catch(err => {
            messageApi.error("挂号失败，请检查网络连接 " + err);
        });
    }

    const beforeTodayDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current < dayjs().subtract(1, 'day');
    };

    useEffect(() => {
        console.log("dept id: " + props.deptId);
        setLoading(true);
        doctorPageReg(page, pageSize, {...pageProps, departmentId: props.deptId, beginDate: date}, true)
            .then(res => {
                setData(res.data.records);
                setTotal(res.data.total);
            }).catch(err => {
            console.log(err);
            messageApi.error("获取医生列表失败" + err.message);
        }).finally(() => {
            setLoading(false);
        })

    }, [page, pageSize, props, tab, pageProps])

    return (
        <>
            {contextHolder}
            <Row gutter={[16, 16]} style={{width: '100%'}}>
                <Col>
                    <DatePicker disabledDate={beforeTodayDate} value={dayjs(date * 1000)}
                                onChange={value => {
                                    value ? setDate(value.unix) : null
                                }}/>
                </Col>
                <Col style={{width: '70%'}}>
                    <Segmented options={[{label: '上午', value: 1}, {label: '下午', value: 2}]} block value={tab}
                               onChange={value => tabChange(Number(value))} style={{width: '100%'}}
                    />
                </Col>
            </Row>
            <div style={{marginTop: '1rem'}}>
                <Input placeholder={'搜索申请者'} value={pageProps.name}
                       onChange={(e) => setPageProps({...pageProps, name: e.target.value})}/>
                <List dataSource={data} loading={loading} itemLayout={'horizontal'} renderItem={item =>
                    <List.Item key={item.id} actions={[
                        <Button type={'primary'} onClick={() => onRegisterWarn(item)}>预约</Button>,
                        <Button type={'primary'}>线上问诊</Button>
                    ]}>
                        <List.Item.Meta
                            title={<Title level={2}>{item.name}</Title>}
                            description={
                                <div>
                                    <Title level={4}>
                                        {item.gender === 1 ? '男' : '女'}，从医{unixSecondToYear(item.seniority)}年，{item.desc}
                                    </Title>
                                </div>
                            }/>
                        {item.position}室 余量：{item.stock}
                    </List.Item>
                } pagination={{pageSize: pageSize, current: page, total: total, onChange: setPage, size: 'small'}}/>
                <ModalWarning name={doctor.name + "医生" + (tab === 1 ? '上午' : '下午') + "的挂号"} onOk={onRegister}
                              open={warnOpen} actionName={'预约'} onCancel={() => {
                    setWarnOpen(false)
                }}/>
            </div>
        </>
    )
}

const Registration = () => {
    return (
        <DefaultLayout component={Inner} tabKey={6} breadcrumbItems={[]}/>
    )
}
export default Registration;