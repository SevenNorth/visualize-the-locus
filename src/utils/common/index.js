import _ from "lodash";

const getTree = (key, flatTrackList) => {
    const temp = _.cloneDeep(flatTrackList);//深克隆一份外来数据data，以防下面的处理修改data本身
    const parents = temp.filter((item) => item.preKey === key); //过滤出最高父集
    const children = temp.filter((item) => item.preKey !== key);//过滤出孩子节点

    //遍历孩子节点，根据孩子的parent从temp里面寻找对应的node节点，将孩子添加在node的children属性之中。
    _.each(children, (child) => {
        const node = temp.find((p) => p.key === child.preKey);
        node && (node.children ? node.children.push(child) : node.children = [child]);
    });
    return parents;//返回拼装好的数据。
}

export {
    getTree,
}