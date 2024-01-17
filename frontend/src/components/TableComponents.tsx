import {useState} from "react";
import {Button, Input, Menu, Modal} from "antd";

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