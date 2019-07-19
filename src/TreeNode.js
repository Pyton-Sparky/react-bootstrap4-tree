import React from 'react'
import TreeNodeList from './TreeNodeList'
import { isFunction } from 'util';
import { cloneTreeData } from './Util'

class TreeNode extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: this.props.data.state.expanded,
            selected: this.props.data.state.selected
        }

        this.handleExpand = this.handleExpand.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleExpand(event) {
        this.setState({
            expanded: !this.state.expanded
        });
        this.props.data.state.expanded = !this.state.expanded;
        if (isFunction(this.props.onExpand)) {
            this.props.onExpand({
                text: this.props.data.text,
                customData: this.props.data.customData
            }, cloneTreeData(this.props.treeData));
        }
        event.stopPropagation();
    }

    handleSelect(event) {
        this.setState({
            selected: !this.state.selected
        });
        this.props.data.state.selected = !this.state.selected;
        if (isFunction(this.props.onSelect)) {
            this.props.onExpand({
                text: this.props.data.text,
                customData: this.props.data.customData
            }, cloneTreeData(this.props.treeData));
        }
        event.stopPropagation();
    }

    render() {
        let text = this.props.data.text;
        let nodes = this.props.data.nodes;
        let level = this.props.level;
        let expanded = this.state.expanded;
        let selected = this.state.selected;
        let indent = [];
        for (let i = 0; i < level; i ++) {
            indent.push(<span key={Math.random()} className='indent'></span>);
        }

        let colorCssStyle = {color: this.props.data.color};
        let listItemCssStyle = this.props.data.showBorder ? {backgroundColor: this.props.data.backgroundColor} : {backgroundColor: this.props.data.backgroundColor, border: 'none'};
        let haveChild = nodes.length > 0;
        let iconExpanded = expanded ? <span className='icon' style={colorCssStyle}>&#x2212;</span> : <span className='icon' style={colorCssStyle}>&#x002B;</span>;
        let iconSelected = selected ? <span className='icon' style={colorCssStyle} onClick={this.handleSelect}>&#x2B1B;</span> : <span className='icon' style={colorCssStyle} onClick={this.handleSelect}>&#x2B1C;</span>;

        return(
            <span>
                <li style={listItemCssStyle} key={Math.random()} className='list-group-item' onClick={this.handleExpand}>
                    {indent}
                    {haveChild ? iconExpanded : <span className="empty"></span>}
                    {this.props.data.showSelect ? iconSelected : ''}
                    <span style={colorCssStyle}>{text}</span>
                </li>
                {expanded ? <TreeNodeList key={Math.random()} data={nodes} treeData={this.props.treeData} level={level + 1} onExpand={this.props.onExpand} onSelect={this.props.onSelect} /> : <span></span>}
            </span>
        )
    }
}

export default TreeNode