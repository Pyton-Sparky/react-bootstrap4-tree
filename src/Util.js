import { isUndefined, isNull, isArray, isObject, isBoolean } from 'util';
/**
 * parse default value for color and backgroundColor
 * @param {string} value 
 * @param {string} defaultValue 
 */
export const parseDefault = (value, defaultValue) => {
    if (isUndefined(value)) {
        return defaultValue;
    }
    if (isNull(value)) {
        return defaultValue;
    }
    return value;
}

/**
 * parse default state
 * @param {object} value 
 */
export const parseDefaultState = (value) => {
    let defaultValue = {
        expanded: false,
        selected: false
    }
    if (isUndefined(value)) {
        return defaultValue;
    }
    if (isNull(value)) {
        return defaultValue;
    }
    if (!isObject(value)) {
        return defaultValue;
    }
    return {
        expanded: parseDefault(value.expanded, false),
        selected: parseDefault(value.selected, false)
    }
}

/**
 * parse array
 * @param {array} value 
 */
export const parseArray = (value) => {
    if (isUndefined(value)) {
        return [];
    }
    if (isNull(value)) {
        return [];
    }
    if (!isArray(value)) {
        return [];
    }
    return value;
}

/**
 * parse boolean
 * @param {boolean} value 
 */
export const parseBoolean = (value, defaultValue) => {
    if (isUndefined(value)) {
        return defaultValue;
    }
    if (isNull(value)) {
        return defaultValue;
    }
    if (isBoolean(value)) {
        return value;
    }
    return defaultValue;
}

/**
 * parse custom data
 * @param {object} value 
 */
export const parseCustomData = (value) => {
    if (isUndefined(value)) {
        return {};
    }
    if (isNull(value)) {
        return {};
    }
    if (isObject(value)) {
        return value;
    }
    return {};
}

/**
 * organize tree data
 * @param {object} data 
 * @param {object} newData 
 * @param {string} defaultColor 
 * @param {string} defaultBackgroundColor 
 */
export const organizeTreeData = (data, newData, idIndex, defaultColor, defaultBackgroundColor, defaultBorder, defaultSelect) => {
    let currentIndex = idIndex;
    idIndex = idIndex + data.length;
    for (let node of data) {
        let nodes = parseArray(node.nodes);
        let newNodes = [];
        if (nodes.length > 0) {
            idIndex = organizeTreeData(nodes, newNodes, idIndex, defaultColor, defaultBackgroundColor, defaultBorder, defaultSelect);
        }
        let newNode = {
            id: ++currentIndex,
            text: parseDefault(node.text, ''),
            color: parseDefault(node.color, defaultColor),
            backgroundColor: parseDefault(node.backgroundColor, defaultBackgroundColor),
            showBorder: parseBoolean(node.showBorder, defaultBorder),
            showSelect: parseBoolean(node.showSelect, defaultSelect),
            state: parseDefaultState(node.state),
            customData: parseCustomData(node.customData),
            nodes: newNodes
        }
        newData.push(newNode);
    }
    return idIndex;
}

/**
 * clone sub tree data
 * @param {object} data 
 */
const cloneSubTreeData = (data, newData) => {
    for (let node of data) {
        let nodes = parseArray(node.nodes);
        let newNodes = [];
        if (nodes.length > 0) {
            cloneSubTreeData(nodes, newNodes);
        }
        let newNode = {
            text: node.text,
            color: node.color,
            backgroundColor: node.backgroundColor,
            showBorder: node.showBorder,
            showSelect: node.showSelect,
            state: {
                expanded: node.state.expanded,
                selected: node.state.selected
            },
            customData: parseCustomData(node.customData),
            nodes: newNodes
        }
        newData.push(newNode);
    }
}

/**
 * clone tree data
 * @param {object} data 
 */
export const cloneTreeData = (data) => {
    let newData = [];
    if (isUndefined(data)) {
        return newData;
    }
    if (isNull(data)) {
        return newData;
    }
    if (!isArray(data)) {
        return newData;
    }
    cloneSubTreeData(data, newData);
    return newData;
}
