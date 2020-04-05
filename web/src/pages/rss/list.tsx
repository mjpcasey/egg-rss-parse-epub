import React from 'react';
import {Layout, Table, Tag} from "antd";
import http from "../../http/request";

const {Content} = Layout;
/**
 * 报表列表
 */
interface Props {
    columns?: Array<any>;
}
interface State {
    data?: any[]
}
export default class content extends React.Component<Props,State> {
    static defaultProps = {
        columns: [
            {
                title: 'title',
                dataIndex: 'title',
                key: 'title',

            },
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'link',
                dataIndex: 'link',
                key: 'link',
                render: (text:string) => {
                    return (
                        <a href={text} target={"_blank"}>{text || ''}</a>
                    )
                },
            },
            {
                title: 'lastDate',
                dataIndex: 'lastDate',
                key: 'lastDate',
            },
            {
                title: 'enable',
                dataIndex: 'enable',
                key: 'enable',
                render: (text:boolean) => {
                    return (
                        <p>{text.toString()}</p>
                    )
                },
            },
            {
                title: 'enable',
                key: 'enable',
                render: (text: any, record: { name: React.ReactNode; }) => (
                    <span>
                        <a style={{marginRight: 16}}>{record.name}</a>
                        <a>Delete</a>
                    </span>
                ),
            },
        ]
    };
    constructor(props:Props){
        super(props);
        this.state = {
            data : [
                {
                    "title": "juejin",
                    "name": "掘金",
                    "link": "https://juejin.im/rss",
                    "enable": true,
                    "lastDate": "Thu, 02 Apr 2020 11:05:36 GMT"
                },
                {
                    "title": "ruanyifeng",
                    "link": "http://www.ruanyifeng.com/blog/atom.xml",
                    "name": "阮一峰的网络杂志",
                    "enable": true,
                    "lastDate": "2020-04-02T02:28:23Z"
                }
            ]
        }
    }
    async componentDidMount() {
        let data = await http.post('http://localhost:7000/rss/list',{});
        
    }

    render() {
        return (
            <Table columns={this.props.columns} dataSource={this.state.data}/>
        )
    }
}
