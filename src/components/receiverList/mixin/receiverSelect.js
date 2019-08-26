export default {
    methods: {
        //  处理treeConfig
        formatTree(treeConfig) {
            if (treeConfig.groupList) {
                treeConfig.groupList.forEach(groupItem => {
                    treeConfig.childIds.push(groupItem.id)
                    if (groupItem.groupList) {
                        let tmpFormat = (config) => {
                            config.groupList.forEach(childItem => {
                                treeConfig.childIds.push(childItem.id)
                                if (childItem.groupList) {
                                    tmpFormat(childItem)
                                }
                            })
                        }
                        tmpFormat(groupItem)
                        this.formatTree(groupItem)
                    }
                })
            }
        },
        //   选择组
        GroupToggle(param) {
            if (!this.receiverGroupResult.includes(param.id)) {
                //   新加组
                this.receiverGroupResult.push(param.id)
                this.pushGroupMember(param.id, this.personalList[0])
            } else {
                //   去除组
                this.deleteId(param)
                param.allCheck = false
                param.partCheck = false
                param.noCheck = true
                this.deleteGroupMember(param.id, this.personalList[0])
                this.part_deleteGroup(param.id, this.organization[0])
            }
            this.judgeGroup2(this.organization[0])
        },
        pushGroupMember(GroupId, treeConfig) {
            if (treeConfig.children) {
                treeConfig.children.forEach(childItem => {
                    if (!childItem.user && childItem.id === GroupId) {
                        childItem.allCheck = true
                        childItem.partCheck = false
                        childItem.noCheck = false
                        if (childItem.peopleList) {
                            childItem.peopleList.forEach((PerItem => {
                                if (!this.receiverResult.includes(PerItem.id)) {
                                    this.receiverResult.push(PerItem.id)
                                }
                            }))
                        }
                        if (childItem.groupList) {
                            childItem.groupList.forEach((GroupItem => {
                                if (!this.receiverGroupResult.includes(GroupItem.id)) {
                                    this.receiverGroupResult.push(GroupItem.id)
                                }
                                this.pushGroupMember(GroupItem.id, childItem)
                            }))
                        }
                    }
                })
            }
        },
        deleteGroupMember(GroupId, treeConfig) {
            if (treeConfig.children) {
                treeConfig.children.forEach(childItem => {
                    if (!childItem.user && childItem.id === GroupId) {
                        childItem.allCheck = false
                        childItem.partCheck = false
                        childItem.noCheck = true
                        if (childItem.peopleList) {
                            childItem.peopleList.forEach((PerItem => {
                                const index = this.receiverResult.findIndex(obj => {
                                    return obj === PerItem.id
                                })
                                if (index >= 0) {
                                    this.receiverResult.splice(index, 1)
                                }
                            }))
                        }
                        if (childItem.groupList) {
                            childItem.groupList.forEach((GroupItem => {
                                this.deleteId(GroupItem)
                                this.deleteGroupMember(GroupItem.id, childItem)
                            }))
                        }
                    }
                })
            }
        },
        part_deleteGroup(GroupId, treeConfig) {
            if (treeConfig.children) {
                treeConfig.children.forEach(childItem => {
                    if (!childItem.user) {
                        if (childItem.childIds && childItem.childIds.includes(GroupId)) {
                            childItem.allCheck = false
                            childItem.partCheck = true
                            childItem.noCheck = false
                            this.deleteId(childItem)
                        }
                        if (childItem.children) {
                            this.part_deleteGroup(GroupId, childItem)
                        }
                    }
                })
            }
        },
        deleteId(param) {
            const index = this.receiverGroupResult.findIndex(item => {
                return item === param.id
            })
            if (index >= 0) {
                this.receiverGroupResult.splice(index, 1)
            }
        },
        //  由子到父
        judgeGroup2(treeConfig) {
            if (treeConfig.children) {
                let [groupNum, memberNum] = [0, 0]
                if (treeConfig.childIds) {
                    treeConfig.childIds.forEach(IdItem => {
                        if (this.receiverGroupResult.includes(IdItem)) {
                            groupNum ++
                        }
                    })
                    treeConfig.children.forEach(childItem => {
                        this.judgeGroup2(childItem)
                    })
                }

                if (treeConfig.peopleList) {
                    treeConfig.peopleList.forEach(ListItem => {
                        if (this.receiverResult.includes(ListItem.id)) {
                            memberNum ++
                        }
                    })
                }

                if (groupNum === 0 && memberNum === 0) {
                    if (this.receiverGroupResult.includes(treeConfig.id)) {
                        this.deleteId(treeConfig)
                    }
                    treeConfig.allCheck = false
                    treeConfig.partCheck = false
                    treeConfig.noCheck = true
                }  else if (groupNum === treeConfig.childIds.length && memberNum === treeConfig.peopleNum) {
                    if (!this.receiverGroupResult.includes(treeConfig.id)) {
                        this.receiverGroupResult.push(treeConfig.id)
                        treeConfig.allCheck = true
                        treeConfig.partCheck = false
                        treeConfig.noCheck = false
                    }

                } else if (groupNum >= 0 && groupNum < treeConfig.childIds.length) {
                    if (this.receiverGroupResult.includes(treeConfig.id)) {
                        this.deleteId(treeConfig)
                    }
                    treeConfig.allCheck = false
                    treeConfig.partCheck = true
                    treeConfig.noCheck = false
                } else if (memberNum >= 0 && memberNum < treeConfig.peopleNum) {
                    if (this.receiverGroupResult.includes(treeConfig.id)) {
                        this.deleteId(treeConfig)
                    }
                    treeConfig.allCheck = false
                    treeConfig.partCheck = true
                    treeConfig.noCheck = false
                }
            }
        },
        //   选择人
        MemberToggle(index, param) {
            this.$refs.checkboxes[index].toggle()
          setTimeout(() => {
            this.deleteMemberGroup(this.organization[0], param.id)
          }, 100)

        },
        //   已选查看
        actionToggle(index, param) {
            this.$refs.actionCheckboxes[index].toggle()
          setTimeout(() => {
            this.deleteMemberGroup(this.organization[0], param.id)
          }, 100)
        },
        deleteMemberGroup(treeConfig, memberId) {
            if (treeConfig.children) {
                treeConfig.children.forEach(childItem => {

                    // if (childItem.user && childItem.id === memberId) {
                    if (childItem.user) {
                        let [groupNum, memberNum] = [0, 0]
                        if (treeConfig.childIds) {
                            treeConfig.childIds.forEach(IdItem => {
                                if (this.receiverGroupResult.includes(IdItem)) {
                                    groupNum ++
                                }
                            })
                            if (groupNum < treeConfig.childIds.length) {
                                if (this.receiverGroupResult.includes(treeConfig.id)) {
                                    this.deleteId(treeConfig)
                                }

                                treeConfig.allCheck = false
                                treeConfig.partCheck = true
                                treeConfig.noCheck = false
                            }
                        }

                        if (treeConfig.peopleList) {
                            treeConfig.peopleList.forEach(ListItem => {
                                if (this.receiverResult.includes(ListItem.id)) {
                                    memberNum ++
                                }
                            })
                            if (memberNum < treeConfig.peopleNum) {
                                if (this.receiverGroupResult.includes(treeConfig.id)) {
                                    this.deleteId(treeConfig)
                                }
                                treeConfig.allCheck = false
                                treeConfig.partCheck = true
                                treeConfig.noCheck = false
                            }
                        }
                        if (groupNum === 0 && memberNum === 0) {
                            if (this.receiverGroupResult.includes(treeConfig.id)) {
                                this.deleteId(treeConfig)
                            }
                            treeConfig.allCheck = false
                            treeConfig.partCheck = false
                            treeConfig.noCheck = true
                        }
                        if (groupNum === treeConfig.childIds.length && memberNum === treeConfig.peopleNum) {
                            if (!this.receiverGroupResult.includes(treeConfig.id)) {
                                this.receiverGroupResult.push(treeConfig.id)
                                treeConfig.allCheck = true
                                treeConfig.partCheck = false
                                treeConfig.noCheck = false
                            }
                        }

                        this.part_deleteGroup(treeConfig.id, this.organization[0])
                        return false
                    }
                    if (!childItem.user && childItem.children) {
                        this.deleteMemberGroup(childItem, memberId)
                        this.judgeGroup2(childItem)
                    }
                })
            }
        }
    },
}
