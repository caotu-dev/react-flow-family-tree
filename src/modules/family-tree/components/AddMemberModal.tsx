import { useFamilyStore } from "@/lib/zustand/familyTreeStore";
import Modal from "@/shared/components/common/Modal";

export default function AddMemberModal({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) {
  const toggleModal = useFamilyStore((state) => state.openModal);
  const isOpenModal = useFamilyStore((state) => state.isOpenedModal);

  return (
    <Modal title={title} isOpenModal={isOpenModal} toggleModal={toggleModal}>
      {children}
    </Modal>
  );
}
