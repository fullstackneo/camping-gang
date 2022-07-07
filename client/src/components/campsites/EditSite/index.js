import { Modal } from 'antd';
import EditSiteForm from '../EditSiteForm';

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
    >
      <EditSiteForm data={currentEdit} closeModal={closeModal} />
    </Modal>
  );
};
export default EditSite;
