import { Modal } from 'antd';

const AddSite = ({ visible, closeModal }) => {
  return (
    <Modal
      visible={visible}
      title="Add NEW Site"
      okText="Add"
      cancelText="Cancel"
      onCancel={closeModal}
    >
      Add New Site
    </Modal>
  );
};
export default AddSite;
