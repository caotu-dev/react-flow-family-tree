import { Member } from "../types/member.types";
const dummyAvt = "https://p7.hiclipart.com/preview/722/101/213/computer-icons-user-profile-circle-abstract.jpg"

export function handleAddMember(currentMembers: Member[], newMember: Member, baseId: string | null) {
    const newId = String(currentMembers.length + 1);
    newMember["id"] = newId;
    newMember["avatar"] = dummyAvt;

    if (!baseId) {
        console.log("No base id")
        currentMembers.push(newMember);
        return currentMembers;
    };

    if (newMember?.relationship) {
        const baseMemberIndex = currentMembers.findIndex(_ => _?.id === baseId);
        if (baseMemberIndex === -1) {
            console.log("No base member index")
            return currentMembers;
        }

        if (newMember?.relationship === "spouse") {
            newMember["isSpouse"] = true;
            currentMembers[baseMemberIndex]['spouses'] = [newId];
        } else if (newMember?.relationship === "child") {
            let baseIndex = baseMemberIndex;
            if (currentMembers[baseMemberIndex]?.isSpouse) {
                const spouseId = currentMembers[baseMemberIndex]?.id;
                baseIndex = currentMembers.findIndex(_ => _?.spouses?.includes(spouseId));
            }
            if (baseIndex === -1) return currentMembers;

            const children = currentMembers[baseIndex]?.children ?? [];
            children.push(newId);
            currentMembers[baseIndex]['children'] = children;

        } else if (newMember?.relationship === "siblings") {
            newMember["isSibling"] = true;
            const siblings = currentMembers[baseMemberIndex]?.siblings ?? [];
            siblings.push(newId);
            currentMembers[baseMemberIndex]['siblings'] = siblings;
        }
        console.log("Added new member")
        currentMembers.push(newMember);
    } else {
        console.log("No relationship")
    }

    return currentMembers;
}

export function arrToObj(arr: any[]) {
    const myTree: any = {};
    arr?.forEach((mem: any, index: number) => {
        myTree[index + 1] = mem;
    });
    return myTree;
}