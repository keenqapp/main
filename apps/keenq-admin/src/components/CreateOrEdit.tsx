import { Create, Edit } from 'react-admin'

const sx = {
  maxWidth: '60vw',
}

function CreateOrEdit({ ...props }: any) {
  const isCreate = /create/.test(window.location.href)
  return isCreate ? <Create {...props} sx={sx} /> : <Edit {...props} sx={sx} />
}

export default CreateOrEdit
