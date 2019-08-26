const baseFormat = {
    formatOrganization(arr) {
        arr.map((item) => {
            item.id = item.data.id
            item.label = item.data.label || '用户资料未完善！'
            item.allCount = item.data.count
            item.user = item.data.user
            item.memberRole = item.data.memberRole
            item.childIds = []
            if (item.id === '1') {
                item.ids = item.id
            }
            if (!item.user) {
                item.partCheck = false
                item.allCheck = false
                item.noCheck = true
            }
            if (item.children) {
                let perList = []
                let groupList = []
                item.children.forEach(child => {
                    if (child && child.data.user) {
                        perList.push(child)
                        item.peopleList = perList
                    } else if (child && !child.data.user) {
                        child.ids = item.ids + ',' + child.data.id
                        groupList.push(child)
                        item.groupList = groupList
                    }
                })
                item.peopleNum = perList.length
                item.count = perList.length + '/' + item.allCount
                this.formatOrganization(item.children)
            } else {
                item.peopleNum = 0
                item.count = 0 + '/' + item.allCount
            }
            if (item.ids) {
                item.depth = item.ids.split(',').length
            }
            item.message = item.id + ',' + item.label + ',' + item.peopleNum
        })
        return arr
    },
}
export default baseFormat
