import {Button, Result} from 'antd';
import {Link} from "react-router-dom";
import Title from "antd/es/typography/Title";
import ButtonGroup from "antd/es/button/button-group";

const NotFoundPage = () => {
    return (
        <Result
            status="404" title="404" style={{width: '100vw'}}
            subTitle={<Title>Sorry, the page you visited does not exist.</Title>}
            extra={
                <ButtonGroup>
                    <Button type="primary"><Link to={"/"}>返回首页</Link></Button>
                    <Button type="primary" onClick={() => {
                        window.history.back()
                    }}>返回上一页</Button>
                </ButtonGroup>

            }
        />
    );
};

export default NotFoundPage;
