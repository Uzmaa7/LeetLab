

export const findOtherMember = (members, userId) => {
    members.find((person) => person._id.toString() !== userId.toString())
}