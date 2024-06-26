export const treeRootId = 1;

interface Person {
  id: number | string;
  name: string;
  avatar: string;
  dob: string;
  sex: string;
  dod: string | null;
  spouses?: string[] | null;
  children?: string[] | null;
  siblings?: string[] | null;
  isSpouse?: boolean,
  isSibling?: boolean,
}

export const initMembers: Person[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://p7.hiclipart.com/preview/722/101/213/computer-icons-user-profile-circle-abstract.jpg",
    dob: "1960",
    sex: "male",
    dod: null,
    children: ["3", "4"],
    siblings: null,
    spouses: ["2"],
  },
  {
    id: "2",
    name: "Jane Doe",
    avatar: "https://p7.hiclipart.com/preview/722/101/213/computer-icons-user-profile-circle-abstract.jpg",
    dob: "1964",
    sex: "female",
    dod: null,
    isSpouse: true
  },
  {
    id: "3",
    name: "Jack Doe",
    avatar: "https://p7.hiclipart.com/preview/722/101/213/computer-icons-user-profile-circle-abstract.jpg",
    dob: "1986",
    dod: null,
    sex: "male",
  },
  {
    id: "4",
    name: "Jenny Doe",
    avatar: "https://p7.hiclipart.com/preview/722/101/213/computer-icons-user-profile-circle-abstract.jpg",
    dob: "1992",
    dod: null,
    spouses: ['5'],
    sex: "female",
  },
  {
    id: "5",
    name: "Jacob Dune",
    avatar: "https://p7.hiclipart.com/preview/722/101/213/computer-icons-user-profile-circle-abstract.jpg",
    dob: "1992",
    dod: null,
    sex: "male",
    isSpouse: true
  }
]

