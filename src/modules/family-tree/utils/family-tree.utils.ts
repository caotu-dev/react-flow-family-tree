import { Relationship } from "../config/enum";
import { Member } from "../types/member.types";

export function handleAddMember(
    currentMembers: Member[],
    newMember: Member,
    baseId: string | null
) {
    const newId = String(currentMembers.length + 1);
    newMember["id"] = newId;
    newMember["avatar"] = "";

    if (!baseId) {
        console.log("No base id");
        currentMembers.push(newMember);
        return currentMembers;
    }

    if (newMember?.relationship) {
        const baseMemberIndex = currentMembers.findIndex((_) => _?.id === baseId);
        if (baseMemberIndex === -1) {
            console.log("No base member index");
            return currentMembers;
        }

        if (newMember?.relationship === Relationship.Spouse) {
            newMember["isSpouse"] = true;
            currentMembers[baseMemberIndex]["spouses"] = [newId];
        } else if (newMember?.relationship === Relationship.Child) {
            let baseIndex = baseMemberIndex;
            if (currentMembers[baseMemberIndex]?.isSpouse) {
                const spouseId = currentMembers[baseMemberIndex]?.id;
                baseIndex = currentMembers.findIndex((_) =>
                    _?.spouses?.includes(spouseId)
                );
            }
            if (baseIndex === -1) return currentMembers;

            const children = currentMembers[baseIndex]?.children ?? [];
            children.push(newId);
            currentMembers[baseIndex]["children"] = children;
        } else if (newMember?.relationship === Relationship.Sibling) {
            newMember["isSibling"] = true;
            const siblings = currentMembers[baseMemberIndex]?.siblings ?? [];
            siblings.push(newId);
            currentMembers[baseMemberIndex]["siblings"] = siblings;
        }else if (newMember?.relationship === Relationship.Parents) {
            currentMembers[baseMemberIndex]["parents"] = [newId];
            newMember["isParent"] = true;
        }

        currentMembers.push(newMember);

    } else {
        console.log("No relationship");
    }
    console.log(currentMembers);
    return currentMembers;
}

export function arrToObj(arr: any[]) {
    const myTree: any = {};
    arr?.forEach((mem: any, index: number) => {
        myTree[index + 1] = mem;
    });
    return myTree;
}

export const checkIfAllowAddSpouse = (selectedUser: Member | null) => {
    if (selectedUser?.spouses?.length && selectedUser?.spouses?.length > 0) {
        return false;
    }
    if (!selectedUser?.isSpouse) {
        return true;
    }
    return false;
};

export const checkIfAllowAddChild = (selectedUser: Member | null) => {
    if (selectedUser?.isSpouse) return true;
    if (selectedUser?.spouses?.length && selectedUser?.spouses?.length > 0) {
        return true;
    }
    return false;
};

export const checkIfAllowAddParent = (members: Member[], selectedUser: Member | null) => {
    if(!selectedUser?.id) return false;

    let isAllowed = true;
    const baseParent = members.find(_ => _?.children?.includes(selectedUser?.id));
    if(baseParent) {
        isAllowed = false;
    }else if (selectedUser?.parents?.length && selectedUser?.parents?.length > 0) {
        isAllowed = false;
    }
    return isAllowed;
};

export function handleDeleteMember(
    currentMembers: Member[],
    memberId: string | null
) {
    if (!memberId) return currentMembers;

    const member = currentMembers.find((_) => _?.id === memberId);
    if (!member) return currentMembers;

    let deletedIds = [memberId];

    // Remove current id from spouse if any
    const spouseIndex = currentMembers.findIndex((_) =>
        _?.spouses?.includes(memberId)
    );
    if (spouseIndex !== -1) {
        currentMembers[spouseIndex].spouses = [];
    }

    // Remove current id from parent if any
    const parentIndex = currentMembers.findIndex((_) =>
        _?.children?.includes(memberId)
    );
    if (parentIndex !== -1) {
        currentMembers[parentIndex].children = currentMembers[
            parentIndex
        ].children?.filter((id) => id !== memberId);
    }

    if (member?.spouses && member?.spouses?.length) {
        deletedIds = deletedIds.concat(member.spouses);
    }
    if (member?.children && member?.children?.length) {
        deletedIds = deletedIds.concat(member.children);
    }

    const members = currentMembers.filter((_) => !deletedIds.includes(_?.id));

    return members;
}
