import { Modal } from 'antd';
const EditSite = ({ visible, closeModal, currentEdit }) => {
  console.log(currentEdit);

  return (
    <Modal
      title="Edit Site"
      visible={visible}
      onCancel={closeModal}
      width="800px"
      okText="Edit"
      cancelText="Cancel"
    ></Modal>
  );
};
export default EditSite;
