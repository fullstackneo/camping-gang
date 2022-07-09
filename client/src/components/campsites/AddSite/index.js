import { Modal } from 'antd';
import AddSiteForm from '../AddSiteForm';

const AddSite = ({ visible, closeModal }) => {
  return (
    <Modal
      visible={visible}
      title="Add New Site"
      okText="Add"
      cancelText="Cancel"
      onCancel={closeModal}
      destroyOnClose
      width="800px"
    >
      <AddSiteForm closeModal={closeModal} />
    </Modal>
  );
};
export default AddSite;
