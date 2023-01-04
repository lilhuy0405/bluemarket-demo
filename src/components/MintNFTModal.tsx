import {message, Modal, Upload, Image, Button} from "antd";
import {useState} from "react";
import {AiOutlineCloudUpload} from 'react-icons/ai'
import Fire from "../services/fire";
import useNftContract from "../hooks/useNftContract";

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
const getBase64 = (file: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(file);
};
const MintNFTModal = ({isOpen, onMintSuccess, onClose}: any) => {
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const {mint} = useNftContract()
  const handleChooseFile = async ({file}: any) => {
    if (ALLOWED_TYPES.includes(file.type)) {
      setFile(file);
      getBase64(file, setImage);
    } else {
      message.error('Only image files are allowed');
    }
  };
  const handleMint = async () => {
    try {
      setLoading(true);
      if (!file) {
        throw new Error('Please choose a file');
      }
      const fire = new Fire();
      const url = await fire.uploadImage(file);
      console.log(url);
      const resp = await mint(url);
      //sleep 3s to wait for the transaction to be mined and updated in the be
      await new Promise(resolve => setTimeout(resolve, 5000));
      await onMintSuccess();
      message.success('Mint successfully');
      setFile(null);
      setImage('');
      onClose();
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Modal
      open={isOpen}
      title='Mint NFT'
      onCancel={onClose}
      onOk={onClose}
      footer={[]}
    >
      <Upload.Dragger
        accept={ALLOWED_TYPES.join(', ')}
        showUploadList={false}
        customRequest={handleChooseFile}
        className='mb-24'
        height={160}
      >
        {image ? (
          <Image src={image} height={120} preview={false}/>
        ) : (
          <div className='flex-row justify-content-center'>
            <div>
              PNG, JPG, WEBP or GIF. Max 10mb.
            </div>
            <Button icon={<AiOutlineCloudUpload style={{marginRight: '10px'}}/>}>
              Choose File
            </Button>
          </div>
        )}
      </Upload.Dragger>
      <div>
        <Button type='primary' style={{width: '100%', marginTop: 20}} onClick={handleMint} loading={loading}>
          {loading ? 'Minting...' : 'Mint'}
        </Button>
      </div>
    </Modal>
  )
}
export default MintNFTModal
