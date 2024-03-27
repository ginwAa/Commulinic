import {useState} from "react";
import {Button, DatePicker, Input, InputNumber, Menu, Modal} from "antd";
import dayjs, {Dayjs} from "dayjs";
import {RangePickerProps} from "antd/es/date-picker";

interface FilterSearchProps {
    searchText: string;
    onSearch: (value: string) => void;
}

export const FilterSearch = (props: FilterSearchProps) => {
    const [text, setText] = useState(props.searchText);
    return (
        <Menu>
            <Input size={"small"} value={text} onChange={e => setText(e.target.value)}></Input>
            <Button.Group style={{justifyContent: "right", display: "flex"}}>
                <Button size={"small"} type="primary" onClick={() => props.onSearch(text)}>搜索</Button>
                <Button size={"small"} type="primary" onClick={() => {
                    props.onSearch('');
                    setText('');
                }}>重置</Button>
            </Button.Group>
        </Menu>
    );
}

interface DeleteInfo {
    name: string;
    onOk: () => void;
    open: boolean;
    actionName: string;
    onCancel: () => void;
}

export const ModalWarning = (props: DeleteInfo) => {
    return (
        <Modal open={props.open} onOk={props.onOk} onCancel={props.onCancel}
               title={'确定要' + props.actionName + props.name + '吗'}/>
    );
}

interface formProps<T> {
    value: T;
    onChange: (value: T) => void;
}

export const MyDatePicker = ({value, onChange}: formProps<number>, beforeDisabled: boolean) => {
    const [number, setNumber] = useState<number>(value);
    const onChangeHandler = (value: Dayjs) => {
        setNumber(value.unix());
        onChange(value.unix());
    }
    const beforeTodayDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current < dayjs().subtract(1, 'day');
    };
    return (
        <DatePicker
            disabledDate={beforeDisabled ? beforeTodayDate : undefined}
            value={dayjs(number * 1000)}
            defaultValue={dayjs(value * 1000)}
            onChange={onChangeHandler}
        />
    );
}

export const PriceInput = ({value, onChange}: formProps<number>) => {
    const [number, setNumber] = useState<number>(value);
    const onChangeHandler = (value: number) => {
        setNumber(value * 100);
        onChange(value * 100);
    }
    return (
        <InputNumber
            value={number / 100}
            defaultValue={value / 100}
            onChange={onChangeHandler}
        />
    );
}


